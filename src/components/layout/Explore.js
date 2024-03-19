"use client";

import PostPlaceholder from "@/components/Placeholders/PostPlaceholder";
import PostImage from "@/components/common/Posts/PostImage";
import React, { useEffect, useState } from "react";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    fetch("/api/post/explore")
      .then((res) => res.json())
      .then((res) => {
        if (res?.message) {
          setPosts(res.data);
        } else {
          console.log(res.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setPostLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-5 sm:w-[80%] m-auto pt-5">
      <div className="text-3xl font-bold">Explore</div>

      {postLoading ? (
        <>
          <PostPlaceholder />
          <PostPlaceholder />
        </>
      ) : posts.length ? (
        posts.map((post, index) => (
          <PostImage user={post.user} post={post} key={index} />
        ))
      ) : (
        <div className="text-2xl font-semibold text-center text-black mt-16">
          No explore
        </div>
      )}
    </div>
  );
}
