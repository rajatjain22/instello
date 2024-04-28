"use client";

import { useState } from "react";
import FilePreview from "./FilePreview";
import ImageModel from "../ImageModel";

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
        <div className="mt-8">
          {/* <!-- Post list --> */}
          <div className="grid grid-cols-3 gap-3 mt-6 ">
            {posts.map((post, index) => {
              return (
                post?.post.length > 0 && (
                  <div
                    className="relative cursor-pointer"
                    key={index}
                    onClick={() => handleShowPosts(post)}
                  >
                    <FilePreview file={post.post[0]} isFeed={true} />
                    {post?.post.length > 1 && (
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute top-2 right-1"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M7 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
                        <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2"></path>
                      </svg>
                    )}
                  </div>
                )
              );
            })}
          </div>
          <ImageModel
            isOpen={model.open}
            data={model?.post?.post ?? []}
            onClose={onClose}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 py-3">
          <h1 className="text-xl font-bold text-black dark:text-white">
            No Posts
          </h1>
        </div>
      )}
    </>
  );
}
