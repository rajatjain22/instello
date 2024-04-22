"use client";

import useResponsive from "@/app/_hooks/useResponsive";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";
import SearchForm from "../common/SearchForm";
import toast from "react-hot-toast";
import User from "../common/User";
import { UserPlaceholder } from "../Placeholders/UserPlaceholder";
import { MessageContext } from "@/app/_context/Message";
import { debounce } from "@/helpers/debounce";
import { formatTimestamp, formatTimestampOnDays } from "@/helpers/all";
import { UserContext } from "@/app/_context/User";

export default function UserSidebar() {
  const { isMobile, isTablet } = useResponsive();
  const pathname = usePathname();
  const {
    conversations,
    setConversations,
    conversationsLoading,
    setConversationsLoading,
    socket,
  } = useContext(MessageContext);
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
    const fetchData = async () => {
      setConversationsLoading(true);
      if (userDetails) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SOCKET_URL}/get_conversations/${userDetails._id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setConversations([...data]);
          setConversationsLoading(false);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      }
    };
    fetchData();
    // console.log("userDetails", userDetails);
    //     socket?.emit(
    //       "get_conversations",
    //       { userId: userDetails._id },
    //       (conversatiosn) => {
    //         setConversationsLoading(true);
    //         setConversations([...conversatiosn]);
    //         setConversationsLoading(false);
    //       }
    //     );
  }, [userDetails]);

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
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-2xl -ml-4 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M328 112 184 256l144 144"
                ></path>
              </svg>
            </Link>
            <h2 className="text-2xl font-bold text-black ml-1 dark:text-white">
              Chats
            </h2>
          </div>

          {/* <!-- right action buttons --> */}
          <div className="flex items-center gap-2.5">
            <button className="group">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-2xl flex group-aria-expanded:rotate-180 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M262.29 192.31a64 64 0 1 0 57.4 57.4 64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22 155.3 155.3 0 0 1-21.46-12.57 16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22 155.3 155.3 0 0 1 21.46 12.57 16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
                ></path>
              </svg>
            </button>

            <button className="">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-2xl flex md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M362.6 192.9L345 174.8c-.7-.8-1.8-1.2-2.8-1.2-1.1 0-2.1.4-2.8 1.2l-122 122.9-44.4-44.4c-.8-.8-1.8-1.2-2.8-1.2-1 0-2 .4-2.8 1.2l-17.8 17.8c-1.6 1.6-1.6 4.1 0 5.7l56 56c3.6 3.6 8 5.7 11.7 5.7 5.3 0 9.9-3.9 11.6-5.5h.1l133.7-134.4c1.4-1.7 1.4-4.2-.1-5.7z"></path>
                <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"></path>
              </svg>
            </button>

            {/* <!-- mobile toggle menu --> */}
            <button type="button" className="md:hidden">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-2xl -ml-4 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M328 112 184 256l144 144"
                ></path>
              </svg>
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
              className={`relative flex items-center gap-4 p-2 duration-200 rounded-xl hover:bg-secondery`}
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
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="mr-auto text-sm text-black dark:text-white font-medium">
                    {val.username}
                  </div>
                  <div className="text-xs font-light text-gray-500 dark:text-white/70">
                    {/* {formatTimestamp(val?.lastMessageCreatedAt)} */}
                    {formatTimestampOnDays(val?.lastMessageCreatedAt)}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className=" overflow-hidden text-ellipsis text-sm whitespace-nowrap">
                    {val?.lastMessage}
                  </div>
                  {val.unreadCount > 0 && (
                    <div className="w-5 h-5 border rounded-full bg-[#353535] text-white text-xs text-center flex justify-center items-center">
                      {val.unreadCount}
                    </div>
                  )}
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
