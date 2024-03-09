import React from "react";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "./FollowButton";

export default function User({
  user,
  className,
  followButton,
  handleFollow,
  isLoading,
}) {
  return (
    <div className={className}>
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
          <h4 className="font-medium text-sm text-black dark:text-white">
            {user.fullName}
          </h4>

          <div className="mt-0.5 text-xs"> Suggested For You </div>
        </div>
      </Link>
      {followButton && (
        <FollowButton
          isFollowing={user.followed_by_viewer}
          isLoading={isLoading}
          onToggleFollow={() => {
            handleFollow(
              user._id,
              user.followed_by_viewer ? "unfollow" : "follow"
            );
          }}
        />
      )}
    </div>
  );
}
