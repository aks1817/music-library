import { trackService } from "../services/trackService.js";
import { responseHandler } from "../utils/responseHandler.js";

export const trackController = {
  async getAllTracks(req, res) {
    try {
      const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;
      const tracks = await trackService.getAllTracks(
        parseInt(limit),
        parseInt(offset),
        artist_id,
        album_id,
        hidden !== undefined ? hidden === "true" : undefined
      );
      responseHandler(res, 200, tracks, "Tracks retrieved successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async getTrackById(req, res) {
    try {
      const { id } = req.params;
      const track = await trackService.getTrackById(id);
      if (!track) {
        return responseHandler(res, 404, null, "Track not found.", null);
      }
      responseHandler(res, 200, track, "Track retrieved successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async createTrack(req, res) {
    try {
      const track = await trackService.createTrack(req.body);
      responseHandler(res, 201, track, "Track created successfully.", null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async updateTrack(req, res) {
    try {
      const { id } = req.params;
      const track = await trackService.updateTrack(id, req.body);
      if (!track) {
        return responseHandler(res, 404, null, "Track not found.", null);
      }
      responseHandler(res, 204, null, null, null);
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },

  async deleteTrack(req, res) {
    try {
      const { id } = req.params;
      const track = await trackService.deleteTrack(id);
      if (!track) {
        return responseHandler(res, 404, null, "Track not found.", null);
      }
      responseHandler(
        res,
        200,
        null,
        `Track:${track.name} deleted successfully.`,
        null
      );
    } catch (error) {
      responseHandler(res, 400, null, "Bad Request", error.message);
    }
  },
};
