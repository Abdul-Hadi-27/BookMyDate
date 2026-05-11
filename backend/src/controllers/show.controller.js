/* eslint-disable no-undef */
const mongoose = require("mongoose");
const movieModel = require("../models/movies.model");
const showModel = require("../models/show.model");
const uploadFile = require("../services/storage.service");


function generateSeats(totalSeats) {
  const seats = [];

  let seatCount = 0;

  let rowNumber = 0;

  while (seatCount < totalSeats) {

    // row name generate
    let rowName = "";

    let n = rowNumber;

    do {
      rowName =
        String.fromCharCode(
          65 + (n % 26)
        ) + rowName;

      n =
        Math.floor(n / 26) - 1;

    } while (n >= 0);

    // seats per row
    for (let i = 1; i <= 10; i++) {

      if (seatCount >= totalSeats)
        break;

      seats.push(
        `${rowName}${i}`
      );

      seatCount++;
    }

    rowNumber++;
  }

  return seats;
}



async function createShows(req, res) {
  try {
    const { movieId, date, time, venue, price, totalSeats,cinema } = req.body;

    //  validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie id",
      });
    }

    //  validate fields
    if (!movieId || !date || !time || !venue || !price ||!cinema) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    //  check movie exists
    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    //  duplicate show check
    const existingShow = await showModel.findOne({
      movieId,
      date,
      time,
      venue,
      cinema
    });

    if (existingShow) {
      return res.status(409).json({
        message: "Show already exists for this time and venue at this cinema",
      });
    }
let imageUrl='';
    if(req.file){
const result =await uploadFile(req.file.buffer)
imageUrl=result.url
    }
    //  create show
    const show = await showModel.create({
      movieId,
      date,
      time,
      cinema,
      venue,
      price,
      totalSeats,
      theatrePoster:imageUrl,

        seats: generateSeats(totalSeats)
    });

    return res.status(201).json({
      message: "Show created successfully",
      show,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getShows(req, res) {
  try {
    const movieId = req.params.id;

    //  validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie id",
      });
    }

    //  check movie exists
    const movie = await movieModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    //  fetch shows by movieId + sort
    const shows = await showModel.find({ movieId }).sort({ date: 1, time: 1 });

    //  empty case (no error, just empty array)
    if (shows.length === 0) {
      return res.status(200).json({
        message: "No shows available",
        shows: [],
      });
    }

    return res.status(200).json({
      message: "Shows fetched successfully",
      shows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getSingleShow(req, res) {
  try {
    const show = await showModel.findById(
      req.params.id
    );

    if (!show) {
      return res.status(404).json({
        message: "Show not found",
      });
    }

    return res.status(200).json({
      show,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}


module.exports = {
  createShows,
  getShows,getSingleShow
};
