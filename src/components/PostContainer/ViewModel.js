import { UserContext } from "@/app/_context/User";
import ModelBox from "@/components/ModelBox/ModelBox";
import { formatTimestamp } from "@/helpers/all";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserPlaceholder } from "../Placeholders/UserPlaceholder";

export default function ViewModel({
  isOpen,
  onClose
}) {
 

  return (
    <ModelBox isOpen={isOpen} onClose={onClose}>
      {/* <div className="sm:px-4 sm:py-3 p-2.5 border-b border-gray-100 flex items-center gap-3 dark:border-slate-700/40">
        <div className="relative w-9 h-9 mt-1">
          <Image
            className="rounded-full"
            src={user.avatar}
            alt="Profile picture"
            fill={true}
            loading="lazy"
          />
        </div>
        <div>{user.username}</div>
      </div> */}
      <div className="bg-white flex flex-col text-black gap-3 sm:px-4 sm:py-3 p-2.5 h-72 overflow-y-scroll">
        Test
      </div>
      <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
        {/* <div className="relative w-9 h-9 mt-1">
          <Image
            className="rounded-full"
            src={userDetails.avatar}
            alt="Profile picture"
            fill={true}
            loading="lazy"
          />
        </div>

        <div className="flex-1 relative overflow-hidden h-10">
          <textarea
            placeholder="Add Comment...."
            rows={1}
            cols={40}
            className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent focus:outline-none"
            value={comment.value}
            onChange={(e) => {
              setComment({ ...comment, value: e.target.value });
            }}
          />
        </div> */}
      </div>
    </ModelBox>
  );
}
