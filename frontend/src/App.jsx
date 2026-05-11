/* eslint-disable no-unused-vars */

import { useEffect } from "react";

import AuthModal from "./components/AuthModal";

import Navbar from "./components/Navbar";

import MainRoutes from "./routes/MainRoutes";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getcurrentUser,
} from "./stores/actions/UserActions";

const App = () => {

  const dispatch =
    useDispatch();

    const user=useSelector((state)=>state.userReducer.users)
    // console.log(user)

  const isAuthOpen =
    useSelector(
      (state) =>
        state.uiReducer
          .isAuthOpen
    );

  // current user
  useEffect(() => {

    dispatch(
      getcurrentUser()
    );

  }, []);

  // body scroll lock
  useEffect(() => {

    if (isAuthOpen) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";
    }

    return () => {

      document.body.style.overflow =
        "auto";
    };

  }, [isAuthOpen]);

  return (
    <div
      className="
        min-h-screen
        w-screen
        bg-[#0f0f0f]
      "
    >

      <Navbar />

      <MainRoutes />

      {isAuthOpen && (
        <AuthModal />
      )}

    </div>
  );
};

export default App;