import { UserRepository } from '@tradeai/database/src/repositories/index.js';

export const UserService = {
  async createUser(data) {
    return UserRepository.create(data);
  },

  async updateUser(id, data) {
    return UserRepository.update(id, data);
  },

  async getUserById(id) {
    return UserRepository.findById(id);
  },

  async getUsers(filter = {}, options = {}) {
    return UserRepository.findAll(filter, options);
  },
};
