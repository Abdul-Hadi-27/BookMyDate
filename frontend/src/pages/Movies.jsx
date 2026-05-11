import { useDispatch, useSelector } from "react-redux";
import { asyncgetMovies } from "../stores/actions/MovieActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Clock3, Languages } from "lucide-react";

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movieReducer.movies);

  useEffect(() => {
    dispatch(asyncgetMovies("movie"));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-16">
      {/* HERO SECTION */}
      <div
        className="
          w-full
          h-62.5 md:h-87.5
          relative
          overflow-hidden
        "
      >
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop"
          alt="movies-banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
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
              font-black
              tracking-wide
            "
          >
            Movies
          </h1>

          <p className="mt-4 text-gray-300 max-w-2xl text-sm md:text-lg">
            Discover the latest blockbusters, trending movies and unforgettable
            cinematic experiences.
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
              Recommended Movies
            </h2>

            <p className="text-gray-400 mt-1 text-sm">
              Explore the best movies available right now
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search movies..."
              className="
                bg-[#1c1c1c]
                border border-gray-700
                px-4 py-3
                rounded-xl
                outline-none
                focus:border-red-500
                text-sm
                w-full md:w-65
              "
            />

            <button
              className="
                bg-red-500 hover:bg-red-600
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

        {/* MOVIES GRID */}
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
          {movies.map((movie) => (
            <div
              key={movie._id}
              onClick={() => {
                navigate(`/movie/${movie._id}`);
              }}
              className="
                group cursor-pointer
                bg-[#1a1a1a]
                border border-gray-800
                rounded-3xl
                overflow-hidden
                hover:border-red-500/40
                hover:-translate-y-2
                transition-all duration-300
                shadow-lg hover:shadow-red-500/20
              "
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="
                    h-87.5
                    w-full
                    object-cover
                    group-hover:scale-110
                    transition-all duration-500
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute inset-0
                    bg-linear-to-t
                    from-black via-black/20 to-transparent
                  "
                />

                {/* RATING */}
                <div
                  className="
                    absolute top-4 right-4
                    bg-black/70 backdrop-blur-md
                    px-3 py-1 rounded-full
                    text-sm font-semibold
                    text-yellow-400
                  "
                >
                  ⭐ 8.7
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-bold line-clamp-1">
                  {movie.title}
                </h2>

                {/* INFO */}
                <div className="flex flex-col gap-2 mt-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Languages size={16} />
                    <span>{movie.language}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={16} />
                    <span>{movie.duration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    <span>
                      {new Date(movie.date).toDateString()}
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p
                  className="
                    text-sm text-gray-300
                    mt-4 line-clamp-2
                    leading-relaxed
                  "
                >
                  {movie.description}
                </p>

                {/* BUTTON */}
                <button
                  className="
                    mt-6 w-full
                    bg-red-500 hover:bg-red-600
                    py-3 rounded-xl
                    font-semibold
                    transition-all duration-300
                    hover:scale-[1.02]
                    active:scale-95
                  "
                >
                  Book Tickets
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;