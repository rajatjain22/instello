"use client";

import AddPost from "@/components/common/Posts/AddPost";
import PostContainer from "@/components/layout/PostContainer";
import PeopleKnow from "@/components/layout/PeopleKnow";
import { useContext, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPlaceholder from "@/components/Placeholders/PostPlaceholder";

import { PostContext } from "@/app/_context/Post";
import Story from "@/components/layout/Story";

export default function Home() {
  const {
    setHomePosts,
    homePosts,
    homePostsLoading,
    homePostPage,
    setHomePostPage,
    homePostHasMore,
    setHomePostHasMore,
    setHomePostsLoading,
  } = useContext(PostContext);

  const getHomePost = async () => {
    try {
      const res = await fetch(`/api/post/get?page=${homePostPage}`);

      if (!res.ok) {
        throw new Error("Failed to fetch home posts");
      }

      const data = await res.json();

      if (data?.message) {
        setHomePosts((prevPosts) => [...prevPosts, ...data.data]);
        setHomePostPage((prevPage) => prevPage + 1);
        setHomePostHasMore(data.hasMore);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error while fetching home posts:", error.message);
    } finally {
      setHomePostsLoading(false);
    }
  };

  return (
    <>
      <Story />
      <div className="flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10">
        <div className="w-full md:max-w-[475px] mx-auto flex-1 xl:space-y-6 space-y-3">
          <AddPost setPosts={setHomePosts} />
          <InfiniteScroll
            dataLength={homePosts.length}
            next={getHomePost}
            hasMore={homePostHasMore}
            loader={<PostPlaceholder />}
            className="xl:space-y-6 space-y-3"
          >
            <PostContainer postLoading={homePostsLoading} posts={homePosts} />
          </InfiniteScroll>
        </div>
        <div className="w-full hidden lg:block lg:max-w-[340px] md:max-w-[575px] mx-auto gap-5">
          <PeopleKnow />
        </div>
      </div>
    </>
  );
}
