/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

const MyBookings = () => {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = useSelector(
    (state) => state.userReducer.users
  );

  // fetch bookings
  const fetchBookings =
    async () => {
      try {
        const { data } =
          await axios.get(
            `http://localhost:3000/api/auth/my-bookings/${user?.id}`
          );

        setBookings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, [user]);

  // loading
  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-white
          text-2xl
          font-bold
        "
      >
        Loading Bookings...
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#0f0f0f]
        text-white
        p-6
        md:p-10
      "
    >
      {/* heading */}
      <div className="mb-10">
        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
          "
        >
          My Bookings
        </h1>

        <p className="text-gray-400 mt-3">
          Your booked movie tickets
        </p>
      </div>

      {/* no bookings */}
      {bookings.length === 0 ? (
        <div
          className="
            flex
            items-center
            justify-center
            h-[60vh]
          "
        >
          <h2
            className="
              text-2xl
              text-gray-500
              font-bold
            "
          >
            No bookings found
          </h2>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
          "
        >
          {bookings.map(
            (booking) => {
              const show =
                booking?.showId;

              const movie =
                show?.movieId;

              return (
                <div
                  key={booking._id}
                  className="
                    bg-[#171717]
                    border
                    border-gray-800
                    rounded-3xl
                    overflow-hidden
                    shadow-xl
                  "
                >
                  {/* poster */}
                  <div
                    className="
                      h-75
                      overflow-hidden
                    "
                  >
                    <img
                      src={
                        movie?.poster
                      }
                      alt={
                        movie?.title
                      }
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />
                  </div>

                  {/* content */}
                  <div className="p-6">
                    {/* title */}
                    <h2
                      className="
                        text-3xl
                        font-black
                      "
                    >
                      {movie?.title}
                    </h2>

                    {/* cinema */}
                    <p
                      className="
                        text-gray-400
                        mt-3
                      "
                    >
                      🎬 {show?.cinema}
                    </p>

                    {/* venue */}
                    <p
                      className="
                        text-gray-500
                        mt-2
                      "
                    >
                      📍 {show?.venue}
                    </p>

                    {/* date */}
                    <p
                      className="
                        text-gray-400
                        mt-4
                      "
                    >
                      📅{" "}
                      {new Date(
                        show?.date
                      ).toLocaleDateString()}
                    </p>

                    {/* time */}
                    <p
                      className="
                        text-gray-400
                        mt-2
                      "
                    >
                      ⏰ {show?.time}
                    </p>

                    {/* seats */}
                    <div className="mt-5">
                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >
                        Seats
                      </h3>

                      <div
                        className="
                          flex
                          flex-wrap
                          gap-3
                          mt-3
                        "
                      >
                        {booking?.seats?.map(
                          (
                            seat
                          ) => (
                            <span
                              key={
                                seat
                              }
                              className="
                                px-4
                                py-2
                                rounded-full
                                bg-red-500
                                font-semibold
                              "
                            >
                              {seat}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* total */}
                    <div
                      className="
                        mt-6
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <h2
                        className="
                          text-2xl
                          font-black
                          text-red-400
                        "
                      >
                        ₹
                        {
                          booking?.totalPrice
                        }
                      </h2>

                      <span
                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-green-500/20
                          text-green-400
                          font-bold
                        "
                      >
                        Confirmed
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;