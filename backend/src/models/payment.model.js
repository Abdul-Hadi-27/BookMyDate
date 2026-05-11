/* eslint-disable no-undef */
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },

    paymentId: {
      type: String,
    },

    signature: {
      type: String,
    },

    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    price: {
      amount: {
        type: Number,
        required: true,
      },

      currency: {
        type: String,
        default: "INR",
      },
    },

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const paymentModel = mongoose.model(
  "payment",
  paymentSchema
);

module.exports = paymentModel;