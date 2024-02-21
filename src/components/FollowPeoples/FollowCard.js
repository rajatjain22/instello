import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FollowCard({
  allData,
  follow,
  handleFollow,
  userDetails,
}) {

  const checkRequest = follow.followRequest.includes(userDetails._id);
  const checkFollow = allData.following.some((item) => item._id === follow._id);
  return (
    <div
      key={follow._id} // Use a unique key for each item
      className="bg-white flex gap-4 items-center flex-wrap justify-between p-5 rounded-lg shadow-sm border1 dark:bg-dark2"
    >
      <Link
        href={`/profile/${follow._id}`}
        className="relative lg:w-16 lg:h-16 w-10 h-10"
      >
        <Image
          src={follow.avatar}
          alt="profile"
          className="rounded-full"
          fill={true}
          loading="lazy"
        />
      </Link>
      <div className="flex-1">
        <Link href={`/profile/${follow._id}`}>
          <h4 className="font-semibold text-sm text-black dark:text-white">
            {follow.fullName}
          </h4>
        </Link>
        <div className="mt-0.5">{follow.followers?.length} followers</div>
      </div>
      {userDetails._id !== follow._id && checkRequest ? (
        <button
          type="button"
          className="button bg-pink-100 text-pink-600 border border-pink-200"
          onClick={() => handleFollow(follow._id, "unrequest")}
        >
          Request
        </button>
      ) : checkFollow ? (
        <button
          type="button"
          className="button bg-secondery rounded-full py-1.5 font-semibold"
          onClick={() => handleFollow(follow._id, "unfollow")}
        >
          Remove
        </button>
      ) : (
        <button
          type="submit"
          className="button lg:px-10 bg-primary text-white max-md:flex-1"
          onClick={() => handleFollow(follow._id, "follow")}
        >
          Follow <span className="ripple-overlay"></span>
        </button>
      )}
    </div>
  );
}
