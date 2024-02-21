"use client";

import React, { useContext, useState } from "react";
import SideNavBar from "../SideNavBar/SideNavBar";
import SearchModel from "../NavModel/SearchModel";
import NotificationModel from "../NavModel/NotificationModel";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/_context/User";
import InitialLoader from "../Loaders/InitialLoading/InitialLoader";

export default function MainComponent({ children }) {
  const { userDetails } = useContext(UserContext);
  const pathname = usePathname();
  const isPublicPath = pathname === "/login" || pathname === "/register";

  const [toggle, setToggle] = useState({
    search: false,
    notifications: false,
  });

  const handleToggle = (key) => {
    console.log(key);
    setToggle((prevToggle) => ({
      ...prevToggle,
      [key]: !prevToggle[key],
      [key === "search" ? "notifications" : "search"]: false,
    }));
  };

  const onClose = () => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      search: false,
      notifications: false,
    }));
  };

  if (!userDetails && !isPublicPath) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <InitialLoader />
      </div>
    );
  }
  return (
    <>
      <main className="flex min-h-screen">
        {!isPublicPath ? <SideNavBar handleToggle={handleToggle} /> : ""}
        <div className="w-full bg-body-color h-screen overflow-y-scroll relative">
          <div className="main__inner">{children}</div>
          {toggle.search && (
            <SearchModel onClose={onClose} setToggle={setToggle} />
          )}
          {toggle.notifications && (
            <NotificationModel onClose={onClose} setToggle={setToggle} />
          )}
        </div>
      </main>
    </>
  );
}
