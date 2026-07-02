import { BacktestMetrics } from './BacktestMetrics.js';
import { BacktestReport } from './BacktestReport.js';
import { BacktestSession } from './BacktestSession.js';

export class BacktestingEngine {
  constructor() {}

  run(scenario) {
    const session = new BacktestSession({ scenario, status: 'running' });

    // TODO: Future sprints will execute historical simulation steps here.
    session.complete();

    return new BacktestReport({
      session,
      metrics: new BacktestMetrics(),
      summary: 'Backtest skeleton completed without financial calculation.',
    });
  }
}
