import { AIAnalysisEngine } from '../ai/index.js';
import { TradingCore } from '../engine/index.js';
import { MarketDataEngine } from '../market/index.js';
import { RecommendationEngine } from '../recommendation/index.js';
import { TechnicalAnalysisEngine } from '../technical/index.js';
import { IntegrationContext } from './IntegrationContext.js';
import { RecommendationResult } from './RecommendationResult.js';

const resolveInput = (input) => {
  if (input?.get) {
    return input.get('input') ?? {};
  }

  return input ?? {};
};

const resolveAssetId = (context) => {
  if (typeof context.asset === 'string') {
    return context.asset;
  }

  return context.asset?.id ?? context.asset?.assetId ?? context.marketSnapshot?.assetId ?? null;
};

const createMarketDataEngine = (marketSnapshot) =>
  new MarketDataEngine({
    provider: {
      async getLatestSnapshot() {
        return marketSnapshot;
      },
    },
  });

export class TradingIntegrationPipeline {
  constructor({
    marketDataEngine = null,
    technicalAnalysisEngine = new TechnicalAnalysisEngine(),
    aiAnalysisEngine = new AIAnalysisEngine(),
    recommendationEngine = new RecommendationEngine(),
  } = {}) {
    this.marketDataEngine = marketDataEngine;
    this.technicalAnalysisEngine = technicalAnalysisEngine;
    this.aiAnalysisEngine = aiAnalysisEngine;
    this.recommendationEngine = recommendationEngine;
  }

  async execute(input = {}) {
    let context = new IntegrationContext(resolveInput(input));
    const marketDataEngine =
      this.marketDataEngine ?? createMarketDataEngine(context.marketSnapshot);

    const marketSnapshot = await marketDataEngine.prepareMarketContext(resolveAssetId(context));
    context = context.with({ marketSnapshot });

    const technicalSnapshot = await this.technicalAnalysisEngine.analyze(context.marketSnapshot);
    context = context.with({ technicalSnapshot });

    const aiAnalysis = await this.aiAnalysisEngine.analyze({
      asset: context.asset,
      portfolio: context.portfolio,
      marketSnapshot: context.marketSnapshot,
      technicalSnapshot: context.technicalSnapshot,
      metadata: context.metadata,
    });
    context = context.with({ aiAnalysis });

    const recommendation = this.recommendationEngine.generate({
      asset: context.asset,
      marketAnalysis: context.marketSnapshot,
      technicalAnalysis: context.technicalSnapshot,
      aiAnalysis: context.aiAnalysis,
    });
    context = context.with({ recommendation });

    return new RecommendationResult({
      recommendation,
      context: context.toJSON(),
      metadata: {
        pipeline: 'trading-integration',
        ...context.metadata,
      },
    });
  }
}

export const createTradingIntegrationCore = (options = {}) =>
  new TradingCore({
    pipeline: new TradingIntegrationPipeline(options),
    services: options.services ?? {},
  });
