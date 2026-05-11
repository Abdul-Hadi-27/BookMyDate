import { configureStore } from "@reduxjs/toolkit";
import UserSlice from '../stores/reducers/UserSlice'
import MovieSlice from '../stores/reducers/MovieSlice'
import UiSlice from '../stores/reducers/Ui.slice'
import ShowSlice from '../stores/reducers/Showslice'
import BookingSlice from './reducers/BookingSlice'

 export const store=configureStore({
    reducer:{

        userReducer:UserSlice,
        movieReducer:MovieSlice,
        uiReducer:UiSlice,
        showReducer:ShowSlice,
        bookingReducer:BookingSlice

    }
})