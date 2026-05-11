/* eslint-disable no-unused-vars */

import { useDispatch, useSelector } from "react-redux";
import { asyncgetMovies } from "../stores/actions/MovieActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Languages,
  Trophy,
  MapPin,
} from "lucide-react";

const Sports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sports = useSelector((state) => state.movieReducer.movies);

  useEffect(() => {
    dispatch(asyncgetMovies("sports"));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-16">
      {/* HERO SECTION */}
      <div
        className="
          w-full
          h-[250px] md:h-[360px]
          relative overflow-hidden
        "
      >
        <img
          src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=2070&auto=format&fit=crop"
          alt="sports-banner"
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

        {/* CONTENT */}
        <div
          className="
            absolute inset-0
            flex flex-col justify-center
            px-6 md:px-16
          "
        >
          <h1
            className="
              text-4xl md:text-6xl
              font-black tracking-wide
            "
          >
            Sports Arena
          </h1>

          <p className="mt-4 text-gray-300 max-w-2xl text-sm md:text-lg">
            Experience the thrill of live sports, epic rivalries and unforgettable
            moments with your favorite teams and athletes.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-[92%] lg:w-[85%] mx-auto mt-12">
        {/* TOP BAR */}
        <div
          className="
            flex flex-col md:flex-row
            md:items-center md:justify-between
            gap-5 mb-10
          "
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Trending Sports Events
            </h2>

            <p className="text-gray-400 mt-1 text-sm">
              Discover upcoming matches, tournaments and live action
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search sports..."
              className="
                bg-[#1c1c1c]
                border border-gray-700
                px-4 py-3
                rounded-xl
                outline-none
                focus:border-green-500
                text-sm
                w-full md:w-[260px]
              "
            />

            <button
              className="
                bg-green-500 hover:bg-green-600
                px-5 py-3
                rounded-xl
                text-sm font-semibold
                transition
              "
            >
              Search
            </button>
          </div>
        </div>

        {/* SPORTS GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          "
        >
          {sports.map((sport) => (
            <div
              key={sport._id}
              onClick={() => {
                navigate(`/sport/${sport._id}`);
              }}
              className="
                group cursor-pointer
                bg-[#1a1a1a]
                border border-gray-800
                rounded-3xl
                overflow-hidden
                hover:border-green-500/40
                hover:-translate-y-2
                transition-all duration-300
                shadow-lg hover:shadow-green-500/20
              "
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={sport.poster}
                  alt={sport.title}
                  className="
                    h-[350px]
                    w-full
                    object-center
                    group-hover:scale-110
                    transition-all duration-500
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black via-black/20 to-transparent
                  "
                />

                {/* LIVE BADGE */}
                <div
                  className="
                    absolute top-4 left-4
                    bg-green-500
                    px-3 py-1 rounded-full
                    text-xs font-bold
                    tracking-wide
                    flex items-center gap-1
                  "
                >
                  <Trophy size={12} />
                  LIVE MATCH
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-bold line-clamp-1">
                  {sport.title}
                </h2>

                {/* INFO */}
                <div className="flex flex-col gap-2 mt-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Languages size={16} />
                    <span>{sport.language}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={16} />
                    <span>{sport.duration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>
                      {new Date(sport.date).toDateString()}
                    </span>
                  </div>

                  {/* <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Kolkata Stadium</span>
                  </div> */}
                </div>

                {/* DESCRIPTION */}
                <p
                  className="
                    text-sm text-gray-300
                    mt-4 line-clamp-2
                    leading-relaxed
                  "
                >
                  {sport.description}
                </p>

                {/* BUTTON */}
                <button
                  className="
                    mt-6 w-full
                    bg-green-500 hover:bg-green-600
                    py-3 rounded-xl
                    font-semibold
                    transition-all duration-300
                    hover:scale-[1.02]
                    active:scale-95
                  "
                >
                  Book Match
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sports;