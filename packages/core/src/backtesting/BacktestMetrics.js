const roundMetric = (value) => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Number(value.toFixed(6));
};

export class BacktestMetrics {
  constructor({
    testedSessions = 0,
    winningSignals = 0,
    losingSignals = 0,
    winRate = 0,
    averageGain = 0,
    averageLoss = 0,
    simplifiedProfitFactor = 0,
    simplifiedTotalPerformance = 0,
    simplifiedDrawdown = 0,
  } = {}) {
    this.testedSessions = testedSessions;
    this.winningSignals = winningSignals;
    this.losingSignals = losingSignals;
    this.winRate = winRate;
    this.averageGain = averageGain;
    this.averageLoss = averageLoss;
    this.simplifiedProfitFactor = simplifiedProfitFactor;
    this.simplifiedTotalPerformance = simplifiedTotalPerformance;
    this.simplifiedDrawdown = simplifiedDrawdown;
  }

  static calculate(sessions = []) {
    const testedSessions = sessions.length;
    const winning = sessions.filter((session) => session.performance > 0);
    const losing = sessions.filter((session) => session.performance < 0);
    const totalGain = winning.reduce((sum, session) => sum + session.performance, 0);
    const totalLoss = losing.reduce((sum, session) => sum + session.performance, 0);
    const totalPerformance = sessions.reduce((sum, session) => sum + session.performance, 0);

    return new BacktestMetrics({
      testedSessions,
      winningSignals: winning.length,
      losingSignals: losing.length,
      winRate: roundMetric(testedSessions > 0 ? winning.length / testedSessions : 0),
      averageGain: roundMetric(winning.length > 0 ? totalGain / winning.length : 0),
      averageLoss: roundMetric(losing.length > 0 ? totalLoss / losing.length : 0),
      simplifiedProfitFactor: roundMetric(
        totalLoss < 0 ? totalGain / Math.abs(totalLoss) : totalGain > 0 ? totalGain : 0,
      ),
      simplifiedTotalPerformance: roundMetric(totalPerformance),
      simplifiedDrawdown: roundMetric(BacktestMetrics.calculateDrawdown(sessions)),
    });
  }

  static calculateDrawdown(sessions = []) {
    let cumulative = 0;
    let peak = 0;
    let maxDrawdown = 0;

    for (const session of sessions) {
      cumulative += session.performance;
      peak = Math.max(peak, cumulative);
      maxDrawdown = Math.max(maxDrawdown, peak - cumulative);
    }

    return maxDrawdown;
  }
}
