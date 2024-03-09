"use client";

import AddPost from "@/components/common/Posts/AddPost";
import PostContainer from "@/components/layout/PostContainer";
import PeopleKnow from "@/components/layout/PeopleKnow";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { PostContext } from "./_context/Post";

const Story = dynamic(() => import("@/components/layout/Story"));

export default function Home() {
  const { setHomePosts, homePosts, homePostsLoading } = useContext(PostContext);

  return (
    <>
      <Story />
      <div className="flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10">
        <div className="w-full md:max-w-[475px] mx-auto flex-1 xl:space-y-6 space-y-3">
          <AddPost setPosts={setHomePosts} />
          <PostContainer postLoading={homePostsLoading} posts={homePosts} />
        </div>
        <div className="w-full hidden lg:block lg:max-w-[340px] md:max-w-[575px] mx-auto gap-5">
          <PeopleKnow />
        </div>
      </div>
    </>
  );
}
