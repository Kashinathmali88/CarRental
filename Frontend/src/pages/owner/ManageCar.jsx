import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../componets/owner/Title";
import { useCarContext } from "../../context/Car.context";
const ManageCar = () => {
  const [cars, setCars] = useState([]);
  const { axios, currency, toast } = useCarContext();

  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/get-cars", {
        withCredentials: true,
      });
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleCarStatus = async (carId) => {
    try {
      const { data } = await axios.post(
        "/api/owner/toggle-car",
        { carId },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const deleteCars = async (carId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this car?"
      );
      if (!confirm) return null;
      const { data } = await axios.post(
        "/api/owner/delete-car",
        { carId },
        { withCredentials: true }
      );
      if (data.success) {
        fetchCars();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <div className="sm:p-12 p-2">
      <Title
        title={"Manage Cars"}
        subTitle={
          "View all listed cars, update their details, or remove them from thebooking platform"
        }
      />

      <div className="mt-4 border border-borderColor rounded-md">
        <div className="sm:grid sm:grid-cols-13  hidden sm:gap-10 gap-4 ">
          <div className="sm:col-span-5 col-span-1">
            <p className="text-sm text-gray-400 font-medium p-2">Car</p>
          </div>
          <div className="sm:col-span-2 col-span-1">
            <p className="text-sm text-gray-400 font-medium p-2">Category</p>
          </div>
          <div className="sm:col-span-2 col-span-1">
            <p className="text-sm text-gray-400 font-medium p-2">Price</p>
          </div>
          <div className="sm:col-span-2 col-span-1 ">
            <p className="text-sm text-gray-400 font-medium p-2">Status</p>
          </div>
          <div className="sm:col-span-2 col-span-1">
            <p className="text-sm text-gray-400 font-medium p-2">Actions</p>
          </div>
        </div>
        {cars.map((car) => {
          return (
            <div
              key={car._id}
              className="sm:grid sm:grid-cols-13 sm:gap-10 md:gap-4 sm:max-md:flex sm:max-md:flex-col  border-t border-borderColor"
            >
              <div className="md:col-span-5 p-2  sm:max-md:flex sm:max-md:flex-col  gap-2">
                <img
                  className="md:w-36 md:h-16 w-full max-h-38 rounded-sm object-cover"
                  src={car.image}
                  alt=""
                />
                <div>
                  <h1 className="md:text-sm text-lg text-gray-700">
                    {car.brand + " " + car.model}
                  </h1>
                  <p className="md:text-xs text-sm text-gray-500 whitespace-nowrap">
                    {car.seating_capacity + " Seats." + car.transmission}
                  </p>
                </div>
              </div>
              <div className="col-span-2 flex items-center ml-2">
                <p className="text-sm text-gray-500 ">{car.category}</p>
              </div>
              <div className="col-span-2 flex items-center ml-2">
                <p className="text-sm text-gray-500 ">
                  {currency + " "}
                  {car.pricePerDay}
                </p>
              </div>
              <div className="col-span-2 flex items-center md:justify-center">
                {car.isAvailable ? (
                  <p className="text-xs font-medium  px-4 py-1 rounded-full bg-green-400/20 text-green-600">
                    Available
                  </p>
                ) : (
                  <p className="text-xs font-medium px-4 py-1 rounded-full bg-red-400/20 text-red-600">
                    Not Available
                  </p>
                )}
              </div>
              <div className="col-span-2 flex md:flex-row sm:max-md:flex-col flex-row">
                <img
                  onClick={() => toggleCarStatus(car._id)}
                  className="w-10"
                  src={
                    car.isAvailable ? assets.eye_icon : assets.eye_close_icon
                  }
                  alt=""
                />

                <img
                  onClick={() => deleteCars(car._id)}
                  className="w-10"
                  src={assets.delete_icon}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageCar;
