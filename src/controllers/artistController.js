import { artistService } from '../services/artistService.js';
import { responseHandler } from '../utils/responseHandler.js';

export const artistController = {
  async getAllArtists(req, res) {
    try {
      const { limit = 5, offset = 0, grammy, hidden } = req.query;
      const artists = await artistService.getAllArtists(
        parseInt(limit),
        parseInt(offset),
        grammy !== undefined ? parseInt(grammy) : undefined,
        hidden !== undefined ? hidden === 'true' : undefined
      );
      responseHandler(res, 200, artists, 'Artists retrieved successfully.', null);
    } catch (error) {
      responseHandler(res, 400, null, 'Bad Request', error.message);
    }
  },

  async getArtistById(req, res) {
    try {
      const { id } = req.params;
      const artist = await artistService.getArtistById(id);
      if (!artist) {
        return responseHandler(res, 404, null, 'Artist not found.', null);
      }
      responseHandler(res, 200, artist, 'Artist retrieved successfully.', null);
    } catch (error) {
      responseHandler(res, 400, null, 'Bad Request', error.message);
    }
  },

  async createArtist(req, res) {
    try {
      const artist = await artistService.createArtist(req.body);
      responseHandler(res, 201, null, 'Artist created successfully.', null);
    } catch (error) {
      responseHandler(res, 400, null, 'Bad Request', error.message);
    }
  },

  async updateArtist(req, res) {
    try {
      const { id } = req.params;
      const artist = await artistService.updateArtist(id, req.body);
      if (!artist) {
        return responseHandler(res, 404, null, 'Artist not found.', null);
      }
      responseHandler(res, 204, null, null, null);
    } catch (error) {
      responseHandler(res, 400, null, 'Bad Request', error.message);
    }
  },

  async deleteArtist(req, res) {
    try {
      const { id } = req.params;
      const artist = await artistService.deleteArtist(id);
      if (!artist) {
        return responseHandler(res, 404, null, 'Artist not found.', null);
      }
      responseHandler(res, 200, null, `Artist:${artist.name} deleted successfully.`, null);
    } catch (error) {
      responseHandler(res, 400, null, 'Bad Request', error.message);
    }
  },
};

