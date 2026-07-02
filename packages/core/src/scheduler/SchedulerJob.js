export class SchedulerJob {
  constructor({ id = null, name = null, trigger = null, context = null, enabled = true } = {}) {
    this.id = id;
    this.name = name;
    this.trigger = trigger;
    this.context = context;
    this.enabled = enabled;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      trigger: this.trigger,
      context: this.context,
      enabled: this.enabled,
    };
  }
}
