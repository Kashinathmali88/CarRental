import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { PiCarProfileLight } from "react-icons/pi";
import { RiGasStationLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { useCarContext } from "../context/Car.context";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FadeLoader } from "react-spinners";

export const CarDetails = () => {
  const { navigate, currency, cars, axios, toast } = useCarContext();
  const [car, setCar] = useState({});
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (booking) => {
    try {
      const { data } = await axios.post(
        "/api/bookings/create",
        {
          car: id,
          pickUpDate: booking.pickupDate,
          returnDate: booking.returnDate,
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setCar(cars.find((item) => item._id === id));
  }, [id, cars]);

  return car ? (
    <div className="container mx-auto  h-auto mt-16">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 flex items-center gap-2 mb-6 cursor-pointer"
      >
        <GoArrowLeft className="font-bold" />
        Back to cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12 gap-8">
        <div className="lg:col-span-2">
          <img
            className="w-full h-auto md:max-h-100 object-cover rounded-xl shadow-md mb-6"
            src={car?.image}
            alt=""
          />
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold">BMW X5</h1>
              <p className="text-gray-500 text-lg">SUV 2003</p>
            </div>
            <hr className="border-borderColor my-6" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col items-center bg-light p-4 rounded-lg">
                <LuUsers className="h-5 mb-2" />
                {car?.seating_capacity}
              </div>
              <div className="flex flex-col items-center bg-light p-4 rounded-lg">
                <RiGasStationLine className="h-5 mb-2" />
                {car?.fuel_type}
              </div>
              <div className="flex flex-col items-center bg-light p-4 rounded-lg">
                <PiCarProfileLight className="h-5 mb-2" />
                {car?.transmission}
              </div>
              <div className="flex flex-col items-center bg-light p-4 rounded-lg">
                <IoLocationOutline className="h-5 mb-2" />
                {car?.location}
              </div>
            </div>
            <div>
              <h1 className="text-lx mb-3 font-medium">Description</h1>
              <p className="text-gray-500">{car?.description}</p>
            </div>

            <div>
              <h1 className="text-lx mb-3 font-medium">Features</h1>
              <ul className="grid gird-col-1 sm:grid-cols-2">
                {[
                  "360 camera",
                  "GPS",
                  "Airbags",
                  "Power Steering",
                  "Cruise Control",
                  "Infotainment System",
                ].map((ft, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-500"
                    >
                      <GoShieldCheck className="h-4 text-primary-dull" />
                      {ft}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-md sticky top-18 max-h-[400px] rounded-xl p-6 text-gray-500 space-y-6"
        >
          <p className="flex justify-between items-center text-primary font-semibold text-2xl">
            {currency + " "}
            {car?.pricePerDay}
            <span className="text-gray-400 font-normal text-base">per day</span>
          </p>
          <hr className="border-borderColor my-6" />
          <div className="flex flex-col gap-2">
            <label htmlFor="pickupDate">Pickup Date</label>
            <input
              {...register("pickupDate")}
              min={new Date().toISOString().split("T")[0]}
              className="border-borderColor px-3 py-2 rounded-lg border"
              type="date"
              name="pickupDate"
              id="pickupDate"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="returnDate">Return Date</label>
            <input
              {...register("returnDate")}
              className="border-borderColor px-3 py-2 rounded-lg border"
              type="date"
              name="returnDate"
              id="returnDate"
            />
          </div>
          <button className="font-medium w-full bg-primary hover:bg-primary-dull transition-all py-3 text-white rounded-xl cursor-pointer">
            Book Now{" "}
          </button>
          <p className="text-center text-sm">
            No credit card requird for reservetion
          </p>
        </form>
      </div>
    </div>
  ) : (
    <div className="container mx-auto flex justify-center items-center  min-h-[50vh]">
      <FadeLoader color="#2563eb" />
    </div>
  );
};
