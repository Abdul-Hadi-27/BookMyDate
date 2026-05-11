/* /eslint-disable no-unused-vars */

import api from "../../api/axiosConfig";  
import { setMovies, setSelectedMovie } from "../reducers/MovieSlice";

export const asyncgetMovies = (category) => async (dispatch) => {
  try {
    let url = "/movies";

    // agar category aayi hai → query add kar
    if (category) {
      url = `/movies?category=${category}`;
    }

    const { data } = await api.get(url);

    dispatch(setMovies(data?.movies));
  } catch (error) {
    console.log(error);
  }
};

export const getMoviesbyId = (id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/movies/${id}`);
 dispatch(setSelectedMovie(data?.movie));

  } catch (error) {
    console.log(error);
  }
};

export const asynccreateMovies = (formData) => async (dispatch) => {
  try {
     await api.post("/add-movie", formData,{
    
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // dispatch(setMovies(data?.movie));
    dispatch(asyncgetMovies());

    return { success: true }; // 🔥 IMPORTANT
  } catch (error) {
    console.log("Create movie error:", error);
    return { success: false };
  }
};

