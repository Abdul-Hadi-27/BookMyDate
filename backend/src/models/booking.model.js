/* eslint-disable no-undef */
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "show",
      required: true,
    },
    seats: [
      {
        type: String,
        required: true,
      },
    ],
  
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked",
    },
  },
  {
    timestamps: true,
  },
);

const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;
