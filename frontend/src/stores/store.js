import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./reducers/UserSlice";
import MovieSlice from "./reducers/MovieSlice";
import UiSlice from "./reducers/Ui.slice";
import ShowSlice from "./reducers/Showslice";
import BookingSlice from "./reducers/BookingSlice";

export const store = configureStore({
  reducer: {
    userReducer: UserSlice,
    movieReducer: MovieSlice,
    uiReducer: UiSlice,
    showReducer: ShowSlice,
    bookingReducer: BookingSlice,
  },
});