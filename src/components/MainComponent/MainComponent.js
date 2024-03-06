"use client";

import React, { Fragment, useContext, useRef, useState } from "react";
import SideNavBar from "../SideNavBar/SideNavBar";
import SearchModel from "../NavModel/SearchModel";
import NotificationModel from "../NavModel/NotificationModel";
import { usePathname } from "next/navigation";
import { UserContext } from "@/app/_context/User";
import InitialLoader from "../Loaders/InitialLoading/InitialLoader";
import RajatBar from "../SideNavBar/RajatBar";
// import NewSideBar from "../SideNavBar/newSideBar";

export default function MainComponent({ children }) {
  const sideNavBarSearchRef = useRef(null);
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
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <InitialLoader />
      </div>
    );
  }

  return (
    <div className="wrapper">
      {!isPublicPath ? (
        <Fragment ref={sideNavBarSearchRef}>
          {/* <NewSideBar /> */}
          <RajatBar />
          {/* <SideNavBar handleToggle={handleToggle} onClose={onClose} />{" "} */}
        </Fragment>
      ) : (
        ""
      )}
      <main>
        <div
          // 2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small]
          className={`w-full bg-body-color h-screen relative ${
            pathname.startsWith("/messages") ? "" : "overflow-y-scroll"
          }`}
        >
          <div
            className={`${
              pathname.startsWith("/messages") ? "" : "main__inner"
            }`}
          >
            {children}
          </div>
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
    </div>
  );
}
