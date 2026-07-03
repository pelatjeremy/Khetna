export class BacktestScenario {
  constructor({ name = 'default', description = null, sessions = [] } = {}) {
    this.name = name;
    this.description = description;
    this.sessions = sessions;
  }
}
