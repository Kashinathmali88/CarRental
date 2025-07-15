import React from "react";
import { assets } from "../assets/assets.js";
function Banner() {
  return (
    <div className="container mx-auto lg:h-54 md:h-64 sm:bg-gradient-to-r  sm:from-primary sm:to-light bg-gradient-to-b from-primary to-light  rounded-2xl flex sm:flex-row flex-col justify-between">
      <div className="w-1/2 sm:p-10 p-6 text-white">
        <h1 className="text-3xl font-medium whitespace-nowrap">
          Do You Own a Luxury Car?
        </h1>
        <p className="sm:mt-2 whitespace-nowrap">
          Monetize your vehicle effortlessly by listing it on CarRental.
        </p>
        <p className="sm:max-w-130 whitespace-nowrap">
          We take care of insurance, driver verification and secure payments —
          so you can earn passive income, stress-free.
        </p>
        <button className="whitespace-nowrap px-6 py-2 bg-light text-primary rounded-lg mt-2">
          List your car
        </button>
      </div>
      <img
        className="sm:max-h-45  h-50 pt-10 lg:mt-10 md:mt-20 sm:mt-24"
        src={assets.banner_car_image}
        alt="Banner"
      />
    </div>
  );
}

export default Banner;
