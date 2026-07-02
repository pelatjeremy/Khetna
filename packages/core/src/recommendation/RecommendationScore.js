export class RecommendationScore {
  aggregate({ marketAnalysis = null, technicalAnalysis = null, aiAnalysis = null } = {}) {
    const market = this.extractScore(marketAnalysis);
    const technical = this.extractScore(technicalAnalysis);
    const ai = this.extractScore(aiAnalysis);

    return {
      market,
      technical,
      ai,
      aggregated: null,
    };
  }

  extractScore(analysis) {
    if (!analysis) {
      return null;
    }

    return analysis.score ?? analysis.scores?.aggregated ?? null;
  }
}
