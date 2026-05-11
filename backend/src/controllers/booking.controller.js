/* eslint-disable no-undef */
/* /eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const showModel = require("../models/show.model");
const bookingModel = require("../models/booking.model");

async function createBooking(req, res) {
  try {
    const userId = req.user._id;
    console.log(userId);

    const { showId, seats } = req.body;

    if (!mongoose.Types.ObjectId.isValid(showId)) {
      return res.status(400).json({
        message: "Invalid show id",
      });
    }

    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        message: "Seats must be a non empty array",
      });
    }

    const uniqueSeats = [...new Set(seats)]; //Set remove duplicate  variables from the array  and return it in a object and then ...new again converts the object into array

    if (uniqueSeats.length !== seats.length) {
      return res.status(400).json({
        message: "Duplicate seats selected",
      });
    }

    const show = await showModel.findById(showId);
    if (!show) {
      return res.status(404).json({
        message: "Show not found",
      });
    }

    //get All bookings for this particular show

    const existingBookings = await bookingModel.find({
      showId,
      status: "booked",
    });

    const bookedSeats = existingBookings.flatMap((b) => b.seats);

    //
    const isSeatTaken = uniqueSeats.some((seat) => bookedSeats.includes(seat));

    if (isSeatTaken) {
      return res.status(409).json({
        message: "Some seats are already booked",
      });
    }
    const totalPrice = uniqueSeats.length * show.price;

    const booking = await bookingModel.create({
      userId,
      showId,
      seats: uniqueSeats,
      totalPrice,
    });

    // update booked seats in show
    await showModel.findByIdAndUpdate(showId, {
      $push: {
        bookedSeats: {
          $each: uniqueSeats,
        },
      },
    });

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}




async function getMyBookings(
  req,
  res
) {
  try {
    const bookings =
      await bookingModel
        .find({
          userId:
            req.params.userId,
        })
        .populate({
          path: "showId",
          populate: {
            path: "movieId",
          },
        })
        .sort({
          createdAt: -1,
        });

    res.json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error fetching bookings",
    });
  }
}

module.exports = { createBooking,getMyBookings };
