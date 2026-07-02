import { AIAnalysisContract } from '../contracts/index.js';
import { AIResponseMapper } from './AIResponseMapper.js';
import { PromptBuilder } from './PromptBuilder.js';
import { AIProviderFactory } from './providers/AIProviderFactory.js';

export class AIAnalysisEngine extends AIAnalysisContract {
  constructor({
    provider = null,
    providerFactory = AIProviderFactory,
    providerName,
    promptBuilder = new PromptBuilder(),
    responseMapper = new AIResponseMapper(),
  } = {}) {
    super();
    this.provider = provider;
    this.providerFactory = providerFactory;
    this.providerName = providerName;
    this.promptBuilder = promptBuilder;
    this.responseMapper = responseMapper;
  }

  async analyze(context) {
    const prompt = this.promptBuilder.build(context);
    const provider = this.resolveProvider();
    const response = await provider.request(prompt);

    return this.responseMapper.toAnalysis(response);
  }

  async analyzeContext(context) {
    return this.analyze(context);
  }

  async parseResponse(response) {
    return this.responseMapper.toAnalysis(response);
  }

  async getModelStatus() {
    const provider = this.resolveProvider();

    return {
      status: 'configured',
      provider: provider.constructor.name,
    };
  }

  resolveProvider() {
    if (this.provider) {
      return this.provider;
    }

    if (!this.providerFactory || typeof this.providerFactory.create !== 'function') {
      throw new Error('AI provider factory is not configured.');
    }

    return this.providerFactory.create({ providerName: this.providerName });
  }
}
