import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  grammy: {
    type: Number,
    default: 0,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export const Artist = mongoose.model('Artist', artistSchema);

