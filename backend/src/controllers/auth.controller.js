/* /eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploadFile = require("../services/storage.service");
const transporter = require("../services/email.service");

// temporary otp store
const otpStore = {};

// 🔐 Generate Token
function generateToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );
}

/* ======================================================
   SEND OTP
====================================================== */

async function sendOtp(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // check existing user
    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // expiry
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    // store otp temporarily
    otpStore[email] = {
      otp,
      otpExpiry,
    };

    // send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,

      to: email,

      subject: "Your OTP Code",

      html: `
        <div style="font-family:sans-serif;padding:20px">
          
          <h1>Your OTP</h1>

          <h2>${otp}</h2>

          <p>
            OTP valid for 5 minutes
          </p>

        </div>
      `,
    });

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

/* ======================================================
   VERIFY OTP + REGISTER USER
====================================================== */

async function verifyOtp(req, res) {
  try {
    const { username, email, password, role, otp } = req.body;

    // validation
    if (!username || !email || !password || !otp) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    // stored otp
    const storedData = otpStore[email];

    // otp not found
    if (!storedData) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    // invalid otp
    if (storedData.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // expired otp
    if (storedData.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // check existing user again
    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // image upload
    let imageUrl = "";

    if (req.file) {
      const result = await uploadFile(req.file.buffer);

      imageUrl = result.url;
    }

    // create user
    const user = await userModel.create({
      username,
      email,
      role: role || "user",

      password: hashedPassword,

      image: imageUrl,

      isVerified: true,
    });

    // remove otp
    delete otpStore[email];

    // token
    const token = generateToken(user);

    // cookie
    res.cookie("token", token);

    return res.status(201).json({
      message: "Registration successful",

      user: {
        id: user._id,

        username: user.username,

        email: user.email,

        role: user.role,

        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

/* ======================================================
   LOGIN
====================================================== */

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // find user
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // password check
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // token
    const token = generateToken(user);

    // cookie
    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",

      user: {
        id: user._id,

        username: user.username,

        email: user.email,

        role: user.role,

        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
// admin login
async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({
        email,
        role: "admin",
      })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Admin not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    res.cookie("token", token);

    return res.status(200).json({
      message: "Admin login successful",

      user: {
        id: user._id,

        username: user.username,

        email: user.email,

        role: user.role,

        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

/* ======================================================
   GET ME
====================================================== */

async function getMe(req, res) {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: {
        id: user._id,

        username: user.username,

        email: user.email,

        role: user.role,

        image: user.image,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
// update user
async function updateUser(req, res) {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { username, email } = req.body;

    // update fields
    if (username) user.username = username;

    if (email) user.email = email;

    // image upload
    if (req.file) {
      const result = await uploadFile(req.file.buffer);

      user.image = result.url;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated",

      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

/* ======================================================
   LOGOUT
====================================================== */

async function logout(req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logged out successfully",
  });
}

module.exports = {
  sendOtp,
  verifyOtp,

  login,
  adminLogin,

  logout,

  getMe,

  updateUser,
};
