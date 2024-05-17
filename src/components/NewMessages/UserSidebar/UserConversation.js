import { formatTimestampOnDays } from "@/helpers/all";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function UserConversation({val}) {
  return (
    <Link
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
          <div className="flex-1 overflow-hidden text-ellipsis text-sm whitespace-nowrap">
            {val.typing
              ? "typing..."
              : val?.lastMessageType === "text"
              ? val?.lastMessage
              : val?.lastMessageType}
          </div>
          {val.unreadCount > 0 && (
            <div className="flex-shrink-0 w-6 h-6 border rounded-full bg-[#353535] text-white text-xs text-center flex justify-center items-center">
              {val.unreadCount}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default UserConversation;
