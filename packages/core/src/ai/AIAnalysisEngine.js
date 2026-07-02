import { AIAnalysisContract } from '../contracts/index.js';
import { AIAnalysisProvider } from './AIAnalysisProvider.js';
import { AIResponseMapper } from './AIResponseMapper.js';
import { PromptBuilder } from './PromptBuilder.js';

export class AIAnalysisEngine extends AIAnalysisContract {
  constructor({
    provider = new AIAnalysisProvider(),
    promptBuilder = new PromptBuilder(),
    responseMapper = new AIResponseMapper(),
  } = {}) {
    super();
    this.provider = provider;
    this.promptBuilder = promptBuilder;
    this.responseMapper = responseMapper;
  }

  async analyze(context) {
    const prompt = this.promptBuilder.build(context);
    const response = await this.provider.request(prompt);

    return this.responseMapper.toAnalysis(response);
  }

  async analyzeContext(context) {
    return this.analyze(context);
  }

  async parseResponse(response) {
    return this.responseMapper.toAnalysis(response);
  }

  async getModelStatus() {
    return {
      status: 'simulated',
      provider: this.provider.constructor.name,
    };
  }
}
