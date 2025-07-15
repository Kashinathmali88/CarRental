import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets.js";
import { FaStar } from "react-icons/fa";

function Testimonials() {
  return (
    <div className="container mx-auto min-h-[400px] p-40 pt-24">
      <div className="text-4xl text-center">
        <Title
          text1={"What Our Customers Say"}
          text2={
            "Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
          }
        />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-1  gap-4 mt-8">
        <div className="w-auto sm:h-54 h-70 bg-white rounded-xl gap-10 p-6 hover:translate-y-1 shadow-lg transition-all duration-500 ">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full"
              src={assets.testimonial_image_1}
              alt=""
            />
            <div>
              <h1 className="text-xl">Emma Rodriguez</h1>
              <p className="text-gray-500">Barcelona, Spain</p>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-4">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <p className="text-gray-500 max-w-90 mt-4 font-light">
            "I've rented cars from various companies, but the experience with
            CarRental was exceptional."
          </p>
        </div>

        <div className="w-auto sm:h-54 h-70 bg-white rounded-xl gap-10 p-6 hover:translate-y-1 shadow-lg transition-all duration-500 ">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full"
              src={assets.testimonial_image_2}
              alt=""
            />
            <div>
              <h1 className="text-xl">Emma Rodriguez</h1>
              <p className="text-gray-500">Barcelona, Spain</p>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-4">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <p className="text-gray-500 max-w-90 mt-4 font-light">
            "I've rented cars from various companies, but the experience with
            CarRental was exceptional."
          </p>
        </div>

        <div className="w-auto sm:h-54 h-70 bg-white rounded-xl gap-10 p-6 hover:translate-y-1 shadow-lg transition-all duration-500 ">
          <div className="flex items-center gap-3">
            <img
              className="w-12 h-12 rounded-full"
              src={assets.testimonial_image_1}
              alt=""
            />
            <div>
              <h1 className="text-xl">Emma Rodriguez</h1>
              <p className="text-gray-500">Barcelona, Spain</p>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-4">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <p className="text-gray-500 max-w-90 mt-4 font-light">
            "I've rented cars from various companies, but the experience with
            CarRental was exceptional."
          </p>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
