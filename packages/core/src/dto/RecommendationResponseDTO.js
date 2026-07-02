export class RecommendationResponseDTO {
  constructor({
    status = null,
    recommendation = null,
    confidence = null,
    riskLevel = null,
    metadata = null,
  } = {}) {
    this.status = status;
    this.recommendation = recommendation;
    this.confidence = confidence;
    this.riskLevel = riskLevel;
    this.metadata = metadata;
  }
}
