import React from "react";
import NavbarOwner from "../../componets/owner/NavbarOwner";
import SideBar from "../../componets/owner/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
