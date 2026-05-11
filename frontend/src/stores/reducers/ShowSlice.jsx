import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shows: [],
  selectedShow: null  // ✅ fixed name
};

const ShowSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
  setShows: (state, action) => {
  state.shows = action.payload;
},

  // addShow: (state, action) => {
  //   state.shows.push(action.payload);
  // },
    clearShows: (state) => {
      state.shows = [];
    },
    setSelectedShows: (state, action) => {
      state.selectedShow = action.payload;  // ✅ now matches initialState
    },
    clearSelectedShows: (state) => {
      state.selectedShow = null;
    },
  },
});

export default ShowSlice.reducer;
export const { setShows, clearShows, setSelectedShows, clearSelectedShows } = ShowSlice.actions;