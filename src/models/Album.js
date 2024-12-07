import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
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
    year: {
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

export const Album = mongoose.model("Album", albumSchema);
