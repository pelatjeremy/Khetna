export class PipelineStep {
  constructor(name, execute) {
    if (!name) {
      throw new Error('PipelineStep requires a name.');
    }

    this.name = name;
    this.execute = execute ?? (async (context) => context);
  }
}
