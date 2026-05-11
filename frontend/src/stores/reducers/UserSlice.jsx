/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

const UserSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
    },
    clearUser: (state, action) => {
      state.users = null;
    },
  },
});


export default UserSlice.reducer;
export const {setUser,clearUser}=UserSlice.actions
