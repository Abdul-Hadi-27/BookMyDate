/* /eslint-disable no-unused-vars */

import { useDispatch, useSelector } from "react-redux";
import Slider from "../components/Slider";
import { asyncgetMovies } from "../stores/actions/MovieActions";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getcurrentUser } from "../stores/actions/UserActions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => {
    const movies = state.movieReducer.movies;
    return Array.isArray(movies) ? movies : [];
  });

  useEffect(() => {
    dispatch(getcurrentUser());
    dispatch(asyncgetMovies());
  }, [dispatch]);

  const Card = ({ item, route }) => {
    return (
      <div
        onClick={() => navigate(`/${route}/${item._id}`)}
        className="
          group cursor-pointer rounded-3xl overflow-hidden
          bg-[#1a1a1a] border border-gray-800
          hover:border-red-500/40
          hover:-translate-y-2
          transition-all duration-300
          shadow-lg hover:shadow-red-500/20
        "
      >
        <div className="relative overflow-hidden">
          <img
            src={item.poster}
            alt={item.title}
            className="
              h-75 sm:h-87.5 md:h-95
              w-full object-cover
              group-hover:scale-110
              transition-all duration-500
            "
          />

          {/* overlay */}
          <div
            className="
              absolute inset-0
              bg-linear-to-t from-black via-black/40 to-transparent
            "
          />

          {/* floating category */}
          <span
            className="
              absolute top-3 left-3
              bg-red-500 text-white
              text-xs px-3 py-1 rounded-full
              uppercase tracking-wider font-semibold
            "
          >
            {item.category}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg md:text-xl font-bold text-white line-clamp-1">
              {item.title}
            </h2>

            <span className="text-yellow-400 text-sm font-semibold">
              ⭐ 8.5
            </span>
          </div>

          <p className="text-sm text-gray-400 mt-1">
            {item.language} • {item.duration}
          </p>

          <p className="text-sm text-gray-300 mt-3 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <button
            className="
              mt-5 w-full py-2.5 rounded-xl
              bg-red-500 hover:bg-red-600
              text-white font-semibold
              transition-all duration-300
            "
          >
            Book Now
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-20">
      {/* HERO SLIDER */}
      <div className="w-full">
        <Slider />
      </div>

      {/* PROMO SECTION */}
      <div className="w-[92%] lg:w-[80%] mx-auto mt-10">
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            bg-linear-to-r from-red-600 via-pink-600 to-orange-500
            p-8 md:p-12
            shadow-2xl
          "
        >
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-black   italic ">
                Book My Date
              </h1>

              <p className="mt-3 text-lg md:text-2xl font-medium text-white/90">
                Stream Endless Entertainment Anytime, Anywhere 🎬
              </p>
            </div>

            <button
              className="
                px-8 py-4 rounded-2xl
                bg-white text-black
                font-bold text-lg
                hover:scale-105 transition-all
              "
            >
              Explore Now
            </button>
          </div>
        </div>
      </div>

      {/* MOVIES */}
      <section className="w-[92%] lg:w-[80%] mx-auto mt-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Recommended Movies
          </h2>

          <Link to='/movies' className="text-red-400 hover:text-red-500 transition">
            View All
          </Link>
        </div>

        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-3
            gap-8
          "
        >
          {data
            ?.filter((m) => m.category === "movie")
            .slice(0, 6)
            .map((movie) => (
              <Card key={movie._id} item={movie} route="movie" />
            ))}
        </div>
      </section>

      {/* EVENTS */}
      <section className="w-[92%] lg:w-[80%] mx-auto mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Recommended Events
          </h2>

          <Link to='/events' className="text-red-400 hover:text-red-500 transition">
            View All
          </Link>
        </div>

        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {data
            .filter((m) => m.category === "events")
            .slice(0, 6)
            .map((event) => (
              <Card key={event._id} item={event} route="movie" />
            ))}
        </div>
      </section>

      {/* SPORTS */}
      <section className="w-[92%] lg:w-[80%] mx-auto mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Recommended Sports
          </h2>

          <Link to='/sports' className="text-red-400 hover:text-red-500 transition">
            View All
          </Link>
        </div>

        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {data
            .filter((m) => m.category === "sports")
            .slice(0, 6)
            .map((sport) => (
              <Card key={sport._id} item={sport} route="sport" />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;