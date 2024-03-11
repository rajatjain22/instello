import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import FollowButton from "../common/FollowButton";
import { UserContext } from "@/app/_context/User";
import { useParams } from "next/navigation";

export default function FollowCard({
  follow,
  handleFollow,
  loadingStates,
  showType,
}) {
  const params = useParams();

  const { userDetails } = useContext(UserContext);
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
            {follow.username}
          </h4>
        </Link>
        <div className='mt-0.5'>{follow.fullName}</div>
      </div>

      {userDetails._id !== follow._id && (
        <FollowButton
          isFollowing={follow.followed_by_viewer}
          isLoading={loadingStates}
          onToggleFollow={() => {
            handleFollow(
              follow._id,
              userDetails._id === params.id && showType === "followers"
                ? "remove"
                : follow.followed_by_viewer
                ? "unfollow"
                : "follow"
            );
          }}
          isRemove={
            userDetails._id === params.id && showType === "followers"
              ? true
              : false
          }
        />
      )}
    </div>
  );
}
