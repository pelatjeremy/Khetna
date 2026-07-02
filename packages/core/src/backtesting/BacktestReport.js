export class BacktestReport {
  constructor({ session = null, metrics = null, summary = null } = {}) {
    this.session = session;
    this.metrics = metrics;
    this.summary = summary;
  }
}
