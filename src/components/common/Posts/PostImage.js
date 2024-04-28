"use client";

import { formatTimestamp } from "@/helpers/all";
import Image from "next/image";
import Link from "next/link";
import PostSwiper from "./PostSwiper";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import CommentModel from "../CommentModel";
import OptionsModel from "./OptionsModel";

export default function PostImage({ user, post }) {
  const buttonRef = useRef(null);
  const [postAction, setPostAction] = useState({
    hasLiked: false,
    likesCount: 0,
    commentCount: 0,
    commentModel: false,
    viewModel: false,
    optionsModel: false,
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

  const handleCommentModel = () => {
    setPostAction((presVal) => ({
      ...presVal,
      commentCount: presVal.commentCount + 1,
    }));
  };

  const handleOptionModel = () => {
    setPostAction((presVal) => ({
      ...presVal,
      optionsModel: !presVal.optionsModel,
    }));
  };

  const handleOtionModelClose = () => {
    setPostAction((presVal) => ({
      ...presVal,
      optionsModel: false,
    }));
  };

  return (
    <div className="relative bg-white rounded-xl shadow-sm text-sm font-medium border-1 dark:bg-dark2">
      <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
        <Link href={`/profile/${user._id}`} className="relative w-9 h-9">
          <Image
            className="rounded-3xl"
            src={user?.avatar}
            alt="Picture of the author"
            fill={true}
            loading="lazy"
          />
        </Link>

        <div className="flex-1">
          <Link
            href={`/profile/${user._id}`}
            className="text-black dark:text-white"
          >
            {user?.fullName}
          </Link>
          <div className="text-xs text-gray-500 dark:text-white/80">
            {formatTimestamp(post?.createdAt)}
          </div>
        </div>
        <div className="-mr-1" ref={buttonRef}>
          <button
            type="button"
            className="button__ico w-8 h-8"
            onClick={handleOptionModel}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="256" cy="256" r="48"></circle>
              <circle cx="416" cy="256" r="48"></circle>
              <circle cx="96" cy="256" r="48"></circle>
            </svg>
          </button>
        </div>
      </div>

      {postAction.optionsModel && (
        <OptionsModel
          buttonRef={buttonRef}
          onClose={handleOtionModelClose}
          postId={post._id}
          userId={post?.user ?? user._id}
        />
      )}

      {post.post?.length > 0 ? (
        <div className="px-4">
          <div
            className="relative w-full h-[22rem] cursor-pointer"
            // onClick={() => console.log("Click")}
          >
            <PostSwiper posts={post.post} />
          </div>
          {post.text && (
            <div className="pt-2 flex gap-2">
              <Link href={`/profile/${user._id}`} className="font-bold">
                {user.fullName}
              </Link>
              <span className="font-medium whitespace-pre-line">
                {post.text}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="sm:px-4 p-2.5 pt-0">
          <p className="font-medium whitespace-pre-line">{post.text}</p>
        </div>
      )}

      {/* <!-- post icons --> */}
      <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className={`button__ico ${
              postAction.hasLiked
                ? "text-red-500 bg-red-100 dark:bg-slate-700"
                : "bg-slate-200/70"
            }`}
            onClick={() => handleLike(!postAction.hasLiked)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-lg"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 448a32 32 0 0 1-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 0 0 9.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 0 1-18 5.56z"></path>
            </svg>
          </button>
          <a href="#">{postAction.likesCount}</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="button__ico bg-slate-200/70 dark:bg-slate-700"
            onClick={() => {
              setPostAction((presVal) => ({
                ...presVal,
                commentModel: !presVal.commentModel,
              }));
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-lg"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M398 81.84A227.4 227.4 0 0 0 255.82 32C194.9 32 138 55.47 95.46 98.09 54.35 139.33 31.82 193.78 32 251.37a215.66 215.66 0 0 0 35.65 118.76l.19.27c.28.41.57.82.86 1.22s.65.92.73 1.05l.22.4c1.13 2 2 4.44 1.23 6.9l-18.42 66.66a29.13 29.13 0 0 0-1.2 7.63A25.69 25.69 0 0 0 76.83 480a29.44 29.44 0 0 0 10.45-2.29l67.49-24.36.85-.33a14.75 14.75 0 0 1 5.8-1.15 15.12 15.12 0 0 1 5.37 1c1.62.63 16.33 6.26 31.85 10.6 12.9 3.6 39.74 9 60.77 9 59.65 0 115.35-23.1 156.83-65.06C457.36 365.77 480 310.42 480 251.49a213.5 213.5 0 0 0-4.78-45c-10.34-48.62-37.76-92.9-77.22-124.65zM87.48 380zM160 288a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm96 0a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm96 0a32 32 0 1 1 32-32 32 32 0 0 1-32 32z"></path>
            </svg>
          </button>
          <span>{postAction.commentCount}</span>
        </div>
        <button type="button" className="button__ico ml-auto">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="m53.12 199.94 400-151.39a8 8 0 0 1 10.33 10.33l-151.39 400a8 8 0 0 1-15-.34l-67.4-166.09a16 16 0 0 0-10.11-10.11L53.46 215a8 8 0 0 1-.34-15.06zM460 52 227 285"
            ></path>
          </svg>
        </button>
        <button type="button" className="button__ico">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M336 192h40a40 40 0 0 1 40 40v192a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V232a40 40 0 0 1 40-40h40m160-64-80-80-80 80m80 193V48"
            ></path>
          </svg>
        </button>
      </div>

      {/* <!-- post caption --> */}
      {post?.length > 0 && post?.text?.trim()?.length > 0 && (
        <div className="sm:px-4 p-2.5 flex items-center gap-4">
          <p className="font-normal">
            <span className="font-bold">{user?.fullName}</span>{" "}
            <span className="whitespace-pre-line">{post?.text}</span>
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
