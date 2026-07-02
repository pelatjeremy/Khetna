export class RecommendationResult {
  constructor({ status = 'completed', recommendation = null, context = null, metadata = {} } = {}) {
    this.status = status;
    this.recommendation = recommendation;
    this.context = context;
    this.metadata = metadata;
    this.createdAt = new Date().toISOString();
  }

  toJSON() {
    return {
      status: this.status,
      recommendation: this.recommendation,
      context: this.context,
      metadata: this.metadata,
      createdAt: this.createdAt,
    };
  }
}
