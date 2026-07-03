import { BacktestMetrics } from './BacktestMetrics.js';

export class BacktestReport {
  constructor({
    success = true,
    sessions = [],
    metrics = new BacktestMetrics(),
    errors = [],
    metadata = {},
  } = {}) {
    this.success = success;
    this.sessions = sessions;
    this.metrics = metrics;
    this.errors = errors;
    this.metadata = metadata;
  }

  static build({ sessions = [], invalidSessions = [], inputCount = 0 } = {}) {
    const errors = invalidSessions.map((session) => session.error).filter(Boolean);

    return new BacktestReport({
      success: errors.length === 0,
      sessions,
      metrics: BacktestMetrics.calculate(sessions),
      errors,
      metadata: {
        inputSessions: inputCount,
        ignoredSessions: errors.length,
      },
    });
  }

  static failed(error) {
    return new BacktestReport({
      success: false,
      errors: [error],
    });
  }
}
