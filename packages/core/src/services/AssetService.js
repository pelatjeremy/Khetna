import { AssetRepository } from '@tradeai/database/src/repositories/index.js';

export const AssetService = {
  async createAsset(data) {
    return AssetRepository.create(data);
  },

  async updateAsset(id, data) {
    return AssetRepository.update(id, data);
  },

  async getAssetById(id) {
    return AssetRepository.findById(id);
  },

  async getAssets(filter = {}, options = {}) {
    return AssetRepository.findAll(filter, options);
  },
};
