import React, { useEffect, useState } from "react";
import Title from "../../componets/owner/Title";
import { useCarContext } from "../../context/Car.context";
import { FadeLoader } from "react-spinners";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const ManageBookings = () => {
  const { axios, toast, currency } = useCarContext();
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner", {
        withCredentials: true,
      });
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post(
        "/api/bookings/change-status",
        { bookingId, status },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  return bookings ? (
    <div className="sm:p-12 p-2">
      <Title
        title={"Manage Bookings"}
        subTitle={
          "Track all customer bookings, approve or cancel requests, and manage booking statuses"
        }
      />
      <div className="mt-4 border border-borderColor rounded-md">
        <div className="md:grid md:grid-cols-12 hidden  gap-10 ">
          <div className="col-span-4">
            <p className="text-sm text-gray-400 font-medium p-2">Car</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-400 font-medium p-2">Date Range</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-400 font-medium p-2">Total</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-400 font-medium p-2">Status</p>
          </div>
          <div className="col-span-2">
            <p className="text-sm text-gray-400 font-medium p-2">Actions</p>
          </div>
        </div>
        {bookings?.map((booking) => {
          return (
            <div
              key={booking._id}
              className="md:grid md:grid-cols-12 sm:max-md:flex sm:max-md:flex-col md:gap-10 border-t border-borderColor"
            >
              <div className="col-span-4 p-2 flex">
                <img
                  className="md:w-24 md:h-16 w-full max-h-38 rounded-sm object-cover"
                  src={booking.car.image}
                  alt=""
                />
              </div>

              <div className="col-span-2 flex flex-col justify-center ml-2">
                <p className="text-sm text-gray-500 ">
                  {new Date(booking.pickUpDate).toLocaleDateString("en-GB")}{" "}
                </p>
                <p className="text-sm text-gray-500 ">To</p>
                <p className="text-sm text-gray-500 ">
                  {new Date(booking.returnDate).toLocaleDateString("en-GB")}
                </p>
              </div>

              <div className="col-span-2 flex items-center ml-2">
                <p className="text-sm text-gray-500 ">
                  {currency + " "}
                  {booking.price}
                </p>
              </div>

              <div className="col-span-2 flex items-center ">
                <p
                  className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${
                    booking.status === "confirmed" ||
                    booking.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className="col-span-2 flex items-center p-4">
                {booking.status === "completed" ? (
                  <RiVerifiedBadgeFill className="text-2xl text-green-400/70 sm:w-8 sm:h-8" />
                ) : (
                  <select
                    onChange={(e) =>
                      changeBookingStatus(booking._id, e.target.value)
                    }
                    value={booking.status}
                    className="border text-gray-500 border-borderColor w-22 px-2 py-1"
                    name=""
                    id=""
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="container mx-auto flex justify-center items-center  min-h-[50vh]">
      <FadeLoader color="#2563eb" />
    </div>
  );
};

export default ManageBookings;
