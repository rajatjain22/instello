"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import SideNavBar from "../SideNavBar/SideNavBar";
import SearchModel from "../NavModel/SearchModel";
import NotificationModel from "../NavModel/NotificationModel";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/_context/User";
import InitialLoader from "../Loaders/InitialLoading/InitialLoader";
import AOS from "aos";

export default function MainComponent({ children }) {
  const sideNavBarSearchRef = useRef(null);
  const { userDetails } = useContext(UserContext);
  const pathname = usePathname();
  const isPublicPath = pathname === "/login" || pathname === "/register";

  const [toggle, setToggle] = useState({
    search: false,
    notifications: false,
  });

  useEffect(() => {
    AOS.init();
  }, []);

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
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <InitialLoader />
      </div>
    );
  }

  return (
    <>
      <main className='flex min-h-screen'>
        {!isPublicPath ? (
          <div ref={sideNavBarSearchRef}>
            <SideNavBar handleToggle={handleToggle} />{" "}
          </div>
        ) : (
          ""
        )}
        <div className='w-full bg-body-color h-screen overflow-y-scroll relative'>
          <div className='main__inner'>{children}</div>
          {toggle.search && (
            <SearchModel
              sideNavBarSearchRef={sideNavBarSearchRef}
              onClose={onClose}
            />
          )}
          {toggle.notifications && (
            <NotificationModel
              sideNavBarSearchRef={sideNavBarSearchRef}
              onClose={onClose}
            />
          )}
        </div>
      </main>
    </>
  );
}
