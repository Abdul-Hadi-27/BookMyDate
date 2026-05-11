/*/ eslint-disable no-unused-vars */
/*/ eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// router.post("/register", upload.single("image"), authController.register);
// router.post(
//   "/admin/register",
//   upload.single("image"),
//   authController.registerAdmin,
// );


router.post(
  "/send-otp",
  authController.sendOtp
);

router.post(
  "/verify-otp",
  upload.single("image"),
  authController.verifyOtp
);


// router.post(
//   "/send-otp",
//   authController.sendOtp
// );

// router.post(
//   "/verify-otp",
//   authController.verifyOtp
// );
router.post("/login", authController.login);
router.patch(
  "/update",
  authMiddleware.authUser,
  upload.single("image"),
  authController.updateUser,
);

router.post("/admin/login", authController.adminLogin);

router.get("/me", authMiddleware.authUser, authController.getMe);

router.post("/logout", authController.logout);

module.exports = router;
