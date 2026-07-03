export class TradingSessionContext {
  constructor({
    sessionId = null,
    timestamp = null,
    symbol = null,
    portfolioSnapshot = null,
    marketSnapshot = null,
    technicalSnapshot = null,
    aiAnalysis = null,
    recommendation = null,
    metadata = {},
  } = {}) {
    this.sessionId = sessionId;
    this.timestamp = timestamp;
    this.symbol = symbol;
    this.portfolioSnapshot = portfolioSnapshot;
    this.marketSnapshot = marketSnapshot;
    this.technicalSnapshot = technicalSnapshot;
    this.aiAnalysis = aiAnalysis;
    this.recommendation = recommendation;
    this.metadata = metadata;
  }
}
