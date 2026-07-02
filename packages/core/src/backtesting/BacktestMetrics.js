export class BacktestMetrics {
  constructor({
    totalRecommendations = 0,
    successfulRecommendations = 0,
    failedRecommendations = 0,
    neutralRecommendations = 0,
  } = {}) {
    this.totalRecommendations = totalRecommendations;
    this.successfulRecommendations = successfulRecommendations;
    this.failedRecommendations = failedRecommendations;
    this.neutralRecommendations = neutralRecommendations;
  }
}
