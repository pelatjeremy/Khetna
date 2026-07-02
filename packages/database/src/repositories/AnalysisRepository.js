import { Analysis } from '../models/analysis.model.js';

export const AnalysisRepository = {
  create(data) {
    return Analysis.create(data);
  },

  findById(id) {
    return Analysis.findById(id);
  },

  findAll(filter = {}, options = {}) {
    return Analysis.find(filter, null, options);
  },

  update(id, data) {
    return Analysis.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  delete(id) {
    return Analysis.findByIdAndDelete(id);
  },

  findByUser(user, options = {}) {
    return Analysis.find({ user }, null, options);
  },

  findByAsset(asset, options = {}) {
    return Analysis.find({ asset }, null, options);
  },
};
