export class NotificationContext {
  constructor({ source = null, recommendation = null, portfolio = null, metadata = {} } = {}) {
    this.source = source;
    this.recommendation = recommendation;
    this.portfolio = portfolio;
    this.metadata = metadata;
  }
}
