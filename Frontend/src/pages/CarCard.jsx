import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { LuUsers } from "react-icons/lu";
import { PiCarProfileLight } from "react-icons/pi";
import { RiGasStationLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { CarContext } from "../context/Car.context";
function CarCard({ car }) {
  const { currency, navigate } = useContext(CarContext);

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
      }}
      key={car._id}
      className="shadow-md h-80 rounded-2xl overflow-hidden relative sm:max-md:m-20"
    >
      <img className="h-48 w-full object-cover" src={car.image} alt="car" />
      <div className="text-start p-4">
        <h1 className="text-lg font-medium">{car.brand + " " + car.model}</h1>
        <p className="text-sm font-light text-gray-500">
          <span>{car.category + "."}</span>
          {car.year}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-2 text-gray-500">
          <div className="text-sm flex items-center gap-2">
            <LuUsers />
            <p>{car.seating_capacity}</p>
          </div>
          <div className="text-sm flex items-center gap-2">
            <RiGasStationLine />
            <p>{car.fuel_type}</p>
          </div>
          <div className="text-sm flex items-center gap-2">
            <PiCarProfileLight />
            <p>{car.transmission}</p>
          </div>
          <div className="text-sm flex items-center gap-2">
            <IoLocationOutline />
            <p>{car.location}</p>
          </div>
        </div>
      </div>
      <div className="w-full whitespace-nowrap  h-full absolute top-2 left-2 text-xs flex items-center justify-between ">
        {car.isAvailable ? (
          <p className="bg-primary-dull text-light px-3 py-1 rounded-full">
            Available Now
          </p>
        ) : (
          <p className="bg-red-800 px-3 text-light py-1 rounded-full border-b-4 ">
            Not Available
          </p>
        )}
        <p className="bg-black px-3 py-2 rounded-full text-light font-bold">
          {currency}
          {car.pricePerDay}
          <span className="font-medium text-gray-300">/day</span>
        </p>
      </div>
    </div>
  );
}

export default CarCard;
