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

function mapPortfolioSnapshot(snapshot) {
  if (!snapshot) return null;

  return {
    user: snapshot.user?._id ?? snapshot.user?.id ?? snapshot.user ?? snapshot.userId,
    capturedAt: toDate(snapshot.capturedAt ?? snapshot.timestamp),
    totalValue: snapshot.totalValue ?? 0,
    cashBalance: snapshot.cashBalance ?? 0,
    currency: snapshot.currency ?? 'USD',
    positions: snapshot.positions ?? [],
  };
}

export class PortfolioPersistenceService {
  constructor(context = { getRepository: () => null }) {
    this.context = context;
  }

  async savePortfolioSnapshot(snapshot) {
    const repository = this.context.getRepository('portfolioSnapshotRepository');
    const payload = mapPortfolioSnapshot(snapshot);

    if (!repository || !payload) {
      return { success: true, details: [{ name: 'portfolioSnapshot', skipped: true }] };
    }

    try {
      return {
        success: true,
        details: [
          { name: 'portfolioSnapshot', success: true, data: await repository.create(payload) },
        ],
      };
    } catch (error) {
      return {
        success: false,
        error: PERSISTENCE_ERROR,
        details: [{ name: 'portfolioSnapshot', success: false, error: sanitizeError(error) }],
      };
    }
  }
}
