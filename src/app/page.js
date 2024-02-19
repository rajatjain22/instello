'use client'

import MainComponent from "@/components/MainComponent/MainComponent";
import PostContainer from "@/components/PostContainer/PostContainer";
import Story from "@/components/Story/Story";

export default function Home() {
  return (
    <>
      <Story />
      <PostContainer />
    </>
  );
}
