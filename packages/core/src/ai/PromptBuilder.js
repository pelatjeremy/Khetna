export class PromptBuilder {
  build(context) {
    return {
      version: 'sprint-10-ai-analysis',
      context: context ?? {},
      sections: ['marketContext', 'technicalContext', 'portfolioContext', 'riskContext'],
      constraints: {
        externalCalls: false,
        complexTradingLogic: false,
      },
    };
  }
}
