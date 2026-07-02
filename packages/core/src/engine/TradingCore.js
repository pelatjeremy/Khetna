import { PipelineContext } from './PipelineContext.js';
import { TradingPipeline } from './TradingPipeline.js';

export class TradingCore {
  constructor({ pipeline = new TradingPipeline(), services = {} } = {}) {
    this.pipeline = pipeline;
    this.services = services;
  }

  async run(input = {}) {
    const context = new PipelineContext({
      input,
      services: this.services,
    });

    return this.pipeline.execute(context);
  }
}
