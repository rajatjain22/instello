"use client";

import { UserPlaceholderWithButton } from "@/components/Placeholders/UserPlaceholder";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoSyncSharp } from "react-icons/io5";

export default function PeopleKnow() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2">
      <div className="flex justify-between text-black dark:text-white">
        <h3 className="font-bold text-base">People you might know </h3>
        <button>
          <IoSyncSharp className="text-xl" />
        </button>
      </div>
      <div className="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80">
        {loading ? (
          <>
            <UserPlaceholderWithButton />
            <UserPlaceholderWithButton />
            <UserPlaceholderWithButton />
            <UserPlaceholderWithButton />
          </>
        ) : (
          [...Array(5)].map((_, index) => (
            <div className="flex items-center gap-3" key={index}>
              <div className="w-10 h-10 relative">
                <Image
                  className="bg-gray-200 rounded-full w-10 h-10"
                  src={`/people-know/avatar-${index + 1}.jpg`}
                  alt="Picture of the author"
                  fill={true}
                  loading="lazy"
                />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-sm text-black dark:text-white">
                  Johnson smith {index + 1}
                </h4>

                <div className="mt-0.5"> Suggested For You </div>
              </div>
              <button
                type="button"
                className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
              >
                Follow
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
