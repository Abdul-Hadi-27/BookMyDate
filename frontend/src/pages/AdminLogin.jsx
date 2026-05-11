/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginAdmin } from "../stores/actions/UserActions";
import { toast } from "react-toastify";
import { ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const submitHandler = async (user) => {
    try {
      const res = await dispatch(asyncLoginAdmin(user));

      if (res?.success) {
        // toast.success("Logged in as Admin");
        navigate("/");
      }
    } catch (error) {
      toast.error("Unable to log in");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-10">
      
      {/* Card */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-6 sm:p-8">
        
        {/* Heading */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-red-500 p-3 rounded-full mb-4">
            <ShieldCheck size={35} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Admin Login
          </h1>

          <p className="text-zinc-400 text-sm mt-2 text-center">
            Login to access the admin dashboard
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-5"
        >
          
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300">
              Email Address
            </label>

            <input
              {...register("email", {
                required: true,
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-red-500 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-300">
              Password
            </label>

            <input
              {...register("password", {
                required: true,
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-3 outline-none focus:border-red-500 transition"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-red-500 hover:bg-red-600 active:scale-95 transition text-white font-semibold py-3 rounded-lg cursor-pointer mt-2">
            Login
          </button>

          {/* Register */}
          <div className="text-center mt-2">
            <small className="text-zinc-400">
              Don&apos;t have an account?
            </small>

            <Link
              to="/admin/register"
              className="text-red-400 ml-2 hover:text-red-300 transition"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;