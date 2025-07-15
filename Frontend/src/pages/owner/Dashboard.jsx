import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useCarContext } from "../../context/Car.context";
import Title from "../../componets/owner/Title";
export default function Dashboard() {
  const { currency, toast, axios } = useCarContext();

  const [dashboardData, setDashboardData] = useState({
    totalCars: 0,
    totalBookings: 0,
    totalPendingBookings: 0,
    totalCompleteBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    {
      title: "Total Cars",
      value: dashboardData.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending Bookings",
      value: dashboardData.totalPendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Completed Bookings",
      value: dashboardData.totalCompleteBookings,
      icon: assets.listIconColored,
    },
  ];

  const fetchDashbordData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard", {
        withCredentials: true,
      });
      data.success
        ? setDashboardData(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashbordData();
  }, []);
  return (
    <div className="p-12">
      <Title
        title={"Admin Dashbord"}
        subTitle={
          " Monitor overall platform performance including total cars, bookings,revenue, and recent activities"
        }
      />
      <div className="mt-7">
        <div className="w-full grid  md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
          {dashboardCards.map((card, index) => {
            return (
              <div
                key={index}
                className="bg-white shadow-sm border-borderColor border rounded-md flex justify-around items-center"
              >
                <div className="p-2">
                  <p className="text-gray-400 text-xs">{card.title}</p>
                  <h1 className="text-2xl">{card.value}</h1>
                </div>
                <img
                  className="w-8 h-8 bg-primary-dull/10 p-2 rounded-full"
                  src={card.icon}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        <div className="grid sm:grid-cols-6 grid-cols-1 gap-4 mt-4">
          <div className="col-span-4 shadow-sm border border-borderColor rounded-md p-4">
            <div>
              <h1 className="text-sm font-medium">Recent Bookings</h1>
              <p className="text-xs text-gray-400">Latest customer bookings</p>
            </div>
            {dashboardData.recentBookings?.map((booking, index) => {
              return (
                <div key={index} className="flex items-center gap-4 mt-2 ">
                  <img
                    className="w-8 h-8 bg-primary-dull/10 p-2 rounded-full"
                    src={assets.listIconColored}
                    alt=""
                  />
                  <div className="flex w-full justify-between items-center">
                    <div>
                      <h1 className="text-sm font-medium">
                        {booking.car.brand + " " + booking.car.category}
                      </h1>
                      <p className="text-xs text-gray-400">
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-gray-400">
                        {currency + " "}
                        {booking.price}
                      </p>
                      <p className="text-xs px-2 py-1 border border-borderColor rounded-full">
                        {booking.status}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="sm:col-span-2 col-span-1 shadow-sm border border-borderColor rounded-md p-4">
            <div className="flex flex-col justify-around">
              <h1 className="text-sm font-medium">Monthly Revenue</h1>
              <p className="text-xs text-gray-400">Revenue for current month</p>
            </div>
            <h1 className="mt-2 text-2xl text-primary font-semibold">
              {currency} {dashboardData.monthlyRevenue}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
