function freezeSessionValue(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);

  for (const nestedValue of Object.values(value)) {
    freezeSessionValue(nestedValue);
  }

  return value;
}

export class TradingSession {
  constructor({
    sessionId = null,
    timestamp = null,
    symbol = null,
    portfolioSnapshot = null,
    marketSnapshot = null,
    technicalSnapshot = null,
    aiAnalysis = null,
    recommendation = null,
    metadata = null,
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

    freezeSessionValue(this);
  }
}
