/* /eslint-disable no-unused-vars */
/*/ eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const uploadFile = require("../services/storage.service");
const movieModel = require("../models/movies.model");
const mongoose = require("mongoose");

async function addMovie(req, res) {
  try {
    const { title, description, category, duration, language, date } =
      req.body;

    // 🔹 validation
    if (!title ||! date||! description||! duration||! category||! language) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    //  duplicate check (title + date)
    const existingMovie = await movieModel.findOne({
      title: title.trim(),
      date: new Date(date),
    });

    if (existingMovie) {
      return res.status(400).json({
        message: "Movie already exists",
      });
    }

    // 🔹 image upload
    let imageUrl = "";

    if (req.file) {
    const result = await uploadFile(req.file.buffer);
    imageUrl = result.url;
    }

    // 🔹 create movie
    const movie = await movieModel.create({
      title: title.trim(),
      description,
      poster: imageUrl,
      category,
      duration,
      language,
      date,
    });

    return res.status(201).json({
      message: "Movie added successfully",
      movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

async function getAllMovies(req, res) {
  try {
    const {category}=req.query;

    let movies;
    // 🔹 create movie
    if(category){
        movies = await movieModel
        .find({ category })
        .sort({ createdAt: -1 });
    }
    else{

    
     movies = await movieModel.find({}).sort({ createdAt: -1 });
    }

    return res.status(200).json({
      message: `Movies fetched successfully`,
      movies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

async function getMoviesById(req, res) {
  try {
    const movieId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        message: "Invalid movie id",
      });
    }

    const movie = await movieModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      message: "Movie detail fetched successfully",
      movie,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error fetching movie details",
    });
  }
}

async function updateMovies(req, res) {
  const movieId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({
      message: "Invalid movie id",
    });
  }
  const movie = await movieModel.findById(movieId);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  const{ title,
      description,
      category,
      duration,
      language,
      date,
    } = req.body;

    if (title) movie.title = title.trim();
    if (description) movie.description = description;
    if (category) movie.category = category;
    if (duration) movie.duration = duration;
    if (language) movie.language = language;
    if (date) movie.date = date;

    // // image update (optional)
    // if (req.file) {
    //   const result = await uploadFile(req.file.buffer);
    //   movie.poster = result.url;
    // }
    await movie.save()

  return res.status(200).json({
    messsage:"Movie updated successfully",
    movie
  })
}



async function deleteMovie(req,res){
try {
    const movieId=req.params.id;
 if (!mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({
      message: "Invalid movie id",
    });
  }
  const movie = await movieModel.findByIdAndDelete(movieId);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  return res.status(200).json({
    message:"Movie deleted succesfully"
  })


    
} catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"Internal Server error"
    })
    
}
}

module.exports = {
  addMovie,
  getAllMovies,
  getMoviesById,
  updateMovies,deleteMovie
};
