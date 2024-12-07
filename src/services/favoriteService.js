import { Favorite } from "../models/Favorite.js";

export const favoriteService = {
  async getFavorites(userId, category, limit, offset) {
    const favorites = await Favorite.find({
      user: userId,
      category,
    })
      .limit(limit)
      .skip(offset)
      .populate("item", "name");

    return favorites;
  },

  async addFavorite(userId, category, itemId) {
    const favorite = new Favorite({
      user: userId,
      category,
      item: itemId,
    });
    await favorite.save();
    return favorite;
  },

  async removeFavorite(id) {
    const favorite = await Favorite.findByIdAndDelete(id);
    return favorite;
  },
};
