import { OpenAIAnalysisProvider } from './OpenAIAnalysisProvider.js';

export class AIProviderFactory {
  static create({ provider, providerName = process.env.AI_PROVIDER } = {}) {
    if (provider) {
      return provider;
    }

    const normalizedProvider = providerName ? String(providerName).trim().toLowerCase() : 'openai';

    if (normalizedProvider === 'openai') {
      return new OpenAIAnalysisProvider();
    }

    throw new Error(`Unknown AI provider: ${normalizedProvider}.`);
  }
}
