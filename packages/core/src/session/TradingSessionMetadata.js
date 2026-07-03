export class TradingSessionMetadata {
  constructor({ source = null, version = null, environment = null, createdAt = null } = {}) {
    this.source = source;
    this.version = version;
    this.environment = environment;
    this.createdAt = createdAt;

    Object.freeze(this);
  }
}
