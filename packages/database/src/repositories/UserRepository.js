import { User } from '../models/user.model.js';

export const UserRepository = {
  create(data) {
    return User.create(data);
  },

  findById(id) {
    return User.findById(id);
  },

  findAll(filter = {}, options = {}) {
    return User.find(filter, null, options);
  },

  update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  delete(id) {
    return User.findByIdAndDelete(id);
  },

  findByEmail(email) {
    return User.findOne({ email });
  },
};
