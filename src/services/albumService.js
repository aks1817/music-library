import { Album } from "../models/Album.js";
import { Artist } from "../models/Artist.js";

export const albumService = {
  async getAllAlbums(limit, offset, artistId, hidden) {
    const query = {};
    if (artistId) query.artist = artistId;
    if (hidden !== undefined) query.hidden = hidden;

    const albums = await Album.find(query)
      .limit(limit)
      .skip(offset)
      .populate("artist", "name");
    return albums;
  },

  async getAlbumById(id) {
    const album = await Album.findById(id).populate("artist", "name");
    return album;
  },

  async createAlbum(albumData) {
    const { artist_id, ...otherData } = albumData;

    // Check if the artist exists
    const artistExists = await Artist.findById(artist_id);
    if (!artistExists) {
      throw new Error("Artist not found");
    }

    const album = new Album({
      ...otherData,
      artist: artist_id,
    });
    await album.save();
    return album;
  },

  async updateAlbum(id, albumData) {
    const { artist_id, ...otherData } = albumData;

    const updateData = { ...otherData };
    if (artist_id) {
      // Check if the artist exists
      const artistExists = await Artist.findById(artist_id);
      if (!artistExists) {
        throw new Error("Artist not found");
      }
      updateData.artist = artist_id;
    }

    const album = await Album.findByIdAndUpdate(id, updateData, { new: true });
    return album;
  },

  async deleteAlbum(id) {
    const album = await Album.findByIdAndDelete(id);
    return album;
  },
};
