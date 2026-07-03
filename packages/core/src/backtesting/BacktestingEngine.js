import { BacktestReport } from './BacktestReport.js';
import { BacktestScenario } from './BacktestScenario.js';
import { BacktestSession } from './BacktestSession.js';

export class BacktestingEngine {
  run(input = []) {
    try {
      if (!Array.isArray(input) && !(input instanceof BacktestScenario)) {
        return BacktestReport.failed({
          code: 'INVALID_BACKTEST_INPUT',
          message: 'BacktestingEngine.run expects TradingSession[] or BacktestScenario.',
        });
      }

      const scenario =
        input instanceof BacktestScenario ? input : new BacktestScenario({ sessions: input });

      if (!Array.isArray(scenario.sessions)) {
        return BacktestReport.failed({
          code: 'INVALID_BACKTEST_INPUT',
          message: 'BacktestingEngine.run expects TradingSession[] or BacktestScenario.',
        });
      }

      const normalizedSessions = scenario.sessions.map((session, index) =>
        this.evaluateSession(session, index),
      );
      const validSessions = normalizedSessions.filter((session) => session.status !== 'invalid');
      const invalidSessions = normalizedSessions.filter((session) => session.status === 'invalid');

      return BacktestReport.build({
        sessions: validSessions,
        invalidSessions,
        inputCount: scenario.sessions.length,
      });
    } catch (error) {
      return BacktestReport.failed({
        code: 'BACKTEST_FAILED',
        message: error instanceof Error ? error.message : 'Backtest failed.',
      });
    }
  }

  evaluateSession(session, index = 0) {
    return BacktestSession.normalize(session, index);
  }
}
