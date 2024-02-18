"use client";

import React, { useContext, useState } from "react";
import SideNav from "../SideNavBar/SideNavBar";
import SearchModel from "../Search/SearchModel";
import NotificationModel from "../Search/NotificationModel";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/_context/User";

export default function MainComponent({ children }) {
  const { userDetails } = useContext(UserContext);
  const pathname = usePathname();
  const isPublicPath = pathname === "/login" || pathname === "/register";

  const [toggle, setToggle] = useState({
    search: false,
    notifications: false,
  });

  const handleToggle = (key) => {
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
    return <div>Loading...</div>;
  }
  return (
    <>
      <main className="flex min-h-screen">
        {!isPublicPath ? <SideNav handleToggle={handleToggle} /> : ""}
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
