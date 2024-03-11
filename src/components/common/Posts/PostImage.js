"use client";

import { formatTimestamp } from "@/helpers/all";
import Image from "next/image";
import Link from "next/link";
import {
  IoHeart,
  IoChatbubbleEllipses,
  IoPaperPlaneOutline,
  IoShareOutline,
  IoChevronDownOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import PostSwiper from "./PostSwiper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CommentModel from "../CommentModel";

export default function PostImage({ user, post }) {
  const [postAction, setPostAction] = useState({
    hasLiked: false,
    likesCount: 0,
    commentCount: 0,
    commentModel: false,
    viewModel: false,
  });

  const handleLike = async (val) => {
    try {
      setPostAction((presVal) => ({
        ...presVal,
        likesCount: val ? presVal.likesCount + 1 : presVal.likesCount - 1,
        hasLiked: val,
      }));
      const request = {
        method: "PUT",
        body: JSON.stringify({
          postId: post._id,
          action: val ? "like" : "unlike",
        }),
      };
      const response = await fetch("/api/post/likeToggle", request);
      const resData = await response.json();
      if (response.ok) {
        toast.success("Liked");
      } else {
        console.log("Error: ===> ", response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setPostAction((prev) => ({
      ...prev,
      hasLiked: post.hasLiked,
      likesCount: post.likesCount,
      commentCount: post.commentCount,
    }));
  }, [post]);

  const handleCloseCommentModel = () => {
    setPostAction((presVal) => ({
      ...presVal,
      commentModel: false,
    }));
  };

  const handleCloseViewModel = () => {
    setPostAction((presVal) => ({
      ...presVal,
      viewModel: false,
    }));
  };

  const handleCommentModel = () => {
    setPostAction((presVal) => ({
      ...presVal,
      commentCount: presVal.commentCount + 1,
    }));
  };

  return (
    <div className='bg-white rounded-xl shadow-sm text-sm font-medium border-1 dark:bg-dark2'>
      <div className='flex gap-3 sm:p-4 p-2.5 text-sm font-medium'>
        <Link href={`/profile/${user._id}`} className='relative w-9 h-9'>
          <Image
            className='rounded-3xl'
            src={user?.avatar}
            alt='Picture of the author'
            fill={true}
            loading='lazy'
          />
        </Link>

        <div className='flex-1'>
          <h4 className='text-black dark:text-white'>{user?.fullName}</h4>
          <div className='text-xs text-gray-500 dark:text-white/80'>
            {formatTimestamp(post?.createdAt)}
          </div>
        </div>
        <div className='-mr-1'>
          <button
            type='button'
            className='button__ico w-8 h-8'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <IoEllipsisHorizontal />
          </button>
        </div>
      </div>

      {post.post?.length > 0 ? (
        <div className='px-4'>
          <div
            className='relative w-full h-[22rem] cursor-pointer'
            // onClick={() => console.log("Click")}
          >
            <PostSwiper posts={post.post} />
          </div>
          {post.text && (
            <div className='pt-2 flex gap-2'>
              <Link href={"#"} className='font-bold'>
                {user.fullName}
              </Link>
              <span className='font-medium whitespace-pre-line'>
                {post.text}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className='sm:px-4 p-2.5 pt-0'>
          <p className='font-medium whitespace-pre-line'>{post.text}</p>
        </div>
      )}

      {/* <!-- post icons --> */}
      <div className='sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold'>
        <div className='flex items-center gap-2.5'>
          <button
            type='button'
            className={`button__ico ${
              postAction.hasLiked
                ? "text-red-500 bg-red-100 dark:bg-slate-700"
                : "bg-slate-200/70"
            }`}
            onClick={() => handleLike(!postAction.hasLiked)}
          >
            <IoHeart className='text-lg' />
          </button>
          <a href='#'>{postAction.likesCount}</a>
        </div>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            className='button__ico bg-slate-200/70 dark:bg-slate-700'
            onClick={() => {
              setPostAction((presVal) => ({
                ...presVal,
                commentModel: !presVal.commentModel,
              }));
            }}
          >
            <IoChatbubbleEllipses className='text-lg' />
          </button>
          <span>{postAction.commentCount}</span>
        </div>
        <button type='button' className='button__ico ml-auto'>
          <IoPaperPlaneOutline className='text-lg' />
        </button>
        <button type='button' className='button__ico'>
          <IoShareOutline className='text-lg' />
        </button>
      </div>

      {/* <!-- post caption --> */}
      {post?.length > 0 && post?.text?.trim()?.length > 0 && (
        <div className='sm:px-4 p-2.5 flex items-center gap-4'>
          <p className='font-normal'>
            <span className='font-bold'>{user?.fullName}</span>{" "}
            <span className='whitespace-pre-line'>{post?.text}</span>
          </p>
        </div>
      )}

      {/* Comment */}
      {/* <div className='sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40'>
        <div className='flex items-start gap-3 relative'>
          <div className='relative w-6 h-6 mt-1'>
            <Image
              className='rounded-full'
              src='/people-know/avatar-2.jpg'
              alt='Picture of the author'
              fill={true}
              loading='lazy'
            />
          </div>
          <div className='flex-1'>
            <a
              href='profile.html'
              className='text-black font-medium inline-block dark:text-white'
            >
              Steeve
            </a>
            <p className='mt-0.5'>What a beautiful photo! I love it. 😍 </p>
          </div>
        </div>
        <div className='flex items-start gap-3 relative'>
          <div className='relative w-6 h-6 mt-1'>
            <Image
              className='rounded-full'
              src='/people-know/avatar-2.jpg'
              alt='Picture of the author'
              fill={true}
              loading='lazy'
            />
          </div>
          <div className='flex-1'>
            <a
              href='profile.html'
              className='text-black font-medium inline-block dark:text-white'
            >
              Rajat Jain
            </a>
            <p className='mt-0.5'> You captured the moment.😎 </p>
          </div>
        </div>

        <button
          type='button'
          className='flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2'
        >
          <IoChevronDownOutline />
          More Comment
        </button>
      </div> */}

      {postAction.commentModel && (
        <CommentModel
          isOpen={postAction.commentModel}
          onClose={handleCloseCommentModel}
          post={post}
          user={user}
          handleCommentModel={handleCommentModel}
        />
      )}

      {/* <div className='sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40'>
        <div className='relative w-6 h-6 mt-1'>
          <Image
            className='rounded-full'
            src={user.avatar}
            alt='Picture of the author'
            fill={true}
            loading='lazy'
          />
        </div>

        <div className='flex-1 relative overflow-hidden h-10'>
          <textarea
            placeholder='Add Comment....'
            rows='1'
            className='w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent focus:outline-none'
          />
        </div>

        <button
          type='submit'
          className='text-sm rounded-full py-1.5 px-3.5 bg-secondery'
        >
          Replay
        </button>
      </div> */}
    </div>
  );
}
