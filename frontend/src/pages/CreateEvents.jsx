/*/ eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asynccreateMovies } from "../stores/actions/MovieActions";
import { toast } from "react-toastify";

import {
  CalendarDays,
  Clock3,
  ImagePlus,
  Languages,
  Landmark,
  FileText,
  Tag,
  Sparkles,
} from "lucide-react";

const CreateEvents = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const event = useSelector(
    (state) => state.movieReducer.movies
  );

  console.log(event);

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("duration", data.duration);
      formData.append("language", data.language);
      formData.append("date", data.date);

      // POSTER
      formData.append("poster", data.poster[0]);

      const res = await dispatch(
        asynccreateMovies(formData)
      );

      if (res?.success) {
        toast.success("Event Added Successfully 🎉");

        reset();

        navigate("/");
      } else {
        toast.error("Unable to Add Event");
      }
    } catch (error) {
      console.log(error);

      toast.error("Internal Server Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* HERO */}
      <div
        className="
          relative overflow-hidden
          border-b border-gray-800
        "
      >
        {/* GLOW */}
        <div
          className="
            absolute top-0 left-1/2
            -translate-x-1/2
            w-[500px] h-[500px]
            bg-pink-500/20
            blur-[140px]
          "
        />

        <div
          className="
            relative z-10
            w-[92%] lg:w-[80%]
            mx-auto
            py-16
            flex flex-col items-center text-center
          "
        >
          <div
            className="
              flex items-center gap-2
              bg-pink-500/10
              border border-pink-500/20
              text-pink-400
              px-4 py-2 rounded-full
              text-sm font-semibold
            "
          >
            <Sparkles size={16} />
            Create Premium Event
          </div>

          <h1
            className="
              text-4xl sm:text-5xl lg:text-6xl
              font-black
              mt-6
            "
          >
            Add New Event 🎉
          </h1>

          <p
            className="
              text-gray-400
              mt-5
              max-w-2xl
              text-sm sm:text-base
            "
          >
            Create exciting events with complete details,
            timings, posters and audience-ready presentation.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          w-[92%] lg:w-[75%]
          mx-auto
          py-14
        "
      >
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="
            bg-[#171717]
            border border-gray-800
            rounded-3xl
            shadow-2xl
            overflow-hidden
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div
              className="
                relative
                min-h-[400px]
                lg:min-h-full
              "
            >
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop"
                alt="event"
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black via-black/40 to-transparent
                "
              />

              {/* CONTENT */}
              <div
                className="
                  absolute bottom-0
                  p-8
                "
              >
                <span
                  className="
                    bg-pink-500/20
                    border border-pink-500/30
                    text-pink-400
                    px-4 py-1 rounded-full
                    text-sm font-semibold
                  "
                >
                  LIVE EXPERIENCES
                </span>

                <h2
                  className="
                    text-4xl font-black
                    mt-5
                    leading-tight
                  "
                >
                  Host Amazing
                  <br />
                  Events
                </h2>

                <p
                  className="
                    text-gray-300
                    mt-4
                    text-sm
                    leading-relaxed
                    max-w-md
                  "
                >
                  Add concerts, exhibitions, stand-up shows,
                  festivals and unforgettable live experiences.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="p-8 md:p-10 space-y-6">
              {/* TITLE */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Event Title
                </label>

                <div className="relative">
                  <Landmark
                    size={18}
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-pink-400
                    "
                  />

                  <input
                    type="text"
                    {...register("title")}
                    required
                    placeholder="Coldplay Live Concert"
                    className="
                      w-full
                      bg-[#222]
                      border border-gray-700
                      rounded-xl
                      py-3 pl-12 pr-4
                      outline-none
                      focus:border-pink-500
                    "
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Description
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="
                      absolute left-4 top-5
                      text-pink-400
                    "
                  />

                  <textarea
                    {...register("description")}
                    required
                    rows={5}
                    placeholder="Write event details..."
                    className="
                      w-full
                      bg-[#222]
                      border border-gray-700
                      rounded-xl
                      py-3 pl-12 pr-4
                      outline-none
                      focus:border-pink-500
                      resize-none
                    "
                  />
                </div>
              </div>

              {/* FILE */}
              <div>
                <label className="text-sm text-gray-400 mb-3 block">
                  Event Poster
                </label>

                <label
                  className="
                    flex items-center justify-center gap-3
                    border-2 border-dashed border-gray-700
                    rounded-2xl
                    p-8
                    cursor-pointer
                    hover:border-pink-500
                    transition
                    bg-[#1a1a1a]
                  "
                >
                  <ImagePlus
                    size={24}
                    className="text-pink-400"
                  />

                  <span className="text-gray-300">
                    Upload Event Poster
                  </span>

                  <input
                    type="file"
                    {...register("poster")}
                    required
                    className="hidden"
                  />
                </label>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Category
                </label>

                <div className="relative">
                  <Tag
                    size={18}
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-pink-400
                    "
                  />

                  <select
                    {...register("category")}
                    required
                    className="
                      w-full
                      bg-[#222]
                      border border-gray-700
                      rounded-xl
                      py-3 pl-12 pr-4
                      outline-none
                      focus:border-pink-500
                      text-white
                    "
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="events">
                      Events
                    </option>
                  </select>
                </div>
              </div>

              {/* DURATION + LANGUAGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Duration
                  </label>

                  <div className="relative">
                    <Clock3
                      size={18}
                      className="
                        absolute left-4 top-1/2
                        -translate-y-1/2
                        text-pink-400
                      "
                    />

                    <input
                      type="text"
                      {...register("duration")}
                      required
                      placeholder="3h 20m"
                      className="
                        w-full
                        bg-[#222]
                        border border-gray-700
                        rounded-xl
                        py-3 pl-12 pr-4
                        outline-none
                        focus:border-pink-500
                      "
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Language
                  </label>

                  <div className="relative">
                    <Languages
                      size={18}
                      className="
                        absolute left-4 top-1/2
                        -translate-y-1/2
                        text-pink-400
                      "
                    />

                    <input
                      type="text"
                      {...register("language")}
                      placeholder="English"
                      className="
                        w-full
                        bg-[#222]
                        border border-gray-700
                        rounded-xl
                        py-3 pl-12 pr-4
                        outline-none
                        focus:border-pink-500
                      "
                    />
                  </div>
                </div>
              </div>

              {/* DATE */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  Event Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="
                      absolute left-4 top-1/2
                      -translate-y-1/2
                      text-pink-400
                    "
                  />

                  <input
                    type="date"
                    {...register("date")}
                    className="
                      w-full
                      bg-[#222]
                      border border-gray-700
                      rounded-xl
                      py-3 pl-12 pr-4
                      outline-none
                      focus:border-pink-500
                    "
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  bg-pink-500 hover:bg-pink-600
                  py-4 rounded-2xl
                  font-semibold text-lg
                  transition-all duration-300
                  hover:scale-[1.02]
                  active:scale-95
                "
              >
                Add Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvents;