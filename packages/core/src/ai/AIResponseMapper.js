export class AIResponseMapper {
  toAnalysis(response) {
    if (!response) {
      return null;
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
