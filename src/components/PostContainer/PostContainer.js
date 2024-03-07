import React from "react";
import PostImage from "./PostImage";
import PostPlaceholder from "../Placeholders/PostPlaceholder";

const RenderPosts = ({ posts }) => {
  if (posts.length > 0) {
    return posts.map((post, index) => (
      <PostImage user={post.user} post={post} key={index} />
    ));
  } else {
    return (
      <div className="text-2xl font-semibold text-center text-black mt-16">
        No posts
      </div>
    );
  }
};

const PostContainer = ({ postLoading, posts }) => {
  return (
    <>
      {postLoading ? (
        <>
          <PostPlaceholder />
          <PostPlaceholder />
        </>
      ) : (
        <RenderPosts posts={posts} />
      )}
    </>
  );
};

export default PostContainer;
