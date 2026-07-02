import { MarketSnapshotRepository } from '@tradeai/database/src/repositories/index.js';

export const MarketSnapshotService = {
  async createMarketSnapshot(data) {
    return MarketSnapshotRepository.create(data);
  },

  async getMarketSnapshots(filter = {}, options = {}) {
    return MarketSnapshotRepository.findAll(filter, options);
  },
};
