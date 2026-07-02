import { PortfolioSnapshot } from '../models/portfolioSnapshot.model.js';

export const PortfolioSnapshotRepository = {
  create(data) {
    return PortfolioSnapshot.create(data);
  },

  findById(id) {
    return PortfolioSnapshot.findById(id);
  },

  findAll(filter = {}, options = {}) {
    return PortfolioSnapshot.find(filter, null, options);
  },

  update(id, data) {
    return PortfolioSnapshot.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  delete(id) {
    return PortfolioSnapshot.findByIdAndDelete(id);
  },

  findByUser(user, options = {}) {
    return PortfolioSnapshot.find({ user }, null, options);
  },
};
