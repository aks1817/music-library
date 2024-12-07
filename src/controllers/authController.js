import { authService } from "../services/authService.js";
import { responseHandler } from "../utils/responseHandler.js";

export const authController = {
  async signup(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.signup(email, password);
      responseHandler(
        res,
        201,
        { token, role: user.role },
        "User created successfully.",
        null
      );
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);
      responseHandler(
        res,
        200,
        { token, role: user.role },
        "Login successful.",
        null
      );
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async logout(req, res) {
    try {
      await authService.logout(req.user, req.token);
      responseHandler(res, 200, null, "User logged out successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },
};
