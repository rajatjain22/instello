"use client";

import useResponsive from "@/app/_hooks/useResponsive";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  IoChevronBackOutline,
  IoChevronDownOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import SearchForm from "../common/SearchForm";
import toast from "react-hot-toast";
import User from "../common/User";
import { UserPlaceholder } from "../Placeholders/UserPlaceholder";

export default function UserSidebar() {
  const { isMobile, isTablet } = useResponsive();
  const pathname = usePathname();

  const [search, setSearch] = useState({
    text: "",
    searchUsers: [],
    searchLoading: false,
  });

  const handleSearch = async () => {
    if (!search.text) {
      toast.error("Please enter value!");
      return false;
    }
    try {
      setSearch((presVal) => ({ ...presVal, searchLoading: true }));
      const request = {
        method: "POST",
        body: JSON.stringify({ search: search.text }),
      };
      const response = await fetch("/api/users/search", request);
      const resJson = await response.json();
      if (response.ok) {
        setSearch((presVal) => ({ ...presVal, searchUsers: resJson.users }));
      } else {
        console.log(resJson.error);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSearch((presVal) => ({ ...presVal, searchLoading: false }));
    }
  };

  
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
      <div className="p-4 border-b dark:border-slate-700">
        <div className="flex my-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="md:hidden pl-2">
              <IoChevronBackOutline className="text-2xl -ml-4 md" />
            </Link>
            <h2 className="text-2xl font-bold text-black ml-1 dark:text-white">
              Chats
            </h2>
          </div>

          {/* <!-- right action buttons --> */}
          <div className="flex items-center gap-2.5">
            <button
              className="group"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <IoSettingsOutline className="text-2xl flex group-aria-expanded:rotate-180 md" />
            </button>

            <button className="">
              <IoIosCheckmarkCircleOutline className="text-2xl flex md" />
            </button>

            {/* <!-- mobile toggle menu --> */}
            <button type="button" className="md:hidden">
              <IoChevronDownOutline />
            </button>
          </div>
        </div>

        {/* <!-- search --> */}
        <SearchForm
          search={search.text}
          onChange={(e) =>
            setSearch((presVal) => ({
              ...presVal,
              text: e.target.value,
            }))
          }
          handleSearch={handleSearch}
        />
      </div>

      {/* <!-- users list --> */}
      <div className="p-2 overflow-y-auto h-[calc(100vh-127px)]">
        {search.text ? (
          search.searchLoading ? (
            <>
              <UserPlaceholder />
              <UserPlaceholder />
              <UserPlaceholder />
              <UserPlaceholder />
              <UserPlaceholder />
            </>
          ) : search.searchUsers.length ? (
            search.searchUsers?.map((user, index) => (
              <User
                key={index}
                className={"flex items-center p-2"}
                user={user}
                followButton={false}
              />
            ))
          ) : (
            <>No users</>
          )
        ) : (
          <Link
            href="/messages/1"
            className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
          >
            <div className="relative w-14 h-14 shrink-0">
              <Image
                src="/people-know/avatar-6.jpg"
                alt="profile"
                className="rounded-full shadow"
                fill={true}
              />
              <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="mr-auto text-sm text-black dark:text-white font-medium">
                  Jesse Steeve
                </div>
                <div className="text-xs font-light text-gray-500 dark:text-white/70">
                  09:40AM
                </div>
              </div>
              <div className="font-medium overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                Love your photos 😍
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
