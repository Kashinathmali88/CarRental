import React, { useState } from "react";
import { assets, cityList } from "../../assets/assets";
import { useForm } from "react-hook-form";
import Title from "../../componets/owner/Title";
import { IoIosCheckmark } from "react-icons/io";
import { useCarContext } from "../../context/Car.context";

function AddCar() {
  const [image, setImage] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { axios, toast } = useCarContext();
  const [isloading, setISLoading] = useState(false);

  const onSubmit = async (data) => {
    if (isloading) return null;
    setISLoading(true);

    const formData = new FormData();
    formData.append("carData", JSON.stringify(data));
    formData.append("image", image);

    try {
      const { data } = await axios.post("/api/owner/add-car", formData, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        reset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setISLoading(false);
    }
  };
  return (
    <div className="sm:p-12 p-4 flex-1">
      <Title
        title={"Add New car"}
        subTitle={
          " Fill in details to list a new car for booking, including pricing,availability, and car specifications."
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 flex items-center gap-2">
          <label htmlFor="car-image">
            <img
              className="h-14 border-dashed cursor-pointer rounded-md  border-borderColor"
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
            />
            <input
              type="file"
              name="car-image"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </label>
          <p className="text-sm font-medium text-gray-400">
            Upload a picture of your car.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-4 max-w-[70%]">
          <div className="">
            <label className="text-sm text-gray-700" htmlFor="brand">
              Brand
            </label>
            <input
              {...register("brand")}
              className="px-2 py-2 w-full border border-borderColor rounded-md placeholder-gray-400"
              type="text"
              name="brand"
              id="brand"
              placeholder="eg. BMW,Audi..."
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700" htmlFor="model">
              Model
            </label>
            <input
              {...register("model")}
              className="px-2 py-2 w-full border border-borderColor rounded-md placeholder-gray-400 placeholder-xs"
              type="text"
              name="model"
              id="model"
              placeholder="eg. XS,E-class,M4..."
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mt-4 max-w-[70%]">
          <div>
            <label className="text-sm text-gray-700" htmlFor="year">
              Year
            </label>
            <input
              {...register("year")}
              className="px-2 py-2 w-full border border-borderColor rounded-md placeholder-gray-400"
              type="number"
              name="year"
              id="year"
              placeholder="2025"
              required
            />
          </div>

          <div>
            <label
              className="text-sm whitespace-nowrap text-gray-700"
              htmlFor="dailyPrice"
            >
              Daily Price ($)
            </label>
            <input
              {...register("pricePerDay")}
              className="px-2 py-2 w-full border border-borderColor rounded-md placeholder-gray-400 placeholder-xs"
              type="number"
              name="pricePerDay"
              id="pricePerDay"
              placeholder="$25"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-700" htmlFor="category">
              Category
            </label>
            <select
              {...register("category")}
              className="px-2 py-2 w-full border text-gray-400 border-borderColor rounded-md  placeholder-xs"
              name="category"
              id="category"
              required
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-700" htmlFor="transmission">
              Transmission
            </label>
            <select
              {...register("transmission")}
              className="px-2 py-2 w-full border text-gray-400 border-borderColor rounded-md  placeholder-xs"
              name="transmission"
              id="transmission"
              required
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div>
            <label
              className="text-sm whitespace-nowrap text-gray-700"
              htmlFor="fuelType"
            >
              Fuel Type
            </label>
            <select
              {...register("fuel_type")}
              className="px-2 py-2 w-full border text-gray-400 border-borderColor rounded-md  placeholder-xs"
              name="fuel_type"
              id="fuel_type"
              required
            >
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label
              className="text-sm whitespace-nowrap text-gray-700"
              htmlFor="seatingCapacity"
            >
              Seating Capacity
            </label>
            <input
              {...register("seating_capacity")}
              className="px-2 py-2 w-full border border-borderColor rounded-md placeholder-gray-400 placeholder-xs"
              type="number"
              name="seating_capacity"
              id="seating_capacity"
              placeholder="5"
              required
            />
          </div>

          <div className="sm:col-span-3 col-span-1">
            <label className="text-sm text-gray-700" htmlFor="location">
              Location
            </label>
            <select
              {...register("location")}
              className="px-2 py-2 w-full border text-gray-400 border-borderColor rounded-md  placeholder-xs"
              name="location"
              id="location"
              required
            >
              <option value="">Select a location</option>
              {cityList.map((city, index) => {
                return (
                  <option key={index} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="sm:col-span-3 col-span-1">
            <label className="text-sm text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              {...register("description")}
              className="px-2 py-2 w-full border border-borderColor rounded-md placeholder-gray-400"
              rows={5}
              name="description"
              id="description"
              placeholder="Describe your car, its condition, and any notable details..."
              required
            />
          </div>
        </div>

        <button className="flex items-center px-4 py-2 rounded-md bg-primary hover:bg-primary-dull text-light mt-4 cursor-pointer shadow-sm hover:shadow-lg">
          <IoIosCheckmark className="text-3xl" />
          {isloading ? "Listing..." : "List Your Car"}
        </button>
      </form>
    </div>
  );
}

export default AddCar;
