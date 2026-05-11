import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMoviesbyId } from "../stores/actions/MovieActions";
import { clearSelectedMovie } from "../stores/reducers/MovieSlice";
import { useForm } from "react-hook-form";
import { asyncCreateShows } from "../stores/actions/ShowActions";
import { toast } from "react-toastify";

import {
  CalendarDays,
  Clock3,
  ImagePlus,
  IndianRupee,
  MapPin,
  MonitorPlay,
  Ticket,
  Users,
} from "lucide-react";
import { clearShows } from "../stores/reducers/ShowSlice";

const AddShow = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const movie = useSelector(
    (state) => state.movieReducer.selectedMovie
  );

  useEffect(() => {
    dispatch(clearSelectedMovie());

    dispatch(getMoviesbyId(id));
  }, [dispatch, id]);

  const submitHandler = async (data) => {
    try {
      const formData = new FormData();

      formData.append("movieId", id);
      formData.append("totalSeats", data.totalSeats);
      formData.append("price", data.price);
      formData.append("cinema", data.cinema);
      formData.append("venue", data.venue);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append(
        "theatrePoster",
        data.theatrePoster[0]
      );

      const res = await dispatch(asyncCreateShows(formData));

      if (res?.success) {
        toast.success("Show Added Successfully 🎉");

        reset();
  dispatch(clearShows());
        navigate("/");
      } else {
        toast.error("Unable to Add Show");
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
        {/* BG GLOW */}
        <div
          className="
            absolute top-0 left-1/2
            -translate-x-1/2
            w-[500px] h-[500px]
            bg-red-500/20
            blur-[140px]
          "
        />

        <div
          className="
            relative z-10
            w-[92%] lg:w-[80%]
            mx-auto
            py-14
            flex flex-col items-center text-center
          "
        >
          <h1
            className="
              text-4xl sm:text-5xl
              font-black
            "
          >
            Add New Show 🎬
          </h1>

          <p
            className="
              text-gray-400
              mt-4
              max-w-2xl
              text-sm sm:text-base
            "
          >
            Create and manage movie shows with complete
            booking details, timing, ticket pricing and
            theatre information.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          w-[92%] lg:w-[80%]
          mx-auto
          py-12
          grid
          grid-cols-1 lg:grid-cols-2
          gap-10
          items-start
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            bg-[#171717]
            border border-gray-800
            rounded-3xl
            overflow-hidden
            shadow-2xl
          "
        >
          <div className="relative h-[500px]">
            <img
              src={
                movie?.poster ||
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
              }
              alt={movie?.title}
              className="w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black via-black/30 to-transparent
              "
            />

            {/* MOVIE INFO */}
            <div
              className="
                absolute bottom-0
                p-8
                w-full
              "
            >
              <span
                className="
                  bg-red-500/20
                  text-red-400
                  border border-red-500/30
                  px-4 py-1 rounded-full
                  text-sm font-semibold
                "
              >
                NOW SHOWING
              </span>

              <h2
                className="
                  text-4xl font-black
                  mt-4
                "
              >
                {movie?.title || "Loading..."}
              </h2>

              <p className="text-gray-300 mt-3">
                {movie?.language} • {movie?.duration}
              </p>

              <p
                className="
                  text-gray-400
                  text-sm
                  mt-4
                  line-clamp-3
                "
              >
                {movie?.description}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="
            bg-[#171717]
            border border-gray-800
            rounded-3xl
            p-8
            shadow-2xl
            space-y-6
          "
        >
          {/* CINEMA */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Cinema/Stadium Name
            </label>

            <div className="relative">
              <MonitorPlay
                size={18}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-red-400
                "
              />

              <input
                type="text"
                {...register("cinema")}
                placeholder="PVR Cinemas"
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

          {/* VENUE */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Venue / City
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-red-400
                "
              />

              <input
                type="text"
                {...register("venue")}
                placeholder="Kolkata"
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

          {/* DATE + TIME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* DATE */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Show Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-red-400
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
                    focus:border-red-500
                  "
                />
              </div>
            </div>

            {/* TIME */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Show Time
              </label>

              <div className="relative flex items-center">
                <Clock3
                  size={18}
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-red-400
                  "
                />

                <input
                  type="text"
                  {...register("time")}
                  placeholder="07:30 PM"
                  className="
                    w-full
                    bg-[#222]
                    border border-gray-700
                    rounded-xl
                    py-3 pl-12 pr-4
                    outline-none
                    focus:border-red-500
                    uppercase
                  "
                />
              </div>
            </div>
          </div>

          {/* PRICE + SEATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Ticket Price
              </label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-red-400
                  "
                />

                <input
                  type="number"
                  {...register("price")}
                  placeholder="499"
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

            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Total Seats
              </label>

              <div className="relative">
                <Users
                  size={18}
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-red-400
                  "
                />

                <input
                  type="number"
                  {...register("totalSeats")}
                  placeholder="120"
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
          </div>

          {/* FILE */}
          <div>
            <label className="text-sm text-gray-400 mb-3 block">
              Theatre Poster
            </label>

            <label
              className="
                flex items-center justify-center gap-3
                border-2 border-dashed border-gray-700
                rounded-2xl
                p-8
                cursor-pointer
                hover:border-red-500
                transition
                bg-[#1a1a1a]
              "
            >
              <ImagePlus size={26} className="text-red-400" />

              <span className="text-gray-300">
                Upload Theatre Poster
              </span>

              <input
                type="file"
                {...register("theatrePoster")}
                className="hidden"
              />
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="
              w-full
              flex items-center justify-center gap-3
              bg-red-500 hover:bg-red-600
              py-4 rounded-2xl
              font-semibold text-lg
              transition-all duration-300
              hover:scale-[1.02]
              active:scale-95
            "
          >
            <Ticket size={22} />
            Add Show
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShow;