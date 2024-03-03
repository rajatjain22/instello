"use client";

import { UserContext } from "@/app/_context/User";
import FollowButton from "@/components/FollowButton/FollowButton";
import { UserPlaceholderWithButton } from "@/components/Placeholders/UserPlaceholder";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IoSyncSharp } from "react-icons/io5";

export default function PeopleKnow() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    fetch("/api/users/suggestion")
      .then((res) => res.json())
      .then((res) => {
        if (res?.message) {
          setUserData(res.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleToggleFollow = (userId, followAction) => {
    const followUserIndex = userData.findIndex((e) => e._id === userId);

    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [userId]: true,
    }));

    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followeeId: userId, action: followAction }),
    };

    fetch("/api/users/followToggle", requestData)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server response wasn't OK");
        }
        return res.json();
      })
      .then((res) => {
        if (followAction === "follow") {
          setUserDetails((presVal) => ({
            ...presVal,
            followingCount: presVal.followingCount + 1,
          }));
          setUserData((prevVal) => {
            const updatedUserData = [...prevVal];
            updatedUserData[followUserIndex] = {
              ...updatedUserData[followUserIndex],
              followed_by_viewer: true,
            };
            return updatedUserData;
          });
        } else if (followAction === "unfollow") {
          setUserDetails((presVal) => ({
            ...presVal,
            followingCount: presVal.followingCount - 1,
          }));
          setUserData((prevVal) => {
            const updatedUserData = [...prevVal];
            updatedUserData[followUserIndex] = {
              ...updatedUserData[followUserIndex],
              followed_by_viewer: false,
            };
            return updatedUserData;
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [userId]: false,
        }));
      });
  };

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
          </>
        ) : (
          userData.map((user, index) => {
            return (
              <div
                className="flex items-center gap-3 justify-between"
                key={index}
              >
                <Link href={`/profile/${user._id}`} className="flex gap-2">
                  <div className="w-10 h-10 relative">
                    <Image
                      className="bg-gray-200 rounded-full w-10 h-10"
                      src={user.avatar}
                      alt="Picture of the author"
                      fill={true}
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-black dark:text-white">
                      {user.fullName}
                    </h4>

                    <div className="mt-0.5"> Suggested For You </div>
                  </div>
                </Link>
                <FollowButton
                  isFollowing={user.followed_by_viewer}
                  isLoading={loadingStates[user._id]}
                  onToggleFollow={() => {
                    handleToggleFollow(
                      user._id,
                      user.followed_by_viewer ? "unfollow" : "follow"
                    );
                  }}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
