import {
  AIAnalysisEngine,
  AnalysisPersistenceService,
  MarketDataEngine,
  PortfolioPersistenceService,
  RecommendationEngine,
  TechnicalAnalysisEngine,
  createTradingIntegrationCore,
} from '@tradeai/core';

export const apiConfig = {
  port: process.env.API_PORT || 3001,
};

export const tradingCore = createTradingIntegrationCore();

const marketDataEngine = new MarketDataEngine();
const technicalAnalysisEngine = new TechnicalAnalysisEngine();
const aiAnalysisEngine = new AIAnalysisEngine();
const recommendationEngine = new RecommendationEngine();
const portfolioPersistenceService = new PortfolioPersistenceService();
const analysisPersistenceService = new AnalysisPersistenceService();

const resolveSymbol = (input) =>
  input.symbol ??
  input.assetId ??
  input.asset?.symbol ??
  input.asset?.id ??
  input.marketSnapshot?.symbol ??
  input.marketSnapshot?.assetId ??
  input.asset;
const resolveMarketInput = (input) => input.marketData ?? input.marketSnapshot ?? input;
const resolveMarketEngine = (input) =>
  input.marketSnapshot
    ? new MarketDataEngine({
        provider: {
          getLatestSnapshot: async () => input.marketSnapshot,
        },
      })
    : marketDataEngine;

export const apiDelegates = {
  market: (input) =>
    resolveMarketEngine(input).getLatestSnapshot(resolveSymbol(input), input.options),
  technical: (input) => technicalAnalysisEngine.analyze(resolveMarketInput(input)),
  analysis: (input) => aiAnalysisEngine.analyze(input),
  recommendation: (input) => recommendationEngine.generate(input),
  savePortfolio: (input) => portfolioPersistenceService.savePortfolioSnapshot(input),
  saveAnalysis: (input) => analysisPersistenceService.saveAnalysis(input),
};
