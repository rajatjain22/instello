"use client";

import AddPost from "@/components/common/Posts/AddPost";
import PostContainer from "@/components/layout/PostContainer";
import PeopleKnow from "@/components/layout/PeopleKnow";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { PostContext } from "./_context/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import PostPlaceholder from "@/components/Placeholders/PostPlaceholder";

const Story = dynamic(() => import("@/components/layout/Story"));

export default function Home() {
  const { setHomePosts, homePosts, homePostsLoading, postPage, setPostPage } = useContext(PostContext);
  const [hasMore, setHasMore] = useState(true);

  const getHomePost = () => {
    fetch(`/api/post/get?page=${postPage}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.message) {
          setHomePosts((presVal) => [...presVal, ...res.data]);
          setPostPage((presVal) => presVal + 1);

          setHasMore(res.hasMore);
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
      <div className="flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10">
        <div className="w-full md:max-w-[475px] mx-auto flex-1 xl:space-y-6 space-y-3">
          <AddPost setPosts={setHomePosts} />
          <InfiniteScroll
            dataLength={homePosts.length}
            next={getHomePost}
            hasMore={hasMore}
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
