"use client";

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";
import { UserContext } from "@/app/_context/User";

export default function User({
  user,
  className,
  followButton,
  handleFollow,
  isLoading,
  isRemove,
  onClose = "",
}) {
  const { userDetails } = useContext(UserContext);
  return (
    <div className={className}>
      <Link
        href={`/profile/${user._id}`}
        className='flex gap-2'
        onClick={onClose}
      >
        <div className='w-10 h-10 relative'>
          <Image
            className='bg-gray-200 rounded-full w-10 h-10'
            src={user.avatar}
            alt='Picture of the author'
            fill={true}
            loading='lazy'
          />
        </div>

        <div className='flex-1'>
          <h4 className='font-medium text-sm text-black dark:text-white'>
            {user.fullName}
          </h4>

          <div className='mt-0.5 text-xs'>
            {" "}
            {user.followed_by_viewer ? "Following" : user.fullName}{" "}
          </div>
        </div>
      </Link>
      {followButton && user._id !== userDetails._id && (
        <FollowButton
          isFollowing={user.followed_by_viewer}
          isLoading={isLoading}
          onToggleFollow={() => {
            handleFollow(
              user._id,
              user.followed_by_viewer ? "unfollow" : "follow"
            );
          }}
          isRemove={isRemove}
        />
      )}
    </div>
  );
}
