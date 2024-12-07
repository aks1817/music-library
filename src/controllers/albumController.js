import { albumService } from "../services/albumService.js";
import { responseHandler } from "../utils/responseHandler.js";

export const albumController = {
  async getAllAlbums(req, res) {
    try {
      const { limit = 5, offset = 0, artist_id, hidden } = req.query;
      const albums = await albumService.getAllAlbums(
        parseInt(limit),
        parseInt(offset),
        artist_id,
        hidden !== undefined ? hidden === "true" : undefined
      );
      responseHandler(res, 200, albums, "Albums retrieved successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async getAlbumById(req, res) {
    try {
      const { id } = req.params;
      const album = await albumService.getAlbumById(id);
      if (!album) {
        return responseHandler(res, 404, null, "Album not found.", null);
      }
      responseHandler(res, 200, album, "Album retrieved successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async createAlbum(req, res) {
    try {
      const album = await albumService.createAlbum(req.body);
      responseHandler(res, 201, album, "Album created successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async updateAlbum(req, res) {
    try {
      const { id } = req.params;
      const album = await albumService.updateAlbum(id, req.body);
      if (!album) {
        return responseHandler(res, 404, null, "Album not found.", null);
      }
      responseHandler(res, 204, null, null, null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async deleteAlbum(req, res) {
    try {
      const { id } = req.params;
      const album = await albumService.deleteAlbum(id);
      if (!album) {
        return responseHandler(res, 404, null, "Album not found.", null);
      }
      responseHandler(
        res,
        200,
        null,
        `Album:${album.name} deleted successfully.`,
        null
      );
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },
};
