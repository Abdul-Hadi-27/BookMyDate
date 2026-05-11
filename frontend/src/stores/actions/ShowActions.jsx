/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";
import api from "../../api/axiosConfig";
import { setSelectedShows, setShows } from "../reducers/ShowSlice";

export const asyncCreateShows = (formData) => async (dispatch) => {
  try {
    const { data } = await api.post("/api/auth/shows", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(data.show);
    // dispatch(addShow(data.show)); // backend "show" bhej raha hai

    return { success: true };
  } catch (error) {
    console.log("Show error:", error);
    return { success: false };
  }
};

export const getShowDetails = (id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/auth/shows/${id}`);
    // console.log(data.shows);

    dispatch(setShows(data?.shows));
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Internal Server Error");
  }
};

export const getShowById =
  (id) => async (dispatch) => {
    try {
      const { data } = await api.get(
        `/api/auth/shows/single/${id}`
      );

      // console.log(data?.show);

      dispatch(
        setSelectedShows(data?.show)
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Internal Server Error"
      );
    }
  };
