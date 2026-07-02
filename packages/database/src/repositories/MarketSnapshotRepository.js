import { MarketSnapshot } from '../models/marketSnapshot.model.js';

export const MarketSnapshotRepository = {
  create(data) {
    return MarketSnapshot.create(data);
  },

  findById(id) {
    return MarketSnapshot.findById(id);
  },

  findAll(filter = {}, options = {}) {
    return MarketSnapshot.find(filter, null, options);
  },

  update(id, data) {
    return MarketSnapshot.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  delete(id) {
    return MarketSnapshot.findByIdAndDelete(id);
  },

  findByAsset(asset, options = {}) {
    return MarketSnapshot.find({ asset }, null, options);
  },
};
