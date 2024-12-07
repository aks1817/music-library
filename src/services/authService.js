import { User } from "../models/User.js";

export const authService = {
  async signup(email, password) {
    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "viewer";

    const user = new User({ email, password, role });
    await user.save();
    const token = await user.generateAuthToken();
    return { user, token };
  },

  async login(email, password) {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return { user, token };
  },

  async logout(user, token) {
    user.tokens = user.tokens.filter((t) => t.token !== token);
    await user.save();
  },
};
