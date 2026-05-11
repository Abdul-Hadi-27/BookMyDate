import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { clearShows } from "../stores/reducers/ShowSlice";
import { getShowDetails } from "../stores/actions/ShowActions";

import { CalendarDays, Clock3, IndianRupee, MapPin } from "lucide-react";

import { clearSelectedMovie } from "../stores/reducers/MovieSlice";

import { getMoviesbyId } from "../stores/actions/MovieActions";

const RenderShows = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();

  // SHOWS
  const shows = useSelector((state) => state.showReducer.shows);
  // console.log(shows);

  // MOVIE
  const movieById = useSelector((state) => state.movieReducer.selectedMovie);

  useEffect(() => {
    dispatch(getShowDetails(id));

    dispatch(getMoviesbyId(id));

    return () => {
      dispatch(clearShows());

      dispatch(clearSelectedMovie());
    };
  }, [dispatch, id]);

  // nested array issue handle
  const finalShows = Array.isArray(shows[0]) ? shows[0] : shows;

  // sort nearest date -> farthest
  const sortedShows = [...finalShows].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-16">
      {/* HERO SECTION */}
      <div
        className="
          relative min-h-150
          overflow-hidden
          border-b border-gray-800
        "
      >
        {/* BACKGROUND IMAGE */}
        <img
          src={movieById?.poster}
          alt={movieById?.title}
          className="
            absolute inset-0
            w-full h-full
            object-cover
          "
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/80" />

        {/* CONTENT */}
        <div
          className="
            relative z-10
            w-[92%] lg:w-[80%]
            mx-auto
            py-16
            flex items-center
            min-h-150
          "
        >
          <div
            className="
              flex flex-col lg:flex-row
              items-center lg:items-start
              gap-10
            "
          >
            {/* MOVIE POSTER */}
            <img
              src={movieById?.poster}
              alt={movieById?.title}
              className="
                w-62.5
                h-90
                object-cover
                rounded-3xl
                shadow-2xl
                border border-gray-700
              "
            />

            {/* MOVIE DETAILS */}
            <div className="text-center lg:text-left">
              {/* TAG */}
              <span
                className="
                  bg-red-500/20
                  text-red-400
                  border border-red-500/30
                  px-5 py-2
                  rounded-full
                  text-sm
                  font-semibold
                "
              >
                NOW SHOWING
              </span>

              {/* TITLE */}
              <h1
                className="
                  text-4xl sm:text-5xl lg:text-7xl
                  font-black
                  mt-6
                  leading-tight
                "
              >
                {movieById?.title}
              </h1>

              {/* META */}
              <p
                className="
                  text-gray-300
                  text-lg
                  mt-5
                "
              >
                {movieById?.language} • {movieById?.duration}
              </p>

              {/* DESCRIPTION */}
              <p
                className="
                  text-gray-400
                  mt-6
                  max-w-3xl
                  leading-relaxed
                  text-sm sm:text-base
                "
              >
                {movieById?.description}
              </p>

              {/* SHOW COUNT */}
              <div
                className="
                  mt-8
                  flex flex-wrap
                  gap-4
                  justify-center lg:justify-start
                "
              >
                <div
                  className="
                    bg-[#1c1c1c]
                    border border-gray-700
                    px-6 py-4
                    rounded-2xl
                  "
                >
                  <p className="text-gray-400 text-sm">Available Shows</p>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-red-400
                    "
                  >
                    {sortedShows.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SHOW LIST */}
      <div
        className="
          w-[92%] lg:w-[80%]
          mx-auto
          mt-14
        "
      >
        {/* HEADER */}
        <div
          className="
            flex flex-col sm:flex-row
            items-start sm:items-center
            justify-between
            gap-4
            mb-10
          "
        >
          <div>
            <h2
              className="
                text-3xl
                font-bold
              "
            >
              Available Shows
            </h2>

            <p className="text-gray-400 mt-2">
              Sorted by nearest available dates
            </p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {sortedShows.length === 0 && (
          <div
            className="
              bg-[#171717]
              border border-gray-800
              rounded-3xl
              p-12
              text-center
            "
          >
            <h2 className="text-3xl font-bold">No Shows Available 😔</h2>

            <p className="text-gray-400 mt-4">Please check again later.</p>
          </div>
        )}

        {/* SHOW CARDS */}
        <div className="space-y-8">
          {sortedShows.map((show) => (
            <div
              key={show._id}
              className="
                bg-[#171717]
                border border-gray-800
                rounded-3xl
                overflow-hidden
                shadow-xl
                hover:border-red-500/30
                transition-all duration-300
              "
            >
              <div
                className="
                  grid
                  grid-cols-1
                  lg:grid-cols-3
                "
              >
                {/* THEATRE IMAGE */}
                <div className="h-70 lg:h-full">
                  <img
                    src={show.theatrePoster}
                    alt={show.cinema}
                    className="
                      w-full h-full
                      object-cover
                    "
                  />
                </div>

                {/* DETAILS */}
                <div
                  className="
                    lg:col-span-2
                    p-8
                    flex flex-col justify-between
                  "
                >
                  <div>
                    {/* CINEMA */}
                    <h2
                      className="
                        text-3xl
                        font-black
                      "
                    >
                      {show.cinema}
                    </h2>

                    {/* LOCATION */}
                    <div
                      className="
                        flex items-center gap-2
                        mt-3
                        text-gray-400
                      "
                    >
                      <MapPin size={18} />

                      <span>{show.venue}</span>
                    </div>

                    {/* INFO BOXES */}
                    <div
                      className="
                        flex flex-wrap
                        gap-4
                        mt-8
                      "
                    >
                      {/* DATE */}
                      <div
                        className="
                          bg-[#1f1f1f]
                          px-5 py-4
                          rounded-2xl
                          flex items-center gap-3
                        "
                      >
                        <CalendarDays size={20} className="text-red-400" />

                        <div>
                          <p className="text-gray-400 text-sm">Date</p>

                          <p className="font-semibold">
                            {new Date(show.date).toDateString()}
                          </p>
                        </div>
                      </div>

                      {/* TIME */}
                      <div
                        className="
                          bg-[#1f1f1f]
                          px-5 py-4
                          rounded-2xl
                          flex items-center gap-3
                        "
                      >
                        <Clock3 size={20} className="text-red-400" />

                        <div>
                          <p className="text-gray-400 text-sm">Time</p>

                          <p className="font-semibold">{show.time}</p>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div
                        className="
                          bg-[#1f1f1f]
                          px-5 py-4
                          rounded-2xl
                          flex items-center gap-3
                        "
                      >
                        <IndianRupee size={20} className="text-red-400" />

                        <div>
                          <p className="text-gray-400 text-sm">Ticket Price</p>

                          <p className="font-semibold">₹ {show.price}</p>
                        </div>
                      </div>
                    </div>

                    {/* SEATS */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Available Seats</span>

                        <span className="font-semibold text-green-400">
                          {show.totalSeats - show.bookedSeats.length} Seats Left
                        </span>
                      </div>

                      {/* BAR */}
                      <div
                        className="
                          w-full h-3
                          bg-[#2a2a2a]
                          rounded-full
                          overflow-hidden
                          mt-3
                        "
                      >
                        <div
                          className="
                            h-full
                            bg-green-500
                            rounded-full
                          "
                          style={{
                            width: `${Math.min(
                              ((show.totalSeats - show.bookedSeats.length) /
                                show.totalSeats) *
                                100,
                              100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="mt-10">
                    <button
                      onClick={() => {
                        navigate(`/select-show/booking/${show._id}`);
                      }}
                      className="
                        w-full lg:w-auto
                        px-10 py-4
                        rounded-2xl
                        bg-red-500 hover:bg-red-600
                        font-semibold
                        text-lg
                        transition-all duration-300
                        hover:scale-105
                        active:scale-95
                      "
                    >
                      Select Seats
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenderShows;
