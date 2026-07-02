export class AIResponseMapper {
  toAnalysis(response) {
    if (!response) {
      return null;
    }

    if (typeof response.content === 'string' || response.success !== undefined) {
      return {
        summary: response.content ?? null,
        observations: [],
        risks: [],
        opportunities: [],
        confidence: null,
        metadata: {
          success: response.success ?? null,
          provider: response.provider ?? null,
          model: response.model ?? null,
          error: response.error ?? null,
        },
        rawAIResponse: response,
      };
    }

    return {
      summary: response.content?.summary ?? null,
      observations: response.content?.observations ?? [],
      risks: response.content?.risks ?? [],
      opportunities: response.content?.opportunities ?? [],
      confidence: response.content?.confidence ?? null,
      metadata: response.metadata ?? {},
      rawAIResponse: response,
    };
  }
}
