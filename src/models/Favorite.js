import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: {
      type: String,
      enum: ["Artist", "Album", "Track"],
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "category",
    },
  },
  {
    timestamps: true,
  }
);

favoriteSchema.index({ user: 1, category: 1, item: 1 }, { unique: true });

export const Favorite = mongoose.model("Favorite", favoriteSchema);
