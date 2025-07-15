import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useCarContext } from "../context/Car.context.jsx";

function Navbar() {
  const [open, setOpen] = useState(false);
  const {
    navigate,
    setShowLogin,
    isLoggedIn,
    isOwner,
    setIsOwner,
    axios,
    toast,
    logoutUser,
  } = useCarContext();

  const changeRole = async () => {
    try {
      const { data } = await axios.post(
        "/api/owner/change-role",
        {},
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggelMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4 mx-auto container">
        <Link to={"/"}>
          <img src={assets.logo} alt="" className="h-8" />
        </Link>

        <div className="nav hidden md:flex justify-end gap-2 w-full">
          <div className="hidden md:flex gap-2 text-gray-500 items-center">
            {menuLinks.map((item, index) => {
              return (
                <NavLink
                  className={"whitespace-nowrap px-2 py-1"}
                  key={index}
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              );
            })}

            <button
              className="border border-borderColor px-2 py-1 rounded-2xl"
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            >
              {isOwner ? "Dashbord" : "List cars"}
            </button>
            <div className=" flex items-center relative">
              <input
                type="text"
                className="hidden outline-primary lg:block border border-borderColor placeholder-gray-500 px-4 py-1 rounded-2xl"
                placeholder="Search cars"
              />
              <IoSearchOutline className="hidden lg:block absolute left-54" />
            </div>
          </div>
        </div>

        <div className="ml-7 flex gap-2 items-center">
          <button
            onClick={() => (isLoggedIn ? logoutUser() : setShowLogin(true))}
            className="sm:block px-6 py-2 bg-primary text-light rounded-xl cursor-pointer"
          >
            {isLoggedIn ? "LogOut" : "Login"}
          </button>

          {open ? (
            <IoCloseOutline
              onClick={toggelMenu}
              className="md:hidden w-7 h-7 cursor-pointer"
            />
          ) : (
            <HiMenuAlt3
              onClick={toggelMenu}
              className="md:hidden w-7 h-7 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* menu for small screen */}
      <div
        className={`fixed md:hidden top-20 right-0 h-screen w-full  bg-white shadow-lg z-30 transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {menuLinks.map((item, index) => {
            return (
              <Link
                key={index}
                className="flex flex-col px-4 py-2 border-b border-b-borderColor"
                to={item.path}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="w-full px-4 py-2 border-b border-b-borderColor">
            <Link to={"/owner"} onClick={() => setOpen(false)}>
              Dashbord
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
