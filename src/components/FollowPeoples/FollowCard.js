import Image from "next/image";
import Link from "next/link";
import React from "react";
import FollowButton from "../FollowButton/FollowButton";

export default function FollowCard({
  allData,
  follow,
  handleFollow,
  loadingStates,
}) {
  const checkFollow = allData.following.some((item) => item._id === follow._id);

  return (
    <div
      key={follow._id}
      className='bg-white flex gap-4 items-center flex-wrap justify-between p-5 rounded-lg shadow-sm border1 dark:bg-dark2'
    >
      <Link
        href={`/profile/${follow._id}`}
        className='relative lg:w-16 lg:h-16 w-10 h-10'
      >
        <Image
          src={follow.avatar}
          alt='profile'
          className='rounded-full'
          fill={true}
          loading='lazy'
        />
      </Link>
      <div className='flex-1'>
        <Link href={`/profile/${follow._id}`}>
          <h4 className='font-semibold text-sm text-black dark:text-white'>
            {follow.fullName}
          </h4>
        </Link>
        <div className='mt-0.5'>{follow.followers?.length} followers</div>
      </div>
      <FollowButton
        isFollowing={checkFollow}
        isLoading={loadingStates}
        onToggleFollow={() =>
          handleFollow(follow._id, checkFollow ? "unfollow" : "follow")
        }
      />
    </div>
  );
}
