"use client";

import { GoHomeFill } from "react-icons/go";
import { IoIosSearch, IoMdLogOut } from "react-icons/io";
import {
  MdOutlineExplore,
  MdOutlineSlowMotionVideo,
  MdAddCircleOutline,
} from "react-icons/md";
import { RiMessengerLine, RiMessengerFill } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { SiThreads } from "react-icons/si";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FaDivide, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { UserContext } from "@/app/context/User";

function MainComp({ handleToggle }) {
  const { userDetails } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    fetch("/api/users/logout")
      .then((res) => res.json())
      .then((res) => {
        if (res?.message) {
          toast.success("Logout Successfull");
          router.push("/");
        } else {
          throw new Error("Logout Failed");
        }
      })
      .catch((error) => {
        console.log("logout failed", error.message);
        toast.error("Logout Failed");
      });
  };

  return (
    <>
      <div className="boock sm:hidden fixed top-0 left-0 z-40 max-md:top-auto max-md:bottom-0">
        <div class="flex justify-between h-20 px-2 max-md:fixed max-md:top-0 max-md:w-full max-md:bg-white/80 max-md:left-0 max-md:px-4 max-md:h-14 max-md:shadow-sm max-md:dark:bg-slate-900/80 backdrop-blur-xl">
          <Link href="/" class="flex items-center gap-3">
            <img
              id="logo__icon"
              src="https://demo.foxthemes.net/instello/assets/images/logo.svg"
              alt=""
              class="w-24 text-2xl max-xl:!block shrink-0 uk-animation-scale-up"
            />
          </Link>

          <div className="flex gap-5">
            <Link
              href={"#"}
              className="relative text-base flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg"
              onClick={(e) => handleToggle("notifications")}
            >
              <FiHeart className="text-2xl" />
            </Link>
            <Link
              href={"#"}
              className="relative text-base flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg"
            >
              <RiMessengerLine className="text-2xl" />
            </Link>
          </div>
        </div>

        <nav class="flex-1 max-md:flex max-md:justify-around md:space-y-2 w-full fixed bg-white -bottom-0.5 h-14  items-center">
          <Link href="/">
            <GoHomeFill className="text-2xl" />
          </Link>
          <Link href="#" onClick={(e) => handleToggle("search")}>
            <IoIosSearch className="text-2xl" />
          </Link>
          <Link href="#" class="">
            <MdOutlineExplore className="text-2xl" />
          </Link>
          <Link href="#">
            <MdOutlineSlowMotionVideo className="text-2xl" />
          </Link>

          <Link href={`/profile/${userDetails?._id}`}>
            <CgProfile className="text-2xl" />
          </Link>
          <Link href={"#"} onClick={handleLogout}>
            <IoMdLogOut className="text-2xl" />
          </Link>
        </nav>
      </div>

      <div
        className={`hidden sm:flex flex-col min-w-24 lg:min-w-48 max-w-20 lg:max-w-64 border border-r-stone-200 h-screen overflow-hidden px-5 font-medium`}
      >
        <div className="w-full hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg">
          <div className=" italic font-semibold p-5 flex justify-center">
            <FaInstagram className={`lg:hidden text-3xl`} />
            <span className={`hidden lg:block`}>
              <Image
                src="https://demo.foxthemes.net/instello/assets/images/logo.svg"
                alt="Icon"
                width={100}
                height={100}
              />
            </span>
          </div>
        </div>
        <div className="w-full">
          {[
            {
              icon: <GoHomeFill className="text-2xl" />,
              label: "Home",
              path: "/",
            },
            {
              icon: <IoIosSearch className="text-2xl" />,
              label: "Search",
              path: "#",
              onclick: handleToggle,
            },
            {
              icon: <MdOutlineExplore className="text-2xl" />,
              label: "Explore",
              path: "#",
            },
            {
              icon: <MdOutlineSlowMotionVideo className="text-2xl" />,
              label: "Reels",
              path: "#",
            },
            {
              icon: <RiMessengerLine className="text-2xl" />,
              label: "Messages",
              path: "#",
            },
            {
              icon: <FiHeart className="text-2xl" />,
              label: "Notifications",
              path: "#",
              onclick: handleToggle,
            },
            {
              icon: <MdAddCircleOutline className="text-2xl" />,
              label: "Create",
              path: "#",
            },
            {
              icon: <CgProfile className="text-2xl" />,
              label: "Profile",
              path: `/profile/${userDetails?._id}`,
            },
          ].map((item, index) => {
            return (
              <Link
                key={index}
                href={item.path}
                className="relative text-base flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg"
                onClick={(e) =>
                  item.onclick && item?.onclick(item.label.toLowerCase())
                }
              >
                {item.icon}
                {/* <div class="w-2 h-2 bg-red-600 rounded-full absolute left-7 top-2.5"></div> */}

                <span className="p-2 hidden lg:block">{item.label}</span>
                {item.label === "Messages" && (
                  <span className="absolute border rounded-full bg-[red] text-white w-4 h-4 flex justify-center items-center text-xs top-1 left-10 lg:top-3 lg:left-5">
                    9
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        <div className="w-full h-full flex flex-col justify-end">
          <button className="text-base flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg">
            <SiThreads className="text-2xl" />
            <span className="p-2 hidden lg:block">Threads</span>
          </button>

          <button
            onClick={handleLogout}
            className="text-base flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg"
          >
            <IoReorderThreeOutline className="text-2xl" />
            <span className="p-2 hidden lg:block">Logout</span>
          </button>
        </div>
      </div>
      
    </>
  );
}

export default MainComp;
