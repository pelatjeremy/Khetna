export class BacktestScenario {
  constructor({ name = null, asset = null, period = null, recommendation = null } = {}) {
    this.name = name;
    this.asset = asset;
    this.period = period;
    this.recommendation = recommendation;
  }
}
