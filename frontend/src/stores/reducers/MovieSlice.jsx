/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  selectedMovie:null
};

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    clearMovies: (state, action) => {
      state.movies = [];
    },
  
    // 🔹 single movie set
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },

    // 🔹 clear single movie
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
  },
});

export default MovieSlice.reducer;
export const { setMovies, clearMovies,setSelectedMovie,clearSelectedMovie } = MovieSlice.actions;
