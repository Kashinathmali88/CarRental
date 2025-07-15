import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import CarCard from "./CarCard";
import { useCarContext } from "../context/Car.context.jsx";
import { useSearchParams } from "react-router-dom";

const Cars = () => {
  const [searchparams] = useSearchParams();
  const location = searchparams.get("location");
  const pickupDate = searchparams.get("pickupDate");
  const returnDate = searchparams.get("returnDate");

  const [input, setInput] = useState("");
  const { cars, axios, toast, setCars } = useCarContext();
  const isSearchData = location && pickupDate && returnDate;
  const [filteredCars, setFilterCars] = useState([]);

  const applyFilter = async () => {
    if (input === "") {
      setFilterCars(cars);
      return null;
    }

    const filtered = cars.slice().filter((car) => {
      return (
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilterCars(filtered);
  };

  const fetchAvailableCars = async () => {
    try {
      const { data } = await axios.post(
        "/api/bookings/check-availability",
        {
          location,
          pickupDate,
          returnDate,
        },
        { withCredentials: true }
      );
      data.success ? setFilterCars(data.cars) : toast.error(data.message);
      if (data.cars.length === 0) {
        toast.error("No cars available");
      }
      return null;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    isSearchData && fetchAvailableCars();
  }, []);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-48 bg-light">
        <div>
          {" "}
          <h1 className="text-4xl font-medium text-center">Available Cars</h1>
          <p className="mt-2 text-gray-500 sm:text-sm text-xs text-center">
            Browse our selection of premium vehicles available for your next
            adventure
          </p>
        </div>

        <div className="flex items-center px-x mt-6 w-max-140 relative">
          <IoSearchOutline className="absolute left-2" />
          <input
            onChange={(e) => setInput(e.target.value)}
            className="sm:w-[450px] w-[350px]  pl-10 text-gray-500 outline-none bg-white py-2 rounded-2xl"
            type="text"
            name="searchInput"
            id="searchInput"
            placeholder="Search by make, model, or features"
          />
          <CiFilter className="absolute sm:left-104 left-80" />
        </div>
      </div>

      {/* all cars */}
      <section className="container mx-auto  min-h-screen mt-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
          {filteredCars.map((car) => {
            return <CarCard key={car._id} car={car} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default Cars;
