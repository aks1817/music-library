import { User } from '../models/User.js';

export const userService = {
  async getAllUsers(limit, offset, role) {
    const query = role ? { role } : {};
    const users = await User.find(query)
      .limit(limit)
      .skip(offset)
      .select('-password -tokens');
    return users;
  },

  async addUser(email, password, role) {
    const user = new User({ email, password, role });
    await user.save();
    return user;
  },

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  },

  async updatePassword(user, oldPassword, newPassword) {
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }
    user.password = newPassword;
    await user.save();
  },
};

