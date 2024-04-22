"use client";

import React, { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/app/_context/User";
import toast from "react-hot-toast";
import SideBar from "@/components/common/NavBars/SideBar";
import TopBar from "@/components/common/NavBars/TopBar";
import BottomBar from "@/components/common/NavBars/BottomBar";
import NotificationModel from "@/components/layout/NotificationModel";
import SearchModel from "@/components/layout/SearchModel";
import {ImageLoading5} from "@/components/Loaders/Profile/ImageLoading"

export default function Provider({ children }) {
  // const sideNavBarSearchRef = useRef(null);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const pathname = usePathname();
  const router = useRouter();

  const isPublicPath = ["/login", "/register", "/forget-password"].includes(pathname);

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
          setUserDetails(null);
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
        <ImageLoading5 />
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
          !isPublicPath &&
          "ml-0 sm:ml-[--w-side-small] md:ml-[--w-side-md] lg:ml-[--w-side]"
        }`}
      >
        <div
          className={`${
            pathname.startsWith("/messages") || isPublicPath
              ? ""
              : "m-auto max-w-[935px] px-2 sm:px-5 pb-14"
          }`}
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
    </div>
  );
}
