import { TradeRepository } from '@tradeai/database/src/repositories/index.js';

export const TradeService = {
  async createTrade(data) {
    return TradeRepository.create(data);
  },

  async updateTrade(id, data) {
    return TradeRepository.update(id, data);
  },

  async deleteTrade(id) {
    return TradeRepository.delete(id);
  },

  async getTradeById(id) {
    return TradeRepository.findById(id);
  },

  async getTrades(filter = {}, options = {}) {
    return TradeRepository.findAll(filter, options);
  },
};
