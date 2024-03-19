"use client";

import PostImage from "./PostImage";

const Post = ({ posts }) => {
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

export default Post;
