/* eslint-disable no-undef */

const express = require("express");

const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getPayments
} = require(
  "../controllers/payment.controller"
);

router.post(
  "/create-order",
  createOrder
);

router.post(
  "/verify-payment",
  verifyPayment
);
router.get(
  "/payments/:userId",
  getPayments
);

module.exports = router;