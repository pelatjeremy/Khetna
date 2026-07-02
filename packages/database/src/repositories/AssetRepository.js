import { Asset } from '../models/asset.model.js';

export const AssetRepository = {
  create(data) {
    return Asset.create(data);
  },

  findById(id) {
    return Asset.findById(id);
  },

  findAll(filter = {}, options = {}) {
    return Asset.find(filter, null, options);
  },

  update(id, data) {
    return Asset.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  delete(id) {
    return Asset.findByIdAndDelete(id);
  },

  findBySymbol(symbol) {
    return Asset.findOne({ symbol });
  },

  findByType(assetType, options = {}) {
    return Asset.find({ assetType }, null, options);
  },
};
