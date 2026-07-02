import { Evaluation } from '../models/evaluation.model.js';

export const EvaluationRepository = {
  create(data) {
    return Evaluation.create(data);
  },

  findById(id) {
    return Evaluation.findById(id);
  },

  findAll(filter = {}, options = {}) {
    return Evaluation.find(filter, null, options);
  },

  update(id, data) {
    return Evaluation.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  delete(id) {
    return Evaluation.findByIdAndDelete(id);
  },

  findByAnalysis(analysis, options = {}) {
    return Evaluation.find({ analysis }, null, options);
  },
};
