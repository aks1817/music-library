import { userService } from "../services/userService.js";
import { responseHandler } from "../utils/responseHandler.js";

export const userController = {
  async getAllUsers(req, res) {
    try {
      const { limit = 5, offset = 0, role } = req.query;
      const users = await userService.getAllUsers(
        parseInt(limit),
        parseInt(offset),
        role
      );
      responseHandler(res, 200, users, "Users retrieved successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async addUser(req, res) {
    try {
      const { email, password, role } = req.body;
      if (req.user.role !== "admin") {
        return responseHandler(res, 403, null, "Forbidden Access", null);
      }
      if (!["editor", "viewer"].includes(role)) {
        return responseHandler(res, 400, null, "Invalid role", null);
      }
      const user = await userService.addUser(email, password, role);
      responseHandler(res, 201, null, "User created successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      responseHandler(res, 200, null, "User deleted successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async updatePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      await userService.updatePassword(req.user, oldPassword, newPassword);
      responseHandler(res, 204, null, null, null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },
};
