"use client";

import React, { useContext, useRef, useState } from "react";
import SearchModel from "../NavModel/SearchModel";
import NotificationModel from "../NavModel/NotificationModel";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/app/_context/User";
import InitialLoader from "../Loaders/InitialLoading/InitialLoader";
import toast from "react-hot-toast";
import TopBar from "../NavBar/TopBar";
import BottomBar from "../NavBar/BottomBar";
import SideBar from "../NavBar/SideBar";

export default function MainComponent({ children }) {
  // const sideNavBarSearchRef = useRef(null);
  const { userDetails } = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();

  const isPublicPath = pathname === "/login" || pathname === "/register";

  const [sideref, setSideref] = useState(null);
  const [topref, settopref] = useState(null);
  const [bottomref, setbottomref] = useState(null);

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

  const handleLogout = () => {
    fetch("/api/users/logout")
      .then((res) => res.json())
      .then((res) => {
        if (res?.message) {
          router.push("/login");
          toast.success("Logout Successfull");
        } else {
          throw new Error("Logout Failed");
        }
      })
      .catch((error) => {
        console.log("logout failed", error.message);
        toast.error("Logout Failed");
      });
  };

  if (!userDetails && !isPublicPath) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <InitialLoader />
      </div>
    );
  }

  return (
    <div className="wrapper relative">
      {!isPublicPath && (
        <>
          <SideBar
            setSideref={setSideref}
            handleToggle={handleToggle}
            onClose={onClose}
            handleLogout={handleLogout}
          />
          {!pathname.startsWith("/messages") && (
            <TopBar
              settopref={settopref}
              handleToggle={handleToggle}
              onClose={onClose}
            />
          )}
        </>
      )}

      <main
        className={`${
          !isPublicPath
            &&  "ml-0 sm:ml-[--w-side-small] md:ml-[--w-side-md] lg:ml-[--w-side]"
        }`}
      >
        <div
          className={`${pathname.startsWith("/messages") || isPublicPath ? "" : "m-auto max-w-[935px] px-2 sm:px-5 pb-10"}`}
        >
          {children}
        </div>
      </main>

      {!isPublicPath && !pathname.startsWith("/messages") && (
        <BottomBar
          setbottomref={setbottomref}
          handleToggle={handleToggle}
          onClose={onClose}
          handleLogout={handleLogout}
        />
      )}

      {toggle.search && (
        <SearchModel
          sideref={sideref}
          topref={topref}
          bottomref={bottomref}
          onClose={onClose}
        />
      )}
      {toggle.notifications && (
        <NotificationModel
          sideref={sideref}
          topref={topref}
          bottomref={bottomref}
          onClose={onClose}
        />
      )}

      {/* <main className='flex min-h-screen'>
        {!isPublicPath ? (
          <div ref={sideNavBarSearchRef}>
            <SideNavBar handleToggle={handleToggle} onClose={onClose} />{" "}
          </div>
        ) : (
          ""
        )}
        <div
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
      </main> */}
    </div>
  );
}
