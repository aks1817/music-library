import { Track } from "../models/Track.js";
import { Artist } from "../models/Artist.js";
import { Album } from "../models/Album.js";

export const trackService = {
  async getAllTracks(limit, offset, artistId, albumId, hidden) {
    const query = {};
    if (artistId) query.artist = artistId;
    if (albumId) query.album = albumId;
    if (hidden !== undefined) query.hidden = hidden;

    const tracks = await Track.find(query)
      .limit(limit)
      .skip(offset)
      .populate("artist", "name")
      .populate("album", "name");
    return tracks;
  },

  async getTrackById(id) {
    const track = await Track.findById(id)
      .populate("artist", "name")
      .populate("album", "name");
    return track;
  },

  async createTrack(trackData) {
    const { artist_id, album_id, ...otherData } = trackData;

    // Check if the artist exists
    const artistExists = await Artist.findById(artist_id);
    if (!artistExists) {
      throw new Error("Artist not found");
    }

    // Check if the album exists
    const albumExists = await Album.findById(album_id);
    if (!albumExists) {
      throw new Error("Album not found");
    }

    const track = new Track({
      ...otherData,
      artist: artist_id,
      album: album_id,
    });
    await track.save();
    return track;
  },

  async updateTrack(id, trackData) {
    const { artist_id, album_id, ...otherData } = trackData;

    const updateData = { ...otherData };
    if (artist_id) {
      // Check if the artist exists
      const artistExists = await Artist.findById(artist_id);
      if (!artistExists) {
        throw new Error("Artist not found");
      }
      updateData.artist = artist_id;
    }
    if (album_id) {
      // Check if the album exists
      const albumExists = await Album.findById(album_id);
      if (!albumExists) {
        throw new Error("Album not found");
      }
      updateData.album = album_id;
    }

    const track = await Track.findByIdAndUpdate(id, updateData, { new: true });
    return track;
  },

  async deleteTrack(id) {
    const track = await Track.findByIdAndDelete(id);
    return track;
  },
};
