// export default AuthModal;
/* /eslint-disable no-unused-vars */

import { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  closeAuth,
  switchToLogin,
  switchToRegister,
} from "../stores/reducers/Ui.slice";

import { useForm } from "react-hook-form";

import {
  asyncloginUser,
  asyncSendOtp,
  asyncVerifyOtp,
} from "../stores/actions/UserActions";

import { toast } from "react-toastify";

import {
  X,
  UserCircle2,
} from "lucide-react";

const AuthModal = () => {

  const dispatch =
    useDispatch();

  const [otpSent, setOtpSent] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const {
    isAuthOpen,
    authMode,
  } = useSelector(
    (state) =>
      state.uiReducer
  );

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  if (!isAuthOpen)
    return null;

  const onSubmit =
    async (data) => {

      try {

        setLoading(true);

        // LOGIN
        if (
          authMode ===
          "login"
        ) {

          const res =
            await dispatch(
              asyncloginUser(
                data
              )
            );

          if (
            res?.success
          ) {

            toast.success(
              "Login successful"
            );

            reset();

            dispatch(
              closeAuth()
            );
          }

          return;
        }

        // REGISTER FLOW

        // STEP 1 SEND OTP
        if (!otpSent) {

          const res =
            await dispatch(
              asyncSendOtp(
                data.email
              )
            );

          if (
            res?.success
          ) {

            toast.success(
              "OTP sent to email"
            );

            setOtpSent(
              true
            );
          }

          return;
        }

        // STEP 2 VERIFY OTP
        const formData =
          new FormData();

        formData.append(
          "username",
          data.username
        );

        formData.append(
          "email",
          data.email
        );

        formData.append(
          "password",
          data.password
        );

        formData.append(
          "otp",
          data.otp
        );

        formData.append(
          "role",
          "user"
        );

        const res =
          await dispatch(
            asyncVerifyOtp(
              formData
            )
          );

        if (
          res?.success
        ) {

          toast.success(
            "Registered successfully"
          );

          reset();

          setOtpSent(
            false
          );

          dispatch(
            closeAuth()
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-999
        px-4
      "
      onClick={() =>
        dispatch(
          closeAuth()
        )
      }
    >

      {/* Modal */}
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          w-full
          max-w-md
          bg-zinc-900
          border
          border-zinc-700
          rounded-2xl
          shadow-2xl
          p-6
          sm:p-8
          relative
          animate-in
          fade-in
          zoom-in
          duration-300
        "
      >

        {/* Close */}
        <button
          onClick={() =>
            dispatch(
              closeAuth()
            )
          }
          className="
            absolute
            top-4
            right-4
            text-zinc-400
            hover:text-white
            transition
            cursor-pointer
          "
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div
          className="
            flex
            flex-col
            items-center
            mb-8
          "
        >

          <div
            className="
              bg-red-500
              p-3
              rounded-full
              mb-4
            "
          >
            <UserCircle2
              size={35}
              className="text-white"
            />
          </div>

          <h2
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            {authMode ===
            "login"
              ? "Welcome Back"
              : "Create Account"}
          </h2>

          <p
            className="
              text-zinc-400
              text-sm
              mt-2
              text-center
            "
          >
            {authMode ===
            "login"
              ? "Login to continue your movie journey"
              : "Register to book your favorite movies"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="
            flex
            flex-col
            gap-5
          "
        >

          {/* Username */}
          {authMode ===
            "register" && (
            <div
              className="
                flex
                flex-col
                gap-2
              "
            >
              <label
                className="
                  text-sm
                  text-zinc-300
                "
              >
                Username
              </label>

              <input
                {...register(
                  "username"
                )}
                type="text"
                placeholder="Enter username"
                className="
                  w-full
                  bg-zinc-800
                  border
                  border-zinc-700
                  text-white
                  rounded-lg
                  px-4
                  py-3
                  outline-none
                  focus:border-red-500
                  transition
                "
              />
            </div>
          )}

          {/* Email */}
          <div
            className="
              flex
              flex-col
              gap-2
            "
          >
            <label
              className="
                text-sm
                text-zinc-300
              "
            >
              Email Address
            </label>

            <input
              {...register(
                "email"
              )}
              type="email"
              placeholder="Enter email"
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                text-white
                rounded-lg
                px-4
                py-3
                outline-none
                focus:border-red-500
                transition
              "
            />
          </div>

          {/* Password */}
          <div
            className="
              flex
              flex-col
              gap-2
            "
          >
            <label
              className="
                text-sm
                text-zinc-300
              "
            >
              Password
            </label>

            <input
              {...register(
                "password"
              )}
              type="password"
              placeholder="Enter password"
              className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                text-white
                rounded-lg
                px-4
                py-3
                outline-none
                focus:border-red-500
                transition
              "
            />
          </div>

          {/* OTP */}
          {otpSent &&
            authMode ===
              "register" && (
              <div
                className="
                  flex
                  flex-col
                  gap-2
                "
              >
                <label
                  className="
                    text-sm
                    text-zinc-300
                  "
                >
                  OTP
                </label>

                <input
                  {...register(
                    "otp"
                  )}
                  type="text"
                  placeholder="Enter OTP"
                  className="
                    w-full
                    bg-zinc-800
                    border
                    border-zinc-700
                    text-white
                    rounded-lg
                    px-4
                    py-3
                    outline-none
                    focus:border-red-500
                    transition
                  "
                />
              </div>
            )}

          {/* Submit */}
          <button
            disabled={
              loading
            }
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              active:scale-95
              transition
              text-white
              font-semibold
              py-3
              rounded-lg
              cursor-pointer
              mt-2
            "
          >
            {loading
              ? "Please wait..."
              : authMode ===
                "login"
              ? "Login"
              : otpSent
              ? "Verify OTP & Register"
              : "Send OTP"}
          </button>
        </form>

        {/* Switch */}
        <p
          className="
            text-sm
            text-center
            mt-6
            text-zinc-400
          "
        >
          {authMode ===
          "login" ? (
            <>
              Don&apos;t
              have an
              account?{" "}
              <span
                className="
                  text-red-400
                  hover:text-red-300
                  cursor-pointer
                  transition
                "
                onClick={() => {

                  dispatch(
                    switchToRegister()
                  );

                  reset();

                  setOtpSent(
                    false
                  );
                }}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have
              an account?{" "}
              <span
                className="
                  text-red-400
                  hover:text-red-300
                  cursor-pointer
                  transition
                "
                onClick={() => {

                  dispatch(
                    switchToLogin()
                  );

                  reset();

                  setOtpSent(
                    false
                  );
                }}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;