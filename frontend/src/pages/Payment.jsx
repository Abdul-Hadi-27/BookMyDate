import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

const Payment = () => {
  const [payments, setPayments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const user = useSelector(
    (state) => state.userReducer.users
  );

  // fetch payments
  const fetchPayments =
    async () => {
      try {
        const { data } =
          await axios.get(
            `http://localhost:3000/api/auth/payments/${user?.id}`
          );

        setPayments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (user?.id) {
      fetchPayments();
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
        Loading Payments...
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
          Payment History
        </h1>

        <p className="text-gray-400 mt-3">
          All your transactions
        </p>
      </div>

      {/* no payments */}
      {payments.length === 0 ? (
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
            No payments found
          </h2>
        </div>
      ) : (
        <div className="space-y-8">
          {payments.map(
            (payment) => {
              const booking =
                payment?.bookingId;

              const show =
                booking?.showId;

              const movie =
                show?.movieId;

              return (
                <div
                  key={payment?._id}
                  className="
                    bg-[#171717]
                    border
                    border-gray-800
                    rounded-3xl
                    overflow-hidden
                    flex
                    flex-col
                    md:flex-row
                  "
                >
                  {/* poster */}
                  <div
                    className="
                      md:w-62.5
                      h-62.5
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
                  <div
                    className="
                      flex-1
                      p-6
                    "
                  >
                    {/* movie */}
                    <h2
                      className="
                        text-3xl
                        font-black
                      "
                    >
                      {movie?.title}
                    </h2>

                    {/* ids */}
                    <div className="mt-5 space-y-2">
                      <p className="text-gray-400">
                        Order ID :
                        {" "}
                        {payment?.orderId}
                      </p>

                      <p className="text-gray-400">
                        Payment ID :
                        {" "}
                        {payment?.paymentId}
                      </p>
                    </div>

                    {/* seats */}
                    <div className="mt-5">
                      <h3 className="font-bold">
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

                    {/* payment info */}
                    <div
                      className="
                        mt-6
                        flex
                        flex-wrap
                        gap-5
                        items-center
                        justify-between
                      "
                    >
                      {/* amount */}
                      <h2
                        className="
                          text-3xl
                          font-black
                          text-red-400
                        "
                      >
                        ₹
                        {
                          payment?.price
                            ?.amount
                        }
                      </h2>

                      {/* status */}
                      <span
                        className={`
                          px-5
                          py-2
                          rounded-full
                          font-bold

                          ${
                            payment?.status ===
                            "COMPLETED"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        `}
                      >
                        {
                          payment?.status
                        }
                      </span>
                    </div>

                    {/* date */}
                    <p
                      className="
                        text-gray-500
                        mt-5
                      "
                    >
                      {new Date(
                        payment?.createdAt
                      ).toLocaleString()}
                    </p>
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

export default Payment;