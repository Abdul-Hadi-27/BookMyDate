/*/ eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    cinema: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
    },
    theatrePoster: {
      type: String,
      required: true,
    },
    seats: {
      type: [String],
      default: [],
    },
    bookedSeats: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const showModel = mongoose.model("show", showSchema);

module.exports = showModel;
