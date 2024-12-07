import { favoriteService } from "../services/favoriteService.js";
import { responseHandler } from "../utils/responseHandler.js";

export const favoriteController = {
  async getFavorites(req, res) {
    try {
      const { category } = req.params;
      const { limit = 5, offset = 0 } = req.query;

      const favorites = await favoriteService.getFavorites(
        req.user._id,
        category,
        parseInt(limit),
        parseInt(offset)
      );
      responseHandler(
        res,
        200,
        favorites,
        "Favorites retrieved successfully.",
        null
      );
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async addFavorite(req, res) {
    try {
      const { category, item_id } = req.body;
      const favorite = await favoriteService.addFavorite(
        req.user._id,
        category,
        item_id
      );
      responseHandler(res, 201, null, "Favorite added successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async removeFavorite(req, res) {
    try {
      const { id } = req.params;
      const favorite = await favoriteService.removeFavorite(id);
      if (!favorite) {
        return responseHandler(res, 404, null, "Favorite not found.", null);
      }
      responseHandler(res, 200, null, "Favorite removed successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },
};
