"use client";

import { UserContext } from "@/app/_context/User";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";

export default function BottomBar({
  setbottomref,
  handleToggle,
  onClose,
  handleLogout,
}) {
  const { userDetails } = useContext(UserContext);
  const sideRef = useRef(null);

  const menu = [
    {
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212"
          ></path>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M480 256 266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"
          ></path>
        </svg>
      ),
      label: "Home",
      path: "/",
      onClick: onClose,
    },
    {
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path>
        </svg>
      ),
      label: "Search",
      path: "#",
      onClick: () => handleToggle("search"),
    },
    {
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
          ></path>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M256 176v160m80-80H176"
          ></path>
        </svg>
      ),
      label: "Create",
      path: "#",
      onClick: onClose,
    },
    {
      icon: (
        <div className="relative w-6 h-6">
          <Image
            src={userDetails.avatar}
            className="rounded-full"
            alt="profile"
            fill={true}
          />
        </div>
      ),
      label: "Profile",
      path: `/profile/${userDetails._id}`,
      onClick: onClose,
    },
    {
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="text-2xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40m64 160 80-80-80-80m-192 80h256"
          ></path>
        </svg>
      ),
      label: "Logout",
      path: `#`,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    if (sideRef.current) {
      setbottomref(sideRef);
    }
  }, [sideRef, setbottomref]);

  return (
    <div
      ref={sideRef}
      className="flex sm:hidden justify-between gap-2 h-14 fixed w-full bottom-0 bg-white z-20 p-2 border-t shadow-lg"
    >
      {menu.map((e, index) => (
        <Link
          key={index}
          href={e.path}
          className="flex items-center"
          onClick={e.onClick}
        >
          <span>{e.icon}</span>
          <span className="hidden md:block">{e.label}</span>
        </Link>
      ))}
    </div>
  );
}
