"use client";

import useResponsive from "@/app/_hooks/useResponsive";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react";
import User from "../../common/User";
import { UserPlaceholder } from "../../Placeholders/UserPlaceholder";
import { MessageContext } from "@/app/_context/Message";
import Heading from "./Heading";
import UserConversation from "./UserConversation";

export default function UserSidebarMain() {
  const { isMobile, isTablet } = useResponsive();
  const pathname = usePathname();
  const { allConversations, allConversationsLoading } =
    useContext(MessageContext);

  const [search, setSearch] = useState({
    text: "",
    searchUsers: [],
    searchLoading: false,
  });

  const renderSearchUserList = () => {
    if (search.text) {
      if (search.searchLoading) {
        return [...Array(5)].map((_, i) => <UserPlaceholder key={i} />);
      }

      if (search.searchUsers.length) {
        return search.searchUsers.map((user, index) => (
          <User
            key={index}
            user={user}
            className="flex items-center p-2"
            followButton={false}
            message={true}
            onClose={() => setSearch((prev) => ({ ...prev, text: "" }))}
          />
        ));
      }

      return <>No users</>;
    }

    if (allConversationsLoading) {
      return (
        <>
          {[...Array(3)].map((_, i) => (
            <UserPlaceholder key={i} />
          ))}
        </>
      );
    }

    if (allConversations?.length) {
      return allConversations.map((val, index) => (
        <UserConversation val={val} key={index} />
      ));
    }
    return <>No conversations</>;
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
      <Heading search={search} setSearch={setSearch} />

      {/* <!-- users list --> */}
      <div className="p-2 overflow-y-auto h-[calc(100vh-127px)]">
        {renderSearchUserList()}
      </div>
    </div>
  );
}
