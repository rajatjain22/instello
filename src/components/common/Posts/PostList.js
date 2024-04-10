"use client";

import { useState } from "react";
import FilePreview from "./FilePreview";
import ModelPost from "./ModelPost";
import { TbBoxMultiple } from "react-icons/tb";

export default function PostList({ posts }) {
  const [model, setModel] = useState({
    open: false,
    post: null,
  });

  const handleShowPosts = (post) => {
    setModel((presVal) => ({ ...presVal, open: true, post: post }));
  };

  const onClose = () => {
    setModel((presVal) => ({ ...presVal, open: false }));
  };

  return (
    <>
      {posts.length > 0 ? (
        <div className='mt-8'>
          {/* <!-- Post list --> */}
          <div className='grid grid-cols-3 gap-3 mt-6 '>
            {posts.map((post, index) => {
              return (
                post?.post.length > 0 && (
                  <div
                    className='relative cursor-pointer'
                    key={index}
                    onClick={() => handleShowPosts(post)}
                  >
                    <FilePreview file={post.post[0]} isFeed={true} />
                    {post?.post.length > 1 && (
                      <TbBoxMultiple className='absolute top-2 right-1' />
                    )}
                  </div>
                )
              );
            })}
          </div>
          <ModelPost model={model} onClose={onClose} />
        </div>
      ) : (
        <div className='flex items-center justify-center h-48 py-3'>
          <h1 className='text-xl font-bold text-black dark:text-white'>
            No Posts
          </h1>
        </div>
      )}
    </>
  );
}
