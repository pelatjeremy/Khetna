import { PipelineStep } from './PipelineStep.js';

export const TRADING_PIPELINE_STEP_NAMES = [
  'Load Asset',
  'Load Trades',
  'Build Portfolio',
  'Load Market Snapshot',
  'Build Analysis Context',
  'Run AI Analysis',
  'Persist Analysis',
  'Evaluate Previous Analysis',
  'Return Result',
];

const createDefaultSteps = () => [
  new PipelineStep('Load Asset', async (context) => {
    // TODO: call AssetService to load asset data during a future implementation.
    return context;
  }),
  new PipelineStep('Load Trades', async (context) => {
    // TODO: call TradeService to load trade data during a future implementation.
    return context;
  }),
  new PipelineStep('Build Portfolio', async (context) => {
    // TODO: call PortfolioService to build a portfolio during a future implementation.
    return context;
  }),
  new PipelineStep('Load Market Snapshot', async (context) => {
    // TODO: call MarketSnapshotService to load provided market data during a future implementation.
    return context;
  }),
  new PipelineStep('Build Analysis Context', async (context) => {
    // TODO: assemble analysis input from prior context values during a future implementation.
    return context;
  }),
  new PipelineStep('Run AI Analysis', async (context) => {
    // TODO: call a validated analysis service abstraction during a future implementation.
    return context;
  }),
  new PipelineStep('Persist Analysis', async (context) => {
    // TODO: call AnalysisService to persist analysis output during a future implementation.
    return context;
  }),
  new PipelineStep('Evaluate Previous Analysis', async (context) => {
    // TODO: call EvaluationService to compare prior analysis during a future implementation.
    return context;
  }),
  new PipelineStep('Return Result', async (context) => {
    // TODO: expose the final orchestration result during a future implementation.
    return context;
  }),
];

export class TradingPipeline {
  constructor({ steps = createDefaultSteps() } = {}) {
    this.steps = steps;
  }

  async execute(context) {
    let currentContext = context;

    for (const step of this.steps) {
      currentContext = await step.execute(currentContext);
    }

    return currentContext;
  }
}
