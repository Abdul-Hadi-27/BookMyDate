/* eslint-disable no-unused-vars */

import api from "../../api/axiosConfig";
import {
  addBooking,
  setBookings,
  setError,
  setLoading,
} from '../reducers/BookingSlice';

import { toast } from "react-toastify";
import { getShowById } from "./ShowActions";

export const asyncCreateBooking =
  (bookingData) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const { data } = await api.post(
        "/api/auth/shows/booking",
        bookingData,
        {
          withCredentials: true,
        }
      );

      dispatch(addBooking(data?.booking));

            dispatch(getShowById(bookingData.showId));


      toast.success(data.message);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Booking failed"
      );

      dispatch(
        setError(
          error?.response?.data?.message
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };