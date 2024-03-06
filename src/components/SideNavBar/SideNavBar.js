"use client";
import {
  IoHome,
  IoSearch,
  IoLogOutOutline,
  IoVideocamOutline,
  IoAddCircleOutline,
  IoHeartOutline,
} from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "@/app/_context/User";

function SideNavBar({ handleToggle, onClose }) {
  const pathname = usePathname();
  const { userDetails } = useContext(UserContext);
  const router = useRouter();

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

  return (
    <>
      <div className='boock sm:hidden fixed top-0 left-0 z-40 max-md:top-auto max-md:bottom-0'>
        <div
          className={`${
            pathname.startsWith("/messages") ? "hidden" : ""
          } md:hidden flex justify-between h-20 px-2 max-md:fixed max-md:top-0 max-md:w-full max-md:bg-white/80 max-md:left-0 max-md:px-4 max-md:h-14 max-md:shadow-sm max-md:dark:bg-slate-900/80 backdrop-blur-xl`}
        >
          <Link
            href='/'
            className='relative selection:flex items-center gap-3 w-24 text-2xl max-xl:!block shrink-0 uk-animation-scale-up'
            onClick={onClose}
          >
            <Image
              id='logo__icon'
              src='/logo.svg'
              alt='Logo'
              fill={true}
              loading='lazy'
              sizes='(max-width: 640px) 100vw, 50vw'
            />
          </Link>

          <div className='flex gap-5'>
            <Link
              href={"#"}
              className='relative text-base flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg'
              onClick={(e) => handleToggle("notifications")}
            >
              <IoHeartOutline className='text-2xl' />
            </Link>
            <Link
              href={"/messages"}
              className='relative text-base flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg'
              onClick={onClose}
            >
              {/* <RiMessengerLine className="text-2xl" /> */}
            </Link>
          </div>
        </div>

        <nav className='flex-1 max-md:flex max-md:justify-around md:space-y-2 w-full fixed bg-white -bottom-0.5 h-14  items-center'>
          <Link href='/' onClick={onClose}>
            <IoHome className='text-2xl' />
          </Link>
          <Link href='#' onClick={(e) => handleToggle("search")}>
            <IoSearch className='text-2xl' />
          </Link>
          <Link href='#' className='' onClick={onClose}>
            <svg
              id='icon__outline'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              className='text-2xl'
              viewBox='0 0 16 16'
            >
              <path d='M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'></path>
              <path d='m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z'></path>
            </svg>
          </Link>
          <Link href='#' onClick={onClose}>
            <IoVideocamOutline className='text-2xl' />
          </Link>

          <Link href={`/profile/${userDetails?._id}`} onClick={onClose}>
            {/* <CgProfile className="text-2xl" /> */}
          </Link>
          <Link href={"#"} onClick={handleLogout}>
            <IoLogOutOutline className='text-2xl' />
          </Link>
        </nav>
      </div>

      <div
        className={`hidden sm:flex flex-col min-w-24 lg:min-w-48 max-w-20 lg:max-w-64 border border-r-stone-200 h-screen overflow-hidden px-5 font-medium`}
      >
        <div className='w-full hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg'>
          <div className=' italic font-semibold p-5 flex justify-center'>
            {/* <FaInstagram className={`lg:hidden text-3xl`} /> */}
            <span className={`hidden lg:block`}>
              <Image src='/logo.svg' alt='Icon' width={100} height={100} />
            </span>
          </div>
        </div>
        <div className='w-full'>
          {[
            {
              icon: <IoHome className='text-2xl' />,
              label: "Home",
              path: "/",
              onclick: onClose,
            },
            {
              icon: <IoSearch className='text-2xl' />,
              label: "Search",
              path: "#",
              onclick: handleToggle,
            },
            {
              icon: (
                <svg
                  id='icon__outline'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='w-6'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'></path>
                  <path d='m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z'></path>
                </svg>
              ),
              label: "Explore",
              path: "#",
              onclick: onClose,
            },
            {
              icon: <IoVideocamOutline className='text-2xl' />,
              label: "Reels",
              path: "#",
              onclick: onClose,
            },
            {
              icon: (
                <svg
                  className='w-6'
                  id='icon__outline'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                  ></path>
                </svg>
              ),
              label: "Messages",
              path: "/messages",
              onclick: onClose,
            },
            {
              icon: <IoHeartOutline className='text-2xl' />,
              label: "Notifications",
              path: "#",
              onclick: handleToggle,
            },
            {
              icon: <IoAddCircleOutline className='text-2xl' />,
              label: "Create",
              path: "#",
              onclick: onClose,
            },
            {
              icon: (
                <svg
                  className='w-6'
                  id='icon__outline'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                  ></path>
                </svg>
              ),
              label: "Profile",
              path: `/profile/${userDetails?._id}`,
              onclick: onClose,
            },
          ].map((item, index) => {
            return (
              <Link
                key={index}
                href={item.path}
                className='hover:-translate-y-1 hover:scale-110 duration-300 relative text-sm flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg'
                onClick={(e) =>
                  item.onclick && item?.onclick(item.label.toLowerCase())
                }
              >
                {item.icon}
                {/* <div className="w-2 h-2 bg-red-600 rounded-full absolute left-7 top-2.5"></div> */}

                <span className='p-2 hidden lg:block'>{item.label}</span>
                {item.label === "Messages" && (
                  <span className='absolute border rounded-full bg-[red] text-white w-4 h-4 flex justify-center items-center text-xs top-1 left-10 lg:top-3 lg:left-5'>
                    9
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        <div className='w-full h-full flex flex-col justify-end'>
          <button
            onClick={onClose}
            className='hover:-translate-y-1 hover:scale-110 duration-300 text-sm flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg'
          >
            {/* <SiThreads className="text-2xl" /> */}
            <span className='p-2 hidden lg:block'>Threads</span>
          </button>

          <button
            onClick={handleLogout}
            className='hover:-translate-y-1 hover:scale-110 duration-300 text-sm flex items-center w-full p-2 justify-center lg:justify-start hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg'
          >
            {/* <IoReorderThreeOutline className="text-2xl" /> */}
            <span className='p-2 hidden lg:block'>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default SideNavBar;
