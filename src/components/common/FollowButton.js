"use client";

import { useEffect, useState } from "react";
import { ImageLoading4 } from "../Loaders/Profile/ImageLoading";

export default function FollowButton({
  isFollowing,
  isLoading,
  onToggleFollow,
  isRemove,
}) {
  const [following, setFollowing] = useState("Follow");

  const handleToggleFollow = (val) => {
    if (isLoading) return;

    setFollowing(val);
    onToggleFollow(val);
  };

  useEffect(() => {
    if (isFollowing) {
      setFollowing("Unfollow");
    } else {
      setFollowing("Follow");
    }
  }, [isFollowing]);

  if (isLoading) {
    return (
      <button
        type="button"
        className="button bg-pink-100 text-pink-600 border border-pink-200 cursor-not-allowed"
        disabled
      >
        <ImageLoading4 className="w-20" />
      </button>
    );
  }

  if (isRemove) {
    return (
      <button
        type="button"
        className={`button text-gray-600 bg-slate-200`}
        onClick={() => handleToggleFollow("remove")}
      >
        Remove
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`button ${
        following === "Follow"
          ? "text-gray-600 bg-slate-200"
          : "bg-pink-100 text-pink-600 border border-pink-200"
      }`}
      onClick={() => handleToggleFollow(following)}
    >
      {following}
    </button>
  );
}
