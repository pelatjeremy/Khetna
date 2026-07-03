function createJobId() {
  return `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export class SchedulerJob {
  constructor({
    id = createJobId(),
    name = null,
    trigger = null,
    context = null,
    enabled = true,
    input = null,
    task = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.trigger = trigger;
    this.context = context;
    this.enabled = enabled;
    this.input = input;
    this.task = task;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      trigger: this.trigger,
      context: this.context,
      enabled: this.enabled,
      input: this.input,
      hasTask: typeof this.task === 'function',
    };
  }
}
