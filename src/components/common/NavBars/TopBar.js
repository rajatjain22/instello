"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function TopBar({ settopref, handleToggle, onClose }) {
  const sideref = useRef(null);

  useEffect(() => {
    if (sideref.current) {
      settopref(sideref);
    }
  }, [sideref, settopref]);

  const menu = [
    {
      path: "#",
      icon: <svg
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
    </svg>,
      label: "Notifications",
      onClick: () => handleToggle("notifications"),
    },
    {
      path: "/messages",
      icon: (
        <svg
          className="w-7"
          id="icon__outline"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          ></path>
        </svg>
      ),
      label: "Profile",
      onClick: onClose,
    },
  ];

  return (
    <div
      ref={sideref}
      className="flex sm:hidden h-14 items-center justify-between gap-2 sticky top-0 bg-white z-20 p-2 border-b shadow-lg"
    >
      <div className="relative w-20 h-6">
        <Image src="/logo.svg" fill={true} alt="logo" />
      </div>
      <div className="flex gap-7">
        {menu.map((e, index) => (
          <Link
            key={index}
            href={e.path}
            className="flex items-center"
            onClick={e.onClick}
          >
            <span>{e.icon}</span>
            <span className="hidden">{e.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
