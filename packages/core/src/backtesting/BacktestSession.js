export class BacktestSession {
  constructor({
    id = null,
    scenario = null,
    status = 'pending',
    startedAt = new Date(),
    completedAt = null,
  } = {}) {
    this.id = id;
    this.scenario = scenario;
    this.status = status;
    this.startedAt = startedAt;
    this.completedAt = completedAt;
  }

  complete() {
    this.status = 'completed';
    this.completedAt = new Date();
  }
}
