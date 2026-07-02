export class AIAnalysisProvider {
  async request(prompt) {
    return {
      provider: 'simulated-ai-analysis-provider',
      content: {
        summary: null,
        observations: [],
        risks: [],
        opportunities: [],
        confidence: null,
      },
      metadata: {
        status: 'simulated',
        promptVersion: prompt?.version ?? null,
      },
    };
  }
}
