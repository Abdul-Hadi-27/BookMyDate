import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthOpen: false,
  authMode: "login",
};

const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAuth: (state) => {
      state.isAuthOpen = true;
    },
    closeAuth: (state) => {
      state.isAuthOpen = false;
    },
    switchToLogin: (state) => {
      state.authMode = "login";
    },
    switchToRegister: (state) => {
      state.authMode = "register";
    },
  },
});

export default UiSlice.reducer;
export const { openAuth, closeAuth,switchToLogin,switchToRegister } = UiSlice.actions;
