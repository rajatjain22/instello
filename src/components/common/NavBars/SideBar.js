"use client";

import { UserContext } from "@/app/_context/User";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";

export default function SideBar({
  setSideref,
  handleToggle,
  onClose,
  handleLogout,
}) {
  const { userDetails } = useContext(UserContext);
  const sideRef = useRef(null);

  useEffect(() => {
    if (sideRef.current) {
      setSideref(sideRef);
    }
  }, [sideRef, setSideref]);

  const menu = [
    {
      icon: (
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 512 512'
          className='text-2xl'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
            d='M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212'
          ></path>
          <path
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
            d='M480 256 266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69'
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
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 512 512'
          className='text-2xl'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z'></path>
        </svg>
      ),
      label: "Search",
      path: "#",
      onClick: () => handleToggle("search"),
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
      path: "/explore",
      onClick: onClose,
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
            d='M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z'
          ></path>
        </svg>
      ),
      label: "Reels",
      path: "#",
      onClick: onClose,
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
      onClick: onClose,
    },
    {
      icon: (
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 512 512'
          className='text-2xl'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
            d='M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0 0 18 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z'
          ></path>
        </svg>
      ),
      label: "Notifications",
      path: "#",
      onClick: () => handleToggle("notifications"),
    },
    {
      icon: (
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 512 512'
          className='text-2xl'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='none'
            strokeMiterlimit='10'
            strokeWidth='32'
            d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'
          ></path>
          <path
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='32'
            d='M256 176v160m80-80H176'
          ></path>
        </svg>
      ),
      label: "Create",
      path: "#",
      onClick: onClose,
    },
    {
      icon: (
        <div className='relative w-5 h-5'>
          <Image
            src={userDetails.avatar}
            className='rounded-full'
            alt='profile'
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
          stroke='currentColor'
          fill='currentColor'
          stroke-width='0'
          viewBox='0 0 512 512'
          class='text-2xl'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='32'
            d='M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40m64 160 80-80-80-80m-192 80h256'
          ></path>
        </svg>
      ),
      label: "Logout",
      path: `#`,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      ref={sideRef}
      className='hidden max-w-[--w-side] sm:w-[--w-side-small] md:w-[--w-side-md] lg:w-full sm:block fixed bg-white z-10 h-screen border-r shadow-lg'
    >
      <div className='my-2 text-3xl font-bold border-b p-3 text-center'>
        <div className='relative w-full h-6'>
          <Image src='/logo.svg' fill={true} alt='logo' />
        </div>
      </div>
      <div className='flex flex-col gap-2 p-3'>
        {menu.map((e, index) => (
          <Link
            key={index}
            href={e.path}
            className={`flex items-center text-md gap-2 p-2 hover:-translate-y-1 duration-300 hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg ${
              e.label === "Logout" &&
              "absolute bottom-0 sm:w-[70%] md:w-[90%] bg-white"
            }`}
            onClick={e.onClick}
          >
            <span>{e.icon}</span>
            <span className='hidden md:block font-medium'>{e.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
