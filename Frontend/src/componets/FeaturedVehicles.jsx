import React from "react";
import Title from "../componets/Title.jsx";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import CarCard from "../pages/CarCard.jsx";
import { useCarContext } from "../context/Car.context.jsx";

function FeaturedVehicles() {
  const { navigate, cars } = useCarContext();

  return (
    <div className="container mx-auto min-h-screen text-4xl font-medium p-10 text-center">
      <Title
        text1={"Featured Vehicles"}
        text2={
          "Explore our selection of premium vehicles available for your next adventure."
        }
      />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
        {cars.slice(0, 6).map((car) => {
          return <CarCard key={car._id} car={car} />;
        })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            navigate("/cars");
            scrollTo(0, 0);
          }}
          className="flex justify-center items-center text-xs gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
        >
          Explore all cars
          <MdOutlineArrowRightAlt className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default FeaturedVehicles;
