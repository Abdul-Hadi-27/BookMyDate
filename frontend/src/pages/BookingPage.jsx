/*/ eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getShowById,
} from "../stores/actions/ShowActions";



import { toast } from "react-toastify";
import api from "../api/axiosConfig";

const BookingPage = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const user =
    useSelector(
      (state) =>
        state.userReducer
          .users
    );

  // selected seats
  const [
    selectedSeats,
    setSelectedSeats,
  ] = useState([]);

  // show
  const show =
    useSelector(
      (state) =>
        state.showReducer
          .selectedShow
    );

  // loading
  const { loading } =
    useSelector(
      (state) =>
        state.bookingReducer
    );

  // fetch show
  useEffect(() => {

    dispatch(
      getShowById(id)
    );

  }, [dispatch, id]);

  // all seats
  const seats =
    show?.seats || [];

  // booked seats
  const bookedSeats =
    show?.bookedSeats ||
    [];

  // select seat
  const handleSeatSelect =
    (seat) => {

      // already booked
      if (
        bookedSeats.includes(
          seat
        )
      ) {
        return;
      }

      // remove
      if (
        selectedSeats.includes(
          seat
        )
      ) {

        setSelectedSeats(
          selectedSeats.filter(
            (s) =>
              s !== seat
          )
        );

      }

      // add
      else {

        setSelectedSeats([
          ...selectedSeats,
          seat,
        ]);
      }
    };

  // booking
  const handleBooking =
    async () => {

      try {

        // no seats
        if (
          selectedSeats.length ===
          0
        ) {
          return alert(
            "Please select seats"
          );
        }

        // no login
        if (!user?.id) {
          return alert(
            "Please login first"
          );
        }

        // create order
        const response =
          await api.post(
            "/api/auth/create-order",
            {
              showId: id,

              seats:
                selectedSeats,

              userId:
                user.id,
            }
          );

        const order =
          response.data.order;

        // razorpay
        const options = {
          key:
            import.meta.env
              .VITE_RAZORPAY_KEY_ID,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "Book My Show",

          description:
            "Movie Ticket Booking",

          order_id:
            order.id,

          handler:
            async function (
              response
            ) {

              try {

                const verifyResponse =
                  await api.post(
                    "/api/auth/verify-payment",
                    {
                      razorpay_order_id:
                        response.razorpay_order_id,

                      razorpay_payment_id:
                        response.razorpay_payment_id,

                      razorpay_signature:
                        response.razorpay_signature,
                    }
                  );

                if (
                  verifyResponse
                    .data
                    .success
                ) {

                  toast.success(
                    "Booking Successful"
                  );

                  dispatch(
                    getShowById(
                      id
                    )
                  );

                  setSelectedSeats(
                    []
                  );

                  navigate(
                    "/profile/my-bookings"
                  );
                }

              } catch (error) {

                console.log(
                  error
                );

                alert(
                  "Payment verification failed"
                );
              }
            },

          prefill: {
            name:
              user?.username,

            email:
              user?.email,
          },

          theme: {
            color:
              "#ef4444",
          },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {

        console.log(error);

        alert(
          "Booking Failed"
        );
      }
    };

  return (
    <div
      className="
        min-h-screen
        bg-[#0f0f0f]
        text-white
        p-6
        md:p-10
        pb-40
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
          Select Seats
        </h1>

        <p
          className="
            text-gray-400
            mt-3
          "
        >
          {show?.cinema}
        </p>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          {show?.venue}
        </p>

        <p
          className="
            text-red-400
            mt-2
            font-bold
          "
        >
          ₹ {show?.price}
          {" "}
          per seat
        </p>
      </div>

      {/* screen */}
      <div
        className="
          flex
          justify-center
          mb-16
        "
      >
        <div
          className="
            w-[75%]
          "
        >
          <div
            className="
              h-4
              bg-white
              rounded-full
              shadow-[0_0_50px_white]
            "
          />

          <p
            className="
              text-center
              text-gray-400
              mt-4
            "
          >
            SCREEN
          </p>
        </div>
      </div>

      {/* seats */}
      <div
        className="
          max-w-5xl
          mx-auto
          grid
          grid-cols-4
          sm:grid-cols-6
          md:grid-cols-8
          gap-4
        "
      >
        {seats.map((seat) => {

          const isBooked =
            bookedSeats.includes(
              seat
            );

          const isSelected =
            selectedSeats.includes(
              seat
            );

          return (
            <button
              key={seat}

              disabled={
                isBooked
              }

              onClick={() =>
                handleSeatSelect(
                  seat
                )
              }

              className={`
                h-14
                rounded-xl
                border
                font-bold
                transition-all
                duration-300

                ${
                  isBooked
                    ? "bg-gray-700 border-gray-700 cursor-not-allowed opacity-50"

                    : isSelected
                    ? "bg-red-500 border-red-500 scale-105"

                    : "bg-[#1f1f1f] border-gray-700 hover:border-red-500"
                }
              `}
            >
              {seat}
            </button>
          );
        })}
      </div>

      {/* sticky booking bar */}
      <div
        className="
          fixed
          bottom-0
          left-0
          w-full
          bg-[#111]
          border-t
          border-gray-800
          px-4
          md:px-10
          py-5
          z-50
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-5
          "
        >

          {/* seats */}
          <div>

            <h2
              className="
                text-lg
                font-bold
              "
            >
              Selected Seats
            </h2>

            <div
              className="
                flex
                flex-wrap
                gap-2
                mt-2
                max-w-3xl
              "
            >
              {selectedSeats.length >
              0 ? (

                selectedSeats.map(
                  (seat) => (
                    <span
                      key={seat}
                      className="
                        px-4
                        py-1
                        rounded-full
                        bg-red-500
                        text-sm
                        font-semibold
                      "
                    >
                      {seat}
                    </span>
                  )
                )

              ) : (

                <p
                  className="
                    text-gray-400
                    text-sm
                  "
                >
                  No seats selected
                </p>
              )}
            </div>
          </div>

          {/* total + button */}
          <div
            className="
              flex
              items-center
              gap-5
            "
          >

            <h2
              className="
                text-2xl
                font-black
              "
            >
              ₹
              {selectedSeats.length *
                (show?.price ||
                  0)}
            </h2>

            <button
              disabled={
                loading
              }

              onClick={
                handleBooking
              }

              className="
                px-8
                py-4
                rounded-2xl
                bg-red-500
                hover:bg-red-600
                font-bold
                text-lg
                transition-all
                duration-300
              "
            >
              {loading
                ? "Processing..."
                : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;