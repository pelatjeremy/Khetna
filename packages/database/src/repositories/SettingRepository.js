import { Setting } from '../models/setting.model.js';

export const SettingRepository = {
  create(data) {
    return Setting.create(data);
  },

  findById(id) {
    return Setting.findById(id);
  },

  findAll(filter = {}, options = {}) {
    return Setting.find(filter, null, options);
  },

  update(id, data) {
    return Setting.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  delete(id) {
    return Setting.findByIdAndDelete(id);
  },

  findByUser(user, options = {}) {
    return Setting.find({ user }, null, options);
  },
};
