


import { toast } from "react-toastify";

import api from "../../api/axiosConfig";

import {
  clearUser,
  setUser,
} from "../reducers/UserSlice";

/* ======================================================
   GET CURRENT USER
====================================================== */

export const getcurrentUser =
  () => async (dispatch) => {
    try {
      const { data } =
        await api.get("/api/auth/me");

      dispatch(
        setUser(data?.user)
      );

    } catch (error) {
      console.log(error);
    }
  };

/* ======================================================
   SEND OTP
====================================================== */

export const asyncSendOtp =
  (email) => async () => {
    try {

      const { data } =
        await api.post(
          "/api/auth/send-otp",
          { email }
        );

      toast.success(
        data?.message
      );

      return {
        success: true,
      };

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
        "Failed to send OTP"
      );

      return {
        success: false,
      };
    }
  };

/* ======================================================
   VERIFY OTP + REGISTER USER / ADMIN
====================================================== */

export const asyncVerifyOtp =
  (formData) =>
  async (dispatch) => {

    try {

      const { data } =
        await api.post(
          "/api/auth/verify-otp",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      dispatch(
        setUser(data?.user)
      );

      // toast.success(
      //   "Registration successful"
      // );

      return {
        success: true,
      };

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
        "OTP verification failed"
      );

      return {
        success: false,
      };
    }
};

/* ======================================================
   LOGIN USER
====================================================== */

export const asyncloginUser =
  (formData) =>
  async (dispatch) => {

    try {

      const { data } =
        await api.post(
          "/api/auth/login",
          formData
        );

      dispatch(
        setUser(data?.user)
      );

      // toast.success(
      //   "Login successful"
      // );

      return {
        success: true,
      };

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
        "Invalid credentials"
      );

      return {
        success: false,
      };
    }
};

/* ======================================================
   LOGIN ADMIN
====================================================== */

export const asyncLoginAdmin =
  (formData) =>
  async (dispatch) => {

    try {

      const { data } =
        await api.post(
          "/api/auth/admin/login",
          formData
        );

      dispatch(
        setUser(data?.user)
      );

      toast.success(
        "Admin login successful"
      );

      return {
        success: true,
      };

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
        "Invalid credentials"
      );

      return {
        success: false,
      };
    }
};

/* ======================================================
   LOGOUT
====================================================== */

export const asynclogoutUser =
  () => async (dispatch) => {

    try {

      await api.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(
        clearUser()
      );

      // toast.success(
      //   "Logged out successfully"
      // );

    } catch (error) {

      console.log(error);

      toast.error(
        "Logout failed"
      );
    }
};

/* ======================================================
   UPDATE USER
====================================================== */

export const asyncUpdateUser =
  (formData) =>
  async (dispatch) => {

    try {

      await api.patch(
        "/api/auth/update",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      dispatch(
        getcurrentUser()
      );

      // toast.success(
      //   "Profile updated"
      // );

      return {
        success: true,
      };

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
        "Update failed"
      );

      return {
        success: false,
      };
    }
};

/* ======================================================
   ADD TO WISHLIST
====================================================== */

export const addToWishlist =
  (movieId) =>
  async (
    dispatch,
    getState
  ) => {

    try {

      const { user } =
        getState()
          .userReducer;

      // already exists
      if (
        user.wishlist?.includes(
          movieId
        )
      ) {
        return "exists";
      }

      dispatch({
        type:
          "ADD_TO_WISHLIST",

        payload: movieId,
      });

      return "added";

    } catch (error) {

      console.log(error);
    }
};