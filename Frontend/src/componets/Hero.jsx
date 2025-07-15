import React, { useState } from "react";
import { assets, cityList } from "../assets/assets.js";
import { IoSearchOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useCarContext } from "../context/Car.context.jsx";

function Hero() {
  const { register, handleSubmit, reset } = useForm();
  const [location, setLocation] = useState("");
  const { navigate } = useCarContext();
  const handelLocation = (e) => {
    setLocation(e.target.value);
  };
  const onSubmit = async (data) => {
    navigate(
      `/cars?location=${data.location}&pickupDate=${data.pickupDate}&returnDate=${data.returnDate}`
    );
  };
  return (
    <div>
      <section className="h-screen bg-light flex flex-col gap-24  items-center">
        <div className="mt-20">
          <h1 className="whitespace-nowrap lg:text-6xl text-4xl text-center font-semibold">
            Luxury cars on Rent
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-7/12 w-5/12 h-72 lg:h-20 md:h-24 pl-[10%] md:pl-0 bg-white md:rounded-full rounded-2xl shadow-xl flex lg:flex-row flex-col lg:justify-around justify-between gap-5 md:items-center "
        >
          <div className="flex flex-col md:flex-row  lg:justify-between sm:mt-5 gap-7 lg:items-center w-3/4 lg:pb-5">
            <div className="w-1/3 flex flex-col gap-1 justify-center lg:pl-10 ">
              <select
                value={location}
                {...register("location")}
                onChange={(e) => handelLocation(e)}
                className="w-24 cursor-pointer"
                name="location"
                id="location"
                required
              >
                {cityList.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <label
                className="whitespace-nowrap text-md text-gray-700"
                htmlFor="pickupLocation"
              >
                {location ? location : "Pickup Location"}
              </label>
            </div>
            <div className="w-1/3 flex flex-col gap-1">
              <label
                className="whitespace-nowrap text-md text-gray-700"
                htmlFor="pickupDate"
              >
                Pickup Data
              </label>
              <input
                {...register("pickupDate")}
                className="w-33 cursor-pointer"
                type="date"
                name="pickupDate"
                id="pickupDate"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="w-1/3 flex flex-col gap-1">
              <label
                className="whitespace-nowrap text-md text-gray-700"
                htmlFor="returndate"
              >
                Return Date
              </label>
              <input
                {...register("returnDate")}
                className="w-33 cursor-pointe"
                type="date"
                name="returnDate"
                id="returnDate"
                required
              />
            </div>
          </div>
          <div className="w-1/4">
            <button className="flex items-center justify-center gap-1 md:mt-8 md:px-9 md:py-3 mb-7 px-3 py-1 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer">
              <IoSearchOutline className="text-white text-lg" />
              Search
            </button>
          </div>
        </form>
        <div>
          <img src={assets.main_car} alt="" className="max-h-72" />
        </div>
      </section>
    </div>
  );
}

export default Hero;
