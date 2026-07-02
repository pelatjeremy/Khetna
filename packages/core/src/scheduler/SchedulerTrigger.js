export class SchedulerTrigger {
  constructor({ type = null, config = {}, enabled = true } = {}) {
    this.type = type;
    this.config = config;
    this.enabled = enabled;
  }

  toJSON() {
    return {
      type: this.type,
      config: this.config,
      enabled: this.enabled,
    };
  }
}
