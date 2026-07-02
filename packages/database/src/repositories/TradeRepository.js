import { Trade } from '../models/trade.model.js';

export const TradeRepository = {
  create(data) {
    return Trade.create(data);
  },

  findById(id) {
    return Trade.findById(id);
  },

  findAll(filter = {}, options = {}) {
    return Trade.find(filter, null, options);
  },

  update(id, data) {
    return Trade.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  delete(id) {
    return Trade.findByIdAndDelete(id);
  },

  findByUser(user, options = {}) {
    return Trade.find({ user }, null, options);
  },

  findByAsset(asset, options = {}) {
    return Trade.find({ asset }, null, options);
  },
};
