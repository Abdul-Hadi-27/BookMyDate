/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");



async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    //  attached FULL user
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}


function authAdmin(req, res, next) {
  try {
    const user = req.user;

    //  safety check
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    //  role check
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied: Admins only",
      });
    }

    
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}





module.exports = {
  authUser,authAdmin
};