import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Artist",
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Album",
    },
    duration: {
      type: Number,
      required: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Track = mongoose.model("Track", trackSchema);
