/* eslint-disable no-unused-vars */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesbyId } from "../stores/actions/MovieActions";
import { useNavigate, useParams } from "react-router-dom";
import { clearSelectedMovie } from "../stores/reducers/MovieSlice";
import { getcurrentUser } from "../stores/actions/UserActions";
import { openAuth } from "../stores/reducers/Ui.slice";


import {
  CalendarDays,
  Clock3,
  Languages,
  Ticket,
  Star,
  PlayCircle,
} from "lucide-react";

const AllDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.users);

  const movie = useSelector((state) => state.movieReducer.selectedMovie);

  useEffect(() => {
    dispatch(clearSelectedMovie());

    dispatch(getcurrentUser());

    dispatch(getMoviesbyId(id));
  }, [dispatch, id]);

  // LOADING
  if (!movie || movie._id !== id) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          bg-[#0f0f0f]
          text-white
        "
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="
              h-12 w-12
              rounded-full
              border-4 border-red-500 border-t-transparent
              animate-spin
            "
          />

          <p className="text-lg text-gray-300">
            Loading Details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-16">
      {/* HERO SECTION */}
      <div className="relative h-[90vh] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="
            absolute inset-0
            w-full h-full
            object-cover
            scale-110
          "
        />

        {/* OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black via-black/80 to-black/50
          "
        />

        <div
          className="
            relative z-10
            w-[92%] lg:w-[85%]
            mx-auto
            h-full
            flex flex-col lg:flex-row
            items-center
            justify-center
            gap-10
            pt-20
          "
        >
          {/* POSTER */}
          <div
            className="
              w-[260px]
              sm:w-[320px]
              rounded-3xl
              overflow-hidden
              shadow-2xl
              border border-gray-700
            "
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* CONTENT */}
          <div className="max-w-3xl">
            {/* CATEGORY */}
            <span
              className="
                bg-red-500/20
                text-red-400
                border border-red-500/30
                px-4 py-1 rounded-full
                text-sm font-semibold
              "
            >
              {movie.category?.toUpperCase()}
            </span>

            {/* TITLE */}
            <h1
              className="
                text-2xl sm:text-5xl lg:text-4xl
                font-black
                mt-5
                leading-tight
              "
            >
              {movie.title}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-5">
              <div
                className="
                  flex items-center gap-2
                  bg-[#1c1c1c]
                  px-4 py-2 rounded-xl
                "
              >
                <Star
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-semibold">
                  8.9/10
                </span>
              </div>

              <div
                className="
                  flex items-center gap-2
                  bg-[#1c1c1c]
                  px-4 py-2 rounded-xl
                "
              >
                <PlayCircle size={18} />
                <span>Trending Now</span>
              </div>
            </div>

            {/* INFO */}
            <div
              className="
                flex flex-wrap
                gap-4 mt-6
              "
            >
              <div
                className="
                  flex items-center gap-2
                  bg-[#1c1c1c]
                  px-4 py-3 rounded-xl
                "
              >
                <Languages size={18} className="text-red-400" />
                <span>{movie.language}</span>
              </div>

              <div
                className="
                  flex items-center gap-2
                  bg-[#1c1c1c]
                  px-4 py-3 rounded-xl
                "
              >
                <Clock3 size={18} className="text-red-400" />
                <span>{movie.duration}</span>
              </div>

              <div
                className="
                  flex items-center gap-2
                  bg-[#1c1c1c]
                  px-4 py-3 rounded-xl
                "
              >
                <CalendarDays
                  size={18}
                  className="text-red-400"
                />

                <span>
                  {new Date(
                    movie.date || movie.releaseDate
                  ).toDateString()}
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            {/* <p
              className="
                mt-8
                text-gray-300
                leading-relaxed
                text-sm sm:text-base
                max-w-3xl
              "
            >
              {movie.description}
            </p> */}

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">
              {/* USER BUTTON */}
              {user ? (
                <button  onClick={()=>{
                  navigate( `/select-show/${id}`)
                }}
                  className="
                    flex items-center gap-2
                    bg-red-500 hover:bg-red-600
                    px-7 py-2 rounded-2xl
                    font-semibold
                    transition-all duration-300
                    hover:scale-105
                    active:scale-95
                  "
                >
                  <Ticket size={18} />
                  Book Now
                </button>
              ) : (
                <button
                  onClick={() => dispatch(openAuth())}
                  className="
                    bg-gray-700 hover:bg-gray-600
                    px-7 py-2 rounded-2xl
                    font-semibold
                    transition-all duration-300
                  "
                >
                  🔒 Login to Book
                </button>
              )}

              {/* ADMIN BUTTON */}
              {user?.role === "admin" && (
                <button
                  onClick={() => {
                    navigate(`/admin/add-show-detail/${id}`);
                  }}
                  className="
                    bg-pink-500 hover:bg-pink-600
                    px-7 py-2 rounded-2xl
                    font-semibold
                    transition-all duration-300
                    hover:scale-105
                    active:scale-95
                  "
                >
                  ➕ Add Show
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="w-[92%] lg:w-[85%] mx-auto mt-16">
        {/* ABOUT */}
        <div
          className="
            bg-[#171717]
            border border-gray-800
            rounded-3xl
            p-6 md:p-10
          "
        >
          <h2 className="text-3xl font-bold mb-6">
            About The Show
          </h2>

          <p
            className="
              text-gray-300
              leading-loose
              text-sm sm:text-base
            "
          >
            {movie.description}
          </p>

          {/* EXTRA INFO */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-6
              mt-10
            "
          >
            <div
              className="
                bg-[#1f1f1f]
                rounded-2xl
                p-5
              "
            >
              <h3 className="text-gray-400 text-sm">
                Category
              </h3>

              <p className="text-lg mt-2 capitalize font-semibold">
                {movie.category}
              </p>
            </div>

            <div
              className="
                bg-[#1f1f1f]
                rounded-2xl
                p-5
              "
            >
              <h3 className="text-gray-400 text-sm">
                Language
              </h3>

              <p className="text-lg mt-2 font-semibold">
                {movie.language}
              </p>
            </div>

            <div
              className="
                bg-[#1f1f1f]
                rounded-2xl
                p-5
              "
            >
              <h3 className="text-gray-400 text-sm">
                Duration
              </h3>

              <p className="text-lg mt-2 font-semibold">
                {movie.duration}
              </p>
            </div>

            <div
              className="
                bg-[#1f1f1f]
                rounded-2xl
                p-5
              "
            >
              <h3 className="text-gray-400 text-sm">
                Release Date
              </h3>

              <p className="text-lg mt-2 font-semibold">
                {new Date(
                  movie.date || movie.releaseDate
                ).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDetail;