export class PipelineContext {
  constructor(initialState = {}) {
    this.state = { ...initialState };
  }

  set(key, value) {
    this.state[key] = value;
    return this;
  }

  get(key) {
    return this.state[key];
  }

  has(key) {
    return Object.hasOwn(this.state, key);
  }

  toJSON() {
    return { ...this.state };
  }
}
