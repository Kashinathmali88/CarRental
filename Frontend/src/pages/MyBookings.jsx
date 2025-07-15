import React, { useEffect, useState } from "react";
import Title from "../componets/Title";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useCarContext } from "../context/Car.context";

const MyBookings = () => {
  const { axios, toast, currency } = useCarContext();
  const [bookings, setBookings] = useState([]);
  const fetchBooings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        withCredentials: true,
      });
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchBooings();
  }, []);
  return (
    <div className="container mx-auto min-h-screen">
      <div className="pt-16 pl-5 mb-7">
        <Title
          text1={"My Bookings"}
          text2={"View and manage your all car bookings"}
        />
      </div>
      <div>
        {bookings.map((booking, index) => {
          return (
            <div
              key={index}
              className="pb-5 grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-1 bg-white border border-borderColor shadow-sm rounded-lg mt-5"
            >
              <div className="col-span-3 pt-4 pl-4 ">
                <img
                  className="h-36 w-65 sm:w-full rounded-xl object-cover"
                  src={booking.car.image}
                  alt=""
                />
                <div>
                  <h1 className="mt-2">
                    {booking.car.brand + " " + booking.car.model}
                  </h1>
                  <div className="flex gap-2">
                    <span className="text-gray-500 text-sm font-medium">
                      {booking.car.year}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                      {booking.car.category}
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                      {booking.car.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-3 ml-5">
                <div className="flex gap-5 mt-4">
                  <span className="bg-gray-400/20 text-xs px-2 py-1 rounded-md">
                    Booking #1
                  </span>
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
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <CiCalendar className="text-primary" />
                    <p className="text-sm text-gray-500">Rented period</p>
                  </div>
                  <span className="text-xs text-black ml-5">
                    {new Date(booking.pickUpDate).toLocaleDateString("en-GB")}
                  </span>
                  -
                  <span className="text-xs text-black">
                    {new Date(booking.returnDate).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-primary" />
                    <p className="text-sm text-gray-500">Pick-up Location</p>
                  </div>
                  <span className="text-xs text-black ml-5">Shop No 456</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <IoLocationOutline className="text-primary" />
                    <p className="text-sm text-gray-500">Return Location</p>
                  </div>
                  <span className="text-xs text-black ml-5">Shop No 222</span>
                </div>
              </div>
              <div className="col-span-6 flex justify-end sm:max-lg:mb-5">
                <div className="mt-2 mr-4">
                  <p className="text-xs text-gray-500">Total Price</p>
                  <h1 className="text-xl text-primary font-medium">
                    {currency + " "}
                    {booking.price}
                  </h1>
                  <p className="text-xs text-gray-500">
                    Booked on{" "}
                    <span className="text-xs text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
