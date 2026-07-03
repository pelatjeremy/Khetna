import { apiDelegates } from '../config/api.config.js';
import { sendSuccess } from './response.controller.js';

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

const normalizeUnavailableSection = (error) => ({
  success: false,
  error: {
    code: error?.code ?? 'DASHBOARD_SECTION_UNAVAILABLE',
    message: sanitizeMessage(error?.message),
  },
});

const resolveDashboardSection = async (resolver) => {
  try {
    return (await resolver()) ?? null;
  } catch (error) {
    return normalizeUnavailableSection(error);
  }
};

export const getDashboard = async (_request, response, next) => {
  try {
    const technicalSnapshot = await resolveDashboardSection(() => apiDelegates.technical({}));

    return sendSuccess(response, {
      ...DASHBOARD_DATA,
      technicalSnapshot,
    });
  } catch (error) {
    return next(error);
  }
};
