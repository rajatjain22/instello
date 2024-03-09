import React from "react";
import PostPlaceholder from "../Placeholders/PostPlaceholder";
import Post from "../common/Posts/Post";

const PostContainer = ({ postLoading, posts }) => {
  return (
    <>
      {postLoading ? (
        <>
          <PostPlaceholder />
          <PostPlaceholder />
        </>
      ) : (
        <Post posts={posts} />
      )}
    </>
  );
};

export default PostContainer;
