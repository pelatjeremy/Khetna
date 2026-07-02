import { EvaluationRepository } from '@tradeai/database/src/repositories/index.js';

export const EvaluationService = {
  async createEvaluation(data) {
    return EvaluationRepository.create(data);
  },

  async getEvaluations(filter = {}, options = {}) {
    return EvaluationRepository.findAll(filter, options);
  },
};
