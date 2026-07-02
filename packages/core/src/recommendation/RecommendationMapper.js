export class RecommendationMapper {
  toRecommendation(rawRecommendation = {}) {
    return {
      asset: rawRecommendation.asset ?? null,
      generatedAt: rawRecommendation.generatedAt ?? new Date().toISOString(),
      recommendation: {
        status: 'neutral',
        confidence: rawRecommendation.recommendation?.confidence ?? null,
        summary: rawRecommendation.recommendation?.summary ?? null,
      },
      inputs: {
        market: rawRecommendation.inputs?.market ?? null,
        technical: rawRecommendation.inputs?.technical ?? null,
        ai: rawRecommendation.inputs?.ai ?? null,
      },
      scores: {
        market: rawRecommendation.scores?.market ?? null,
        technical: rawRecommendation.scores?.technical ?? null,
        ai: rawRecommendation.scores?.ai ?? null,
        aggregated: rawRecommendation.scores?.aggregated ?? null,
      },
      metadata: {
        engine: 'recommendation',
        version: '1.0.0',
        ...rawRecommendation.metadata,
      },
    };
  }
}
