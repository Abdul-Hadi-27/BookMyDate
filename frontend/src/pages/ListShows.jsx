/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Beer,
  BookOpenText,
  Landmark,
  Popcorn,
  Speech,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const ListShows = () => {
  const { register, reset, handleSubmit } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cards = [
    {
      title: "Movies",
      icon: <Popcorn size={50} strokeWidth={1.5} />,
      color:
        "from-red-500/20 to-pink-500/20 border-red-500/30 hover:shadow-red-500/20",
      route: "/admin/add-movies",
      available: true,
    },
    {
      title: "Sports",
      icon: <Trophy size={50} strokeWidth={1.5} />,
      color:
        "from-green-500/20 to-emerald-500/20 border-green-500/30 hover:shadow-green-500/20",
      route: "/admin/add-sports",
      available: true,
    },
    {
      title: "Events",
      icon: <Landmark size={50} strokeWidth={1.5} />,
      color:
        "from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:shadow-blue-500/20",
      route: "/admin/add-events",
      available: true,
    },
    {
      title: "Parties",
      icon: <Beer size={50} strokeWidth={1.5} />,
      color:
        "from-orange-500/20 to-yellow-500/20 border-orange-500/30",
      route: "/admin/add-show/parties",
      available: false,
    },
    {
      title: "Expositions",
      icon: <BookOpenText size={50} strokeWidth={1.5} />,
      color:
        "from-purple-500/20 to-fuchsia-500/20 border-purple-500/30",
      route: "/admin/add-show/expositions",
      available: false,
    },
    {
      title: "Conferences",
      icon: <Speech size={50} strokeWidth={1.5} />,
      color:
        "from-pink-500/20 to-rose-500/20 border-pink-500/30",
      route: "/admin/add-show/conferences",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pb-16">
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
            w-125 h-125
            bg-red-500/20
            blur-[140px]
          "
        />

        <div
          className="
            relative z-10
            w-[92%] lg:w-[80%]
            mx-auto
            py-20
            flex flex-col items-center
            text-center
          "
        >
          <div
            className="
              flex items-center gap-2
              bg-red-500/10
              border border-red-500/20
              text-red-400
              px-4 py-2 rounded-full
              text-sm font-semibold
            "
          >
            <Sparkles size={16} />
            Host Amazing Experiences
          </div>

          <h1
            className="
              text-4xl sm:text-5xl lg:text-7xl
              font-black
              mt-6
              leading-tight
            "
          >
            What Can You Host?
          </h1>

          <p
            className="
              text-gray-400
              text-sm sm:text-base md:text-lg
              max-w-3xl
              mt-6
              leading-relaxed
            "
          >
            BookMyShow provides complete event management solutions —
            from registrations and ticketing to audience engagement and
            seamless event execution.
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div
        className="
          w-[92%] lg:w-[80%]
          mx-auto
          mt-16
        "
      >
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {cards.map((card, index) => (
            <button
              key={index}
              disabled={!card.available}
              onClick={() => navigate(card.route)}
              className={`
                group relative overflow-hidden
                rounded-3xl
                border
                bg-gradient-to-br ${card.color}
                backdrop-blur-xl
                p-8
                text-left
                transition-all duration-300
                hover:-translate-y-3
                hover:shadow-2xl
                ${
                  card.available
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-80"
                }
              `}
            >
              {/* COMING SOON */}
              {!card.available && (
                <div
                  className="
                    absolute top-5 -right-12
                    rotate-45
                    bg-red-500
                    text-white
                    text-xs font-bold
                    px-12 py-2
                    shadow-lg
                  "
                >
                  COMING SOON
                </div>
              )}

              {/* ICON */}
              <div
                className="
                  w-20 h-20
                  rounded-2xl
                  bg-white/10
                  border border-white/10
                  flex items-center justify-center
                  mb-8
                "
              >
                {card.icon}
              </div>

              {/* TITLE */}
              <h2
                className="
                  text-3xl
                  font-bold
                  mb-3
                "
              >
                {card.title}
              </h2>

              {/* DESC */}
              <p
                className="
                  text-gray-300
                  text-sm
                  leading-relaxed
                  mb-8
                "
              >
                Host and manage premium {card.title.toLowerCase()} experiences
                with seamless bookings and audience engagement.
              </p>

              {/* BUTTON */}
              <div
                className={`
                  flex items-center gap-2
                  text-sm font-semibold
                  transition-all duration-300
                  ${
                    card.available
                      ? "text-white group-hover:translate-x-2"
                      : "text-gray-400"
                  }
                `}
              >
                {card.available ? (
                  <>
                    Get Started
                    <ArrowRight size={16} />
                  </>
                ) : (
                  "Launching Soon"
                )}
              </div>

              {/* HOVER GLOW */}
              <div
                className="
                  absolute inset-0
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  bg-white/[0.03]
                "
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListShows;