"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import FollowButton from "../FollowButton";
import { UserContext } from "@/app/_context/User";
import FollowModel from "@/components/FollowPeoples/FollowModel";
import { MessageContext } from "@/app/_context/Message";

export default function ProfileHeader({ profile, setProfile }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { socket } = useContext(MessageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modelVal, setModelVal] = useState("");
  const [followBtnLoading, setFollowBtnLoading] = useState(false);

  const handleClickOnFollowButton = (val) => {
    if (!profile.followed_by_viewer && userDetails._id !== profile._id) return;
    setIsOpen(true);
    setModelVal(val);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleFollow = (val) => {
    setFollowBtnLoading(true);
    const requestData = {
      method: "POST",
      body: JSON.stringify({
        followeeId: profile._id,
        action: val,
      }),
    };
    fetch("/api/users/followToggle", requestData)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server response wasn't OK");
        }
        return res.json();
      })
      .then((res) => {
        if (val === "follow") {
          setProfile((prevState) => ({
            ...prevState,
            followed_by_viewer: true,
            followersCount: prevState.followersCount + 1,
          }));
          setUserDetails((presVal) => ({
            ...presVal,
            followingCount: presVal.followingCount + 1,
          }));

          socket.emit("follow_request", {
            type: val,
            senderId: userDetails._id,
            receiverId: profile._id,
          });
        } else if (val === "unfollow") {
          setProfile((prevState) => ({
            ...prevState,
            followed_by_viewer: false,
            followersCount: prevState.followersCount - 1,
          }));
          setUserDetails((presVal) => ({
            ...presVal,
            followingCount: presVal.followingCount - 1,
          }));
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setFollowBtnLoading(false);
      });
  };

  return (
    <div className="max-w-2x flex-1">
      <h3 className="md:text-xl text-base font-semibold text-black dark:text-white">
        {profile.fullName}
        {profile.isVerified ? (
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M23 11.99 20.56 9.2l.34-3.69-3.61-.82L15.4 1.5 12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 11.99l2.44 2.79-.34 3.7 3.61.82 1.89 3.2 3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69 2.44-2.8zm-3.95 1.48-.56.65.08.85.18 1.95-1.9.43-.84.19-.44.74-.99 1.68-1.78-.77-.8-.34-.79.34-1.78.77-.99-1.67-.44-.74-.84-.19-1.9-.43.18-1.96.08-.85-.56-.65L3.67 12l1.29-1.48.56-.65-.09-.86-.18-1.94 1.9-.43.84-.19.44-.74.99-1.68 1.78.77.8.34.79-.34 1.78-.77.99 1.68.44.74.84.19 1.9.43-.18 1.95-.08.85.56.65 1.29 1.47-1.28 1.48z"></path>
            <path d="m10.09 13.75-2.32-2.33-1.48 1.49 3.8 3.81 7.34-7.36-1.48-1.49z"></path>
          </svg>
        ) : (
          ""
        )}
      </h3>

      <p className="sm:text-sm text-blue-600 mt-1 font-normal text-xs">
        @{profile.username}
      </p>

      <p className="text-sm mt-2 md:font-normal font-light whitespace-pre-line">
        {profile?.bio}
      </p>

      <div className="flex md:items-end justify-between md:mt-8 mt-4 max-md:flex-col gap-4">
        <div className="flex sm:gap-10 gap-6 sm:text-sm text-xs max-sm:absolute max-sm:top-10 max-sm:left-24 text-center">
          <div>
            <p>Posts</p>
            <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
              {profile?.postsCount}
            </h3>
          </div>

          <Link
            href={"#"}
            onClick={() => handleClickOnFollowButton("followers")}
            className={`${
              !profile.followed_by_viewer &&
              userDetails._id !== profile._id &&
              "cursor-default"
            }`}
          >
            <p>Followers</p>
            <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
              {profile.followersCount}
            </h3>
          </Link>
          <Link
            href={"#"}
            onClick={() => handleClickOnFollowButton("following")}
            className={`${
              !profile.followed_by_viewer &&
              userDetails._id !== profile._id &&
              "cursor-default"
            }`}
          >
            <p>Following</p>
            <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
              {profile.followingCount}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {userDetails?._id === profile._id ? (
            <Link
              href={`/profile/${userDetails._id}/edit`}
              type="button"
              className="button bg-pink-100 text-pink-600 border border-pink-200"
            >
              Edit
            </Link>
          ) : (
            <>
              <FollowButton
                isFollowing={profile.followed_by_viewer}
                isLoading={followBtnLoading}
                onToggleFollow={() => {
                  handleFollow(
                    profile.followed_by_viewer ? "unfollow" : "follow"
                  );
                }}
              />

              {profile.followed_by_viewer && (
                <Link
                  href={`/messages/${profile._id}`}
                  className="button bg-pink-600 text-white"
                >
                  Message
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <FollowModel
          isOpen={isOpen}
          onClose={onClose}
          id={profile._id}
          type={modelVal}
        />
      )}
    </div>
  );
}
