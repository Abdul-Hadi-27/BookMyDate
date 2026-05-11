/* eslint-disable no-undef */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, //
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // lowercase
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 4,
      select: false, // response me nahi jayega
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
