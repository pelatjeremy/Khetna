export class SchedulerContext {
  constructor({ source = null, payload = null, metadata = {} } = {}) {
    this.source = source;
    this.payload = payload;
    this.metadata = metadata;
  }

  toJSON() {
    return {
      source: this.source,
      payload: this.payload,
      metadata: this.metadata,
    };
  }
}
