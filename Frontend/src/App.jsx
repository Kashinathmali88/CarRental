import Navbar from "./componets/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";
import Footer from "./componets/Footer";
import Layout from "./pages/owner/Layout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCar from "./pages/owner/ManageCar";
import ManageBookings from "./pages/owner/ManageBookings";
import Login from "./componets/Login";
import React, { useContext } from "react";
import { CarDetails } from "./pages/CarDetails";
import { useLocation, Route, Routes } from "react-router-dom";
import { CarContext } from "./context/Car.context";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  const { showLogin } = useContext(CarContext);

  return (
    <>
      <div
        className={`${
          location.pathname === "/" ? "bg-light" : "bg-white"
        }  border-b border-b-gray-400`}
      >
        <ToastContainer />
        {showLogin && <Login />}
        {!isOwnerPath && <Navbar />}{" "}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCar />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      <div className="container mx-auto min-h-64">
        <Footer />
      </div>
    </>
  );
}

export default App;
