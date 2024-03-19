"use client";

import AddPost from "@/components/common/Posts/AddPost";
import PostContainer from "@/components/layout/PostContainer";
import PeopleKnow from "@/components/layout/PeopleKnow";
import { useContext, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPlaceholder from "@/components/Placeholders/PostPlaceholder";

import dynamic from "next/dynamic";
import { PostContext } from "@/app/_context/Post";
const Story = dynamic(() => import("@/components/layout/Story"));

export default function Home() {
  const {
    setHomePosts,
    homePosts,
    homePostsLoading,
    homePostPage,
    setHomePostPage,
    homePostHasMore,
    setHomePostHasMore,
  } = useContext(PostContext);

  const getHomePost = () => {
    fetch(`/api/post/get?page=${homePostPage}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.message) {
          setHomePosts((presVal) => [...presVal, ...res.data]);
          setHomePostPage((presVal) => presVal + 1);
          setHomePostHasMore(res.hasMore);
        } else {
          console.log(res.error);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <Story />
      <div className='flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10'>
        <div className='w-full md:max-w-[475px] mx-auto flex-1 xl:space-y-6 space-y-3'>
          <AddPost setPosts={setHomePosts} />
          <InfiniteScroll
            dataLength={homePosts.length}
            next={getHomePost}
            hasMore={homePostHasMore}
            loader={<PostPlaceholder />}
            className='xl:space-y-6 space-y-3'
          >
            <PostContainer postLoading={homePostsLoading} posts={homePosts} />
          </InfiniteScroll>
        </div>
        <div className='w-full hidden lg:block lg:max-w-[340px] md:max-w-[575px] mx-auto gap-5'>
          <PeopleKnow />
        </div>
      </div>
    </>
  );
}
