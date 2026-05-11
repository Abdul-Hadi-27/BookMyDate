/*/eslint-disable no-unused-vars */
/* eslint-disable no-undef */

require("dotenv").config();

const Razorpay = require("razorpay");

const crypto = require("crypto");

const paymentModel = require("../models/payment.model");

const bookingModel = require("../models/booking.model");

const showModel = require("../models/show.model");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// CREATE ORDER
async function createOrder(req, res) {
  try {
    const {
      showId,
      seats,
      userId,
    } = req.body;

    // show find
    const show = await showModel.findById(
      showId
    );

    if (!show) {
      return res
        .status(404)
        .json({
          message: "Show not found",
        });
    }

    // already booked check
    const alreadyBooked = seats.some(
      (seat) =>
        show.bookedSeats.includes(seat)
    );

    if (alreadyBooked) {
      return res
        .status(400)
        .json({
          message:
            "Some seats already booked",
        });
    }

    // total price
    const totalPrice =
      seats.length * show.price;

    // booking create
    const booking =
      await bookingModel.create({
        userId,
        showId,
        seats,
        totalPrice,
      });

    // razorpay order
    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt:
        "receipt_" + booking._id,
    };

    const order =
      await razorpay.orders.create(
        options
      );

    // payment save
    await paymentModel.create({
      orderId: order.id,

      bookingId: booking._id,

      userId,

      price: {
        amount: totalPrice,
        currency: "INR",
      },

      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      order,
      bookingId: booking._id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error creating order",
    });
  }
}


// VERIFY PAYMENT
async function verifyPayment(
  req,
  res
) {
  try {
    const {
      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,
    } = req.body;

    // create signature
    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(body.toString())
        .digest("hex");

    // invalid signature
    if (
      expectedSignature !==
      razorpay_signature
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid payment",
        });
    }

    // payment find
    const payment =
      await paymentModel.findOne({
        orderId: razorpay_order_id,
      });

    if (!payment) {
      return res
        .status(404)
        .json({
          message:
            "Payment not found",
        });
    }

    // update payment
    payment.paymentId =
      razorpay_payment_id;

    payment.signature =
      razorpay_signature;

    payment.status = "COMPLETED";

    await payment.save();

    // booking find
    const booking =
      await bookingModel.findById(
        payment.bookingId
      );

    // show find
    const show =
      await showModel.findById(
        booking.showId
      );

    // seats update
    show.bookedSeats.push(
      ...booking.seats
    );

    await show.save();

    res.json({
      success: true,
      message:
        "Payment verified",
        booking
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Verification failed",
    });
  }
}



async function getPayments(
  req,
  res
) {
  try {
    const payments =
      await paymentModel
        .find({
          userId:
            req.params.userId,
        })
        .populate({
          path: "bookingId",
          populate: {
            path: "showId",
            populate: {
              path: "movieId",
            },
          },
        })
        .sort({
          createdAt: -1,
        });

    res.json(payments);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error fetching payments",
    });
  }
}

module.exports = {
  createOrder,
  verifyPayment,
  getPayments
};