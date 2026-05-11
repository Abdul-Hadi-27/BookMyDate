import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { asyncUpdateUser } from "../stores/actions/UserActions";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import {
  Camera,
  CircleUser,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Save,
  User,
} from "lucide-react";

const EditProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.userReducer.users
  );

  const { register, handleSubmit, reset } = useForm();

  const [preview, setPreview] = useState("");

  // PASSWORD STATES
  const [showOld, setShowOld] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
      });

      setPreview(user.image);
    }
  }, [user, reset]);

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();

      formData.append("username", data.username);

      // IMAGE
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      // PASSWORD
      if (data.oldPassword && data.newPassword) {
        formData.append(
          "oldPassword",
          data.oldPassword
        );

        formData.append(
          "newPassword",
          data.newPassword
        );
      }

      const res = await dispatch(
        asyncUpdateUser(formData)
      );

      if (res?.success) {
        toast.success(
          "Profile Updated Successfully 🎉"
        );

        navigate("/profile");
      } else {
        toast.error("Update Failed");
      }
    } catch (error) {
      console.log(error);

      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div
        className="
          w-full
          max-w-4xl
          mx-auto
          py-10
        "
      >
        {/* HEADER */}
        <div className="mb-10">
          <h1
            className="
              text-4xl
              font-black
            "
          >
            Edit Profile
          </h1>

          <p className="text-gray-400 mt-3">
            Update your profile details, profile picture
            and password securely.
          </p>
        </div>

        {/* CARD */}
        <div
          className="
            bg-[#171717]
            border border-gray-800
            rounded-3xl
            overflow-hidden
            shadow-2xl
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* LEFT SIDE */}
            <div
              className="
                bg-gradient-to-b
                from-red-500/20
                to-transparent
                border-r border-gray-800
                p-8
                flex flex-col items-center
                justify-center
                text-center
              "
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={
                    preview ||
                      <CircleUser />
                  }
                  alt="preview"
                  className="
                    w-40 h-40
                    rounded-full
                    object-cover
                    border-4 border-red-500/30
                    shadow-xl
                  "
                />

                {/* CAMERA */}
                <label
                  className="
                    absolute bottom-2 right-2
                    w-12 h-12
                    rounded-full
                    bg-red-500 hover:bg-red-600
                    flex items-center justify-center
                    cursor-pointer
                    transition-all duration-300
                  "
                >
                  <Camera size={20} />

                  <input
                    type="file"
                    className="hidden"
                    {...register("image", {
                      onChange: (e) => {
                        const file =
                          e.target.files[0];

                        if (file) {
                          setPreview(
                            URL.createObjectURL(file)
                          );
                        }
                      },
                    })}
                  />
                </label>
              </div>

              <h2
                className="
                  text-2xl font-bold
                  mt-6 capitalize
                "
              >
                {user?.username}
              </h2>

              <p className="text-gray-400 mt-2 text-sm">
                {user?.email}
              </p>

              <span
                className="
                  mt-5
                  bg-red-500/20
                  border border-red-500/30
                  text-red-400
                  px-4 py-1 rounded-full
                  text-xs font-semibold
                  uppercase
                "
              >
                {user?.role}
              </span>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-2 p-8 md:p-10">
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="space-y-6"
              >
                {/* USERNAME */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Username
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="
                        absolute left-4 top-1/2
                        -translate-y-1/2
                        text-red-400
                      "
                    />

                    <input
                      type="text"
                      {...register("username")}
                      placeholder="Enter username"
                      className="
                        w-full
                        bg-[#222]
                        border border-gray-700
                        rounded-xl
                        py-3 pl-12 pr-4
                        outline-none
                        focus:border-red-500
                      "
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="
                        absolute left-4 top-1/2
                        -translate-y-1/2
                        text-red-400
                      "
                    />

                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="
                        w-full
                        bg-[#1c1c1c]
                        border border-gray-700
                        rounded-xl
                        py-3 pl-12 pr-4
                        text-gray-400
                        cursor-not-allowed
                      "
                    />
                  </div>
                </div>

                {/* PASSWORD SECTION */}
                <div className="pt-4">
                  <h3
                    className="
                      text-xl font-semibold
                      mb-5
                    "
                  >
                    Change Password
                  </h3>

                  <div className="space-y-5">
                    {/* OLD PASSWORD */}
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        Old Password
                      </label>

                      <div className="relative">
                        <Lock
                          size={18}
                          className="
                            absolute left-4 top-1/2
                            -translate-y-1/2
                            text-red-400
                          "
                        />

                        <input
                          type={
                            showOld
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter old password"
                          {...register("oldPassword")}
                          className="
                            w-full
                            bg-[#222]
                            border border-gray-700
                            rounded-xl
                            py-3 pl-12 pr-12
                            outline-none
                            focus:border-red-500
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowOld(!showOld)
                          }
                          className="
                            absolute right-4 top-1/2
                            -translate-y-1/2
                            text-gray-400
                            hover:text-white
                          "
                        >
                          {showOld ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* NEW PASSWORD */}
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">
                        New Password
                      </label>

                      <div className="relative">
                        <Lock
                          size={18}
                          className="
                            absolute left-4 top-1/2
                            -translate-y-1/2
                            text-red-400
                          "
                        />

                        <input
                          type={
                            showNew
                              ? "text"
                              : "password"
                          }
                          placeholder="Enter new password"
                          {...register("newPassword")}
                          className="
                            w-full
                            bg-[#222]
                            border border-gray-700
                            rounded-xl
                            py-3 pl-12 pr-12
                            outline-none
                            focus:border-red-500
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowNew(!showNew)
                          }
                          className="
                            absolute right-4 top-1/2
                            -translate-y-1/2
                            text-gray-400
                            hover:text-white
                          "
                        >
                          {showNew ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="
                    w-full
                    mt-6
                    flex items-center justify-center gap-3
                    bg-red-500 hover:bg-red-600
                    py-4 rounded-2xl
                    font-semibold text-lg
                    transition-all duration-300
                    hover:scale-[1.02]
                    active:scale-95
                  "
                >
                  <Save size={20} />
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;