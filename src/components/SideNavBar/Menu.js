"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

const menu = [
  {
    path: "/",
    icon: "d",
    lable: "Home",
  },
  {
    path: "/explore",
    icon: "d",
    lable: "Explore",
  },
  {
    path: "/messages",
    icon: "d",
    lable: "Messages",
  },
  {
    path: "/notifications",
    icon: "d",
    lable: "Notifications",
  },
  {
    path: "/profile",
    icon: "d",
    lable: "Profile",
  },
  // {
  //     path: "/more",
  //     icon: <MoreHorizOutlinedIcon sx={{ fontSize: "20px" }} />,
  //     lable: "More",
  // },
];

const Menu = ({ style = "" }) => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  return (
    <>
      {menu.map((item, idx) => {
        return (
          <Link
            key={idx}
            href={item.path}
            className={
              style +
              "flex justify-start items-center gap-2" +
              (pathname == item.path ? " text-tweet-blue" : "") +
              (item.path == "/messages" || item.path == "/notifications"
                ? " cursor-not-allowed "
                : "")
            }
            onClick={() => item.path === "#" && setShow(!show)}
          >
            {item.icon}
            <div
              className={
                "font-light text-lg" +
                (pathname == item.path ? " text-tweet-blue" : "")
              }
            >
              {item.lable}
              {show && item?.comp}
            </div>
          </Link>
        );
      })}
    </>
  );
  ``;
};

export default Menu;
