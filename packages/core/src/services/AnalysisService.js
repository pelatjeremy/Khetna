import { AnalysisRepository } from '@tradeai/database/src/repositories/index.js';

export const AnalysisService = {
  async createAnalysis(data) {
    return AnalysisRepository.create(data);
  },

  async getAnalyses(filter = {}, options = {}) {
    return AnalysisRepository.findAll(filter, options);
  },
};
