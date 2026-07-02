export class RecommendationBuilder {
  build({
    asset = null,
    marketAnalysis = null,
    technicalAnalysis = null,
    aiAnalysis = null,
    scores = null,
    generatedAt = new Date().toISOString(),
  } = {}) {
    return {
      asset,
      generatedAt,
      recommendation: {
        status: 'neutral',
        confidence: null,
        summary: null,
      },
      inputs: {
        market: marketAnalysis,
        technical: technicalAnalysis,
        ai: aiAnalysis,
      },
      scores,
      metadata: {
        engine: 'recommendation',
        version: '1.0.0',
      },
    };
  }
}
