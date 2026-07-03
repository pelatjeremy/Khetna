import { apiDelegates } from '../config/api.config.js';
import { sendSuccess } from './response.controller.js';

const DASHBOARD_SYMBOL = 'SNDK';

const DASHBOARD_DATA = {
  tradingSession: null,
  recommendation: null,
  marketSnapshot: null,
  technicalSnapshot: null,
  aiAnalysis: null,
  portfolioSummary: null,
};

const sanitizeMessage = (value) =>
  String(value ?? 'Dashboard section unavailable')
    .replace(/(api[_-]?key|token|secret|password)=([^&\s]+)/gi, '$1=[redacted]')
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [redacted]');

const sanitizeDashboardValue = (value, key = '') => {
  if (value === null || value === undefined) {
    return value;
  }

  if (/api[_-]?key|token|secret|password/i.test(key)) {
    return '[redacted]';
  }

  if (typeof value === 'string') {
    return sanitizeMessage(value);
  }

  if (value instanceof Date) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeDashboardValue(item));
  }

  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        sanitizeDashboardValue(entryValue, entryKey),
      ]),
    );
  }

  return value;
};

const normalizeUnavailableSection = (error) => ({
  success: false,
  error: {
    code: error?.code ?? 'DASHBOARD_SECTION_UNAVAILABLE',
    message: sanitizeMessage(error?.message),
  },
});

const isAvailableSection = (section) => section && section.success !== false;

const resolveDashboardSection = async (resolver) => {
  try {
    return sanitizeDashboardValue((await resolver()) ?? null);
  } catch (error) {
    return normalizeUnavailableSection(error);
  }
};

export const getDashboard = async (_request, response, next) => {
  try {
    const marketSnapshot = await resolveDashboardSection(() =>
      apiDelegates.market({ symbol: DASHBOARD_SYMBOL }),
    );
    const technicalSnapshot = isAvailableSection(marketSnapshot)
      ? await resolveDashboardSection(() => apiDelegates.technical({ marketSnapshot }))
      : null;
    const aiAnalysis = await resolveDashboardSection(() =>
      apiDelegates.analysis({
        asset: DASHBOARD_SYMBOL,
        marketSnapshot: isAvailableSection(marketSnapshot) ? marketSnapshot : null,
        technicalSnapshot: isAvailableSection(technicalSnapshot) ? technicalSnapshot : null,
      }),
    );
    const recommendation = await resolveDashboardSection(() =>
      apiDelegates.recommendation({
        asset: DASHBOARD_SYMBOL,
        marketSnapshot: isAvailableSection(marketSnapshot) ? marketSnapshot : null,
        technicalSnapshot: isAvailableSection(technicalSnapshot) ? technicalSnapshot : null,
        aiAnalysis: isAvailableSection(aiAnalysis) ? aiAnalysis : null,
      }),
    );

    return sendSuccess(response, {
      ...DASHBOARD_DATA,
      recommendation,
      marketSnapshot,
      technicalSnapshot,
      aiAnalysis,
    });
  } catch (error) {
    return next(error);
  }
};
