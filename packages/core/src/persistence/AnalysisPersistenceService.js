const PERSISTENCE_ERROR = {
  code: 'PERSISTENCE_ERROR',
  message: 'Persistence operation failed',
};

const SECRET_PATTERN = /(mongodb_uri|api[_-]?key|token|secret|password)=([^&\s]+)/gi;
const BEARER_PATTERN = /Bearer\s+[A-Za-z0-9._-]+/gi;

function sanitizeError(error) {
  return String(error?.message ?? error ?? 'unknown error')
    .replace(SECRET_PATTERN, '$1=[redacted]')
    .replace(BEARER_PATTERN, 'Bearer [redacted]');
}

function toDate(value) {
  return value ? new Date(value) : new Date();
}

function unwrapResult(result = {}) {
  const recommendation =
    result.recommendation && typeof result.recommendation === 'object' ? result.recommendation : {};
  const context = result.context ?? {};

  return {
    ...context,
    ...recommendation,
    ...result,
    context: undefined,
    recommendation:
      result.recommendation && typeof result.recommendation === 'object'
        ? result.recommendation.recommendation
        : result.recommendation,
    metadata: {
      ...(context.metadata ?? {}),
      ...(recommendation.metadata ?? {}),
      ...(result.metadata ?? {}),
    },
  };
}

function resolveAsset(data) {
  return (
    data.asset?._id ?? data.asset?.id ?? data.asset?.assetId ?? data.asset ?? data.symbol ?? null
  );
}

function resolveUser(data) {
  return (
    data.user?._id ?? data.user?.id ?? data.user ?? data.userId ?? data.metadata?.userId ?? null
  );
}

function resolveMarketSnapshot(data) {
  return data.marketSnapshot ?? data.marketAnalysis ?? data.snapshots?.market ?? null;
}

function resolveTechnicalAnalysis(data) {
  return data.technicalSnapshot ?? data.technicalAnalysis ?? data.snapshots?.technical ?? null;
}

function mapMarketSnapshot(data) {
  const snapshot = resolveMarketSnapshot(data);
  if (!snapshot) return null;

  const price =
    snapshot.price ?? snapshot.close ?? snapshot.rawSnapshot?.price ?? snapshot.rawSnapshot?.close;

  return {
    asset: snapshot.asset ?? snapshot.assetId ?? resolveAsset(data),
    capturedAt: toDate(snapshot.capturedAt ?? snapshot.timestamp ?? data.timestamp),
    source: snapshot.source ?? data.metadata?.source ?? 'core',
    price,
    open: snapshot.open ?? 0,
    high: snapshot.high ?? price ?? 0,
    low: snapshot.low ?? price ?? 0,
    close: snapshot.close ?? price ?? 0,
    volume: snapshot.volume ?? 0,
    currency: snapshot.currency ?? data.currency ?? 'USD',
  };
}

function mapAnalysis(data, type) {
  const user = resolveUser(data);
  const asset = resolveAsset(data);
  const analyzedAt = toDate(data.timestamp ?? data.createdAt);
  const base = {
    user,
    asset,
    scope: asset ? 'asset' : 'portfolio',
    status: data.success === false ? 'failed' : 'completed',
    analyzedAt,
  };

  if (type === 'technical') {
    return {
      ...base,
      summary: 'Technical analysis persisted from recommendation result.',
      score: { value: data.score ?? 0, label: 'technical' },
    };
  }

  if (type === 'ai') {
    return {
      ...base,
      summary: data.aiAnalysis?.summary ?? data.aiAnalysis?.content ?? '',
      score: { value: data.score ?? 0, label: 'ai' },
    };
  }

  return {
    ...base,
    summary: data.reasons?.join(' ') ?? data.recommendation ?? '',
    score: { value: data.score ?? 0, label: data.recommendation ?? 'recommendation' },
  };
}

async function persistOperation(name, repository, payload) {
  if (!repository || !payload) {
    return { name, skipped: true };
  }

  try {
    return { name, success: true, data: await repository.create(payload) };
  } catch (error) {
    return { name, success: false, error: sanitizeError(error) };
  }
}

function normalizeResult(details) {
  const failures = details.filter((detail) => detail.success === false);

  if (failures.length === 0) {
    return { success: true, details };
  }

  return {
    success: false,
    error: PERSISTENCE_ERROR,
    details,
  };
}

export class AnalysisPersistenceService {
  constructor(context = { getRepository: () => null }) {
    this.context = context;
  }

  async saveAnalysis(result) {
    const data = unwrapResult(result);
    const marketSnapshotRepository = this.context.getRepository('marketSnapshotRepository');
    const analysisRepository = this.context.getRepository('analysisRepository');
    const details = [];

    details.push(
      await persistOperation('marketSnapshot', marketSnapshotRepository, mapMarketSnapshot(data)),
    );

    if (resolveTechnicalAnalysis(data)) {
      details.push(
        await persistOperation(
          'technicalAnalysis',
          analysisRepository,
          mapAnalysis(data, 'technical'),
        ),
      );
    }

    if (data.aiAnalysis) {
      details.push(
        await persistOperation('aiAnalysis', analysisRepository, mapAnalysis(data, 'ai')),
      );
    }

    if (data.recommendation) {
      details.push(
        await persistOperation(
          'recommendation',
          analysisRepository,
          mapAnalysis(data, 'recommendation'),
        ),
      );
    }

    return normalizeResult(details);
  }
}
