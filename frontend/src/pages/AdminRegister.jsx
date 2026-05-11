

// export default AdminRegister;
/*/ eslint-disable no-unused-vars */

import { useState } from "react";

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  asyncSendOtp,
  asyncVerifyOtp,
} from "../stores/actions/UserActions";

import { toast } from "react-toastify";

import {
  ShieldPlus,
} from "lucide-react";

const AdminRegister = () => {

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const [otpSent, setOtpSent] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const submitHandler =
    async (data) => {

      try {

        setLoading(true);

        // STEP 1 SEND OTP
        if (!otpSent) {

          const res =
            await dispatch(
              asyncSendOtp(
                data.email
              )
            );

          if (res?.success) {

            toast.success(
              "OTP sent to email"
            );

            setOtpSent(true);
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
          "admin"
        );

        const res =
          await dispatch(
            asyncVerifyOtp(
              formData
            )
          );

        if (res?.success) {

          // toast.success(
          //   "Admin Registered"
          // );

          reset();

          navigate("/");
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
        min-h-screen
        w-full
        bg-black
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >

      {/* Card */}
      <div
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
        "
      >

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
            <ShieldPlus
              size={35}
              className="text-white"
            />
          </div>

          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Admin Register
          </h1>

          <p
            className="
              text-zinc-400
              text-sm
              mt-2
              text-center
            "
          >
            Create your admin
            account to continue
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(
            submitHandler
          )}
          className="
            flex
            flex-col
            gap-5
          "
        >

          {/* Username */}
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
                "username",
                {
                  required: true,
                }
              )}
              type="text"
              placeholder="Enter username"
              className="
                w-full
                bg-zinc-800
                text-white
                border
                border-zinc-700
                rounded-lg
                px-4
                py-3
                outline-none
                focus:border-red-500
                transition
              "
            />
          </div>

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
                "email",
                {
                  required: true,
                }
              )}
              type="email"
              placeholder="Enter email"
              className="
                w-full
                bg-zinc-800
                text-white
                border
                border-zinc-700
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
                "password",
                {
                  required: true,
                }
              )}
              type="password"
              placeholder="Enter password"
              className="
                w-full
                bg-zinc-800
                text-white
                border
                border-zinc-700
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
          {otpSent && (
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
                  "otp",
                  {
                    required: true,
                  }
                )}
                type="text"
                placeholder="Enter OTP"
                className="
                  w-full
                  bg-zinc-800
                  text-white
                  border
                  border-zinc-700
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

          {/* Button */}
          <button
            disabled={loading}
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
              : otpSent
              ? "Verify OTP & Register"
              : "Send OTP"}
          </button>

          {/* Login Link */}
          <div
            className="
              text-center
              mt-2
            "
          >
            <small
              className="
                text-zinc-400
              "
            >
              Already have an
              account?
            </small>

            <Link
              to="/admin/login"
              className="
                text-red-400
                ml-2
                hover:text-red-300
                transition
              "
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;