"use client";

import { useEffect, useState } from "react";
import AddPost from "./AddPost";
import PostImage from "./PostImage";
import PostPlaceholder from "./PostPlaceholder";
import PostText from "./PostText";
import PeopleKnow from "./Side/PeopleKnow";
import SwiperPhotos from "./Side/SwiperPhotos";

export default function PostContainer() {
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    fetch("/api/post/get")
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
    <>
      <div className='flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10'>
        <div className='w-full md:max-w-[475px] mx-auto flex-1 xl:space-y-6 space-y-3'>
          <AddPost setPosts={setPosts} />
          {postLoading ? (
            <>
              <PostPlaceholder />
              <PostPlaceholder />
            </>
          ) : posts.length > 0 ? (
            posts?.map((post, index) => (
              <PostImage user={post?.user} post={post} key={index} />
            ))
          ) : (
            <div className='text-2xl font-semibold text-center text-black !mt-16'>
              No posts
            </div>
          )}
        </div>

        {/* right sidebar */}
        <div className='w-full hidden lg:block lg:max-w-[340px] md:max-w-[575px] mx-auto'>
          <PeopleKnow />
          {/* <SwiperPhotos /> */}
        </div>
      </div>
    </>
  );
}
