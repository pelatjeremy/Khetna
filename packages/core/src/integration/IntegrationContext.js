export class IntegrationContext {
  constructor({
    userId = null,
    asset = null,
    portfolio = null,
    marketSnapshot = null,
    technicalSnapshot = null,
    aiAnalysis = null,
    recommendation = null,
    metadata = {},
  } = {}) {
    this.userId = userId;
    this.asset = asset;
    this.portfolio = portfolio;
    this.marketSnapshot = marketSnapshot;
    this.technicalSnapshot = technicalSnapshot;
    this.aiAnalysis = aiAnalysis;
    this.recommendation = recommendation;
    this.metadata = metadata;
  }

  with(updates = {}) {
    return new IntegrationContext({
      ...this.toJSON(),
      ...updates,
      metadata: {
        ...this.metadata,
        ...updates.metadata,
      },
    });
  }

  toJSON() {
    return {
      userId: this.userId,
      asset: this.asset,
      portfolio: this.portfolio,
      marketSnapshot: this.marketSnapshot,
      technicalSnapshot: this.technicalSnapshot,
      aiAnalysis: this.aiAnalysis,
      recommendation: this.recommendation,
      metadata: this.metadata,
    };
  }
}
