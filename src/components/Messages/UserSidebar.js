"use client";

import useResponsive from "@/app/_hooks/useResponsive";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { MessageContext } from "@/app/_context/Message";
import { debounce } from "@/helpers/debounce";
import { formatTimestamp } from "@/helpers/all";
import { UserContext } from "@/app/_context/User";

export default function UserSidebar() {
  const { isMobile, isTablet } = useResponsive();
  const pathname = usePathname();
  const { conversations, conversationsLoading, socket } =
    useContext(MessageContext);
  const { userDetails } = useContext(UserContext);

  const [search, setSearch] = useState({
    text: "",
    searchUsers: [],
    searchLoading: false,
  });

  const handleSearch = async (value, signal = "") => {
    if (!value) {
      toast.error("Please enter value!");
      return false;
    }
    try {
      setSearch((presVal) => ({ ...presVal, searchLoading: true }));
      const request = {
        method: "POST",
        body: JSON.stringify({ search: value }),
        signal,
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

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    if (search.text) {
      let abortController = new AbortController();
      const signal = abortController.signal;
      setSearch((presVal) => ({ ...presVal, searchLoading: true }));
      console.log("object");
      debouncedSearch(search.text, signal);

      return () => {
        abortController.abort();
      };
    }
  }, [search.text, debouncedSearch]);

  useEffect(() => {
    if (socket && socket.connected) {
      console.log("Socket connected. Emitting get_conversations event.");
      try {
        socket.emit("get_all_conversations", { userId: userDetails?._id });
      } catch (error) {
        console.error("Error emitting get_conversations event:", error);
      }
    } else {
      console.log(
        "Socket is not connected. Unable to emit get_conversations event."
      );
    }
  }, [socket]);

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
                message={true}
                onClose={() =>
                  setSearch((presVal) => ({ ...presVal, text: "" }))
                }
              />
            ))
          ) : (
            <>No users</>
          )
        ) : conversationsLoading ? (
          <>
            <UserPlaceholder />
            <UserPlaceholder />
            <UserPlaceholder />
          </>
        ) : conversations.length ? (
          conversations?.map((val, index) => (
            <Link
              key={index}
              href={`/messages/${val.user_id}`}
              className="relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery"
            >
              <div className="relative w-14 h-14 shrink-0">
                <Image
                  src={val.avatar}
                  alt="profile"
                  className="rounded-full shadow"
                  fill={true}
                />
                {val.status && (
                  <div className="w-4 h-4 absolute bottom-0 right-0  bg-green-500 rounded-full border border-white dark:border-slate-800"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="mr-auto text-sm text-black dark:text-white font-medium">
                    {val.username}
                  </div>
                  <div className="text-xs font-light text-gray-500 dark:text-white/70">
                    {formatTimestamp(val?.lastMessageCreatedAt)}
                  </div>
                </div>
                <div className=" overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                  {val?.lastMessage}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <>No conversations</>
        )}
      </div>
    </div>
  );
}
