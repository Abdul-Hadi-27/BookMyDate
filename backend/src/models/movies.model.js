/* eslint-disable no-undef */
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim:true
    },
    description: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required:true,
      enum: ["movie", "sports", "events"],
    },
    duration: {
      type: String,
    },
    language: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const movieModel = mongoose.model("movie", movieSchema);

module.exports = movieModel;
