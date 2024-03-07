"use client";

import AddPost from "@/components/PostContainer/AddPost";
import PostContainer from "@/components/PostContainer/PostContainer";
import PeopleKnow from "@/components/PostContainer/Side/PeopleKnow";
import { HTTP_SERVICE_CALL } from "@/helpers/ApiProvider";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Story = dynamic(() => import("@/components/Story/Story"));

export default function Home() {
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
      <Story />
      <div className="flex max-lg:flex-col xl:gap-10 md:gap-3 md:mt-10">
        <div className="w-full md:max-w-[475px] mx-auto flex-1 xl:space-y-6 space-y-3">
          <AddPost setPosts={setPosts} />
          <PostContainer postLoading={postLoading} posts={posts} />
        </div>
        <div className="w-full hidden lg:block lg:max-w-[340px] md:max-w-[575px] mx-auto gap-5">
          <PeopleKnow />
        </div>
      </div>
    </>
  );
}
