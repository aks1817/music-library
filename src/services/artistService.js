import { Artist } from '../models/Artist.js';

export const artistService = {
  async getAllArtists(limit, offset, grammy, hidden) {
    const query = {};
    if (grammy !== undefined) query.grammy = grammy;
    if (hidden !== undefined) query.hidden = hidden;

    const artists = await Artist.find(query)
      .limit(limit)
      .skip(offset);
    return artists;
  },

  async getArtistById(id) {
    const artist = await Artist.findById(id);
    return artist;
  },

  async createArtist(artistData) {
    const artist = new Artist(artistData);
    await artist.save();
    return artist;
  },

  async updateArtist(id, artistData) {
    const artist = await Artist.findByIdAndUpdate(id, artistData, { new: true });
    return artist;
  },

  async deleteArtist(id) {
    const artist = await Artist.findByIdAndDelete(id);
    return artist;
  },
};

