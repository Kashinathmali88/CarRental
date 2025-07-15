import React from "react";
import Title from "./Title";
import { useCarContext } from "../context/Car.context";

function NewsLetterBox() {
  const { toast } = useCarContext();
  return (
    <div className="container mx-auto min-h-fit">
      <div className="text-4xl text-center">
        <Title
          text1={"Never Miss a Deal!"}
          text2={
            "Subscribe to get the latest offers, new arrivals, and exclusive discounts"
          }
        />
      </div>

      <div className="w-7/8 flex items-center justify-center mt-7 mx-auto">
        <input
          className="border border-gray-300 rounded-md h-10 border-r-0 outline-none  w-5/12 rounded-r-none px-3 text-gray-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          onClick={() => toast.success("Subscribe to car rental")}
          className="px-6 py-2 bg-primary hover:border-primary-dull text-light rounded-r-lg"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default NewsLetterBox;
