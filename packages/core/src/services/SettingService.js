import { SettingRepository } from '@tradeai/database/src/repositories/index.js';

export const SettingService = {
  async createSetting(data) {
    return SettingRepository.create(data);
  },

  async updateSetting(id, data) {
    return SettingRepository.update(id, data);
  },

  async getSettingById(id) {
    return SettingRepository.findById(id);
  },

  async getSettings(filter = {}, options = {}) {
    return SettingRepository.findAll(filter, options);
  },
};
