"use client";

import useResponsive from "@/app/_hooks/useResponsive";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  IoChevronDownOutline,
  IoSearch,
  IoSettingsOutline,
} from "react-icons/io5";

export default function Sidebar() {
  const { isMobile, isTablet } = useResponsive();
  const pathname = usePathname();
  return (
    <div
      className={`${
        isMobile || isTablet
          ? pathname === "/messages"
            ? "block animate-slideLeftToRight"
            : "hidden"
          : "block"
      } w-full md:w-[360px] relative border-r dark:border-slate-700`}
    >

        {/* <!-- heading title --> */}
        <div class='p-4 border-b dark:border-slate-700'>
          <div class='flex mt-2 items-center justify-between'>
            <h2 class='text-2xl font-bold text-black ml-1 dark:text-white'>
              Chats
            </h2>

            {/* <!-- right action buttons --> */}
            <div class='flex items-center gap-2.5'>
              <button class='group' aria-haspopup='true' aria-expanded='false'>
                <IoSettingsOutline className='text-2xl flex group-aria-expanded:rotate-180 md' />
              </button>

              <button class=''>
                <IoIosCheckmarkCircleOutline className='text-2xl flex md' />
              </button>

              {/* <!-- mobile toggle menu --> */}
              <button type='button' class='md:hidden'>
                <IoChevronDownOutline />
              </button>
            </div>
          </div>

          {/* <!-- search --> */}
          <div className='relative mt-4'>
            <IoSearch className='absolute top-2.5 left-2 text-xl' />

            <input
              type='text'
              placeholder='Search'
              className='bg-transparen w-full !pl-10 !py-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none'
            />
            <button type='submit' hidden></button>
          </div>
        </div>

        {/* <!-- users list --> */}
        <div class='space-y-2 p-2 overflow-y-auto h-[calc(100vh-127px)]'>
          <Link
            href='/messages/1'
            class='relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery'
          >
            <div class='relative w-14 h-14 shrink-0'>
              <Image
                src='/people-know/avatar-6.jpg'
                alt='profile'
                className='rounded-full shadow'
                fill={true}
              />
              <div class='w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800'></div>
            </div>
            <div class='flex-1 min-w-0'>
              <div class='flex items-center gap-2 mb-1.5'>
                <div class='mr-auto text-sm text-black dark:text-white font-medium'>
                  Jesse Steeve
                </div>
                <div class='text-xs font-light text-gray-500 dark:text-white/70'>
                  09:40AM
                </div>
              </div>
              <div class='font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap'>
                Love your photos 😍
              </div>
            </div>
          </Link>
        </div>
      
    </div>
  );
}
