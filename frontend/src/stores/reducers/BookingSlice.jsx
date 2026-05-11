/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const BookingSlice = createSlice({
  name: "booking",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setBookings: (state, action) => {
      state.bookings = action.payload;
    },

    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setBookings,
  addBooking,
  setError,
} = BookingSlice.actions;

export default BookingSlice.reducer;