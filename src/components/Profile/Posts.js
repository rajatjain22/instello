"use client";

import { UserContext } from "@/app/_context/User";
import { formatTimestamp } from "@/helpers/all";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import {
  IoHeart,
  IoChatbubbleEllipses,
  IoPaperPlaneOutline,
  IoShareOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";

export default function PostImage({ post }) {
  return (
    <div className='bg-white rounded-xl shadow-sm text-sm font-medium border-1 dark:bg-dark2'>
      <div className='flex gap-3 sm:p-4 p-2.5 text-sm font-medium'>
        <Link href={`/profile/${post.user._id}`} className='relative w-9 h-9'>
          <Image
            className='rounded-3xl'
            // src={post?.user?.avatar}
            alt='Picture of the author'
            fill={true}
            loading='lazy'
          />
        </Link>

        <div className='flex-1'>
          <h4 className='text-black dark:text-white'>{post?.user?.fullName}</h4>
          <div className='text-xs text-gray-500 dark:text-white/80'>
            {/* {formatTimestamp(post?.createdAt)} */}
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

      {post?.post.length > 0 ? (
        <div className='relative w-full h-96 px-4'>
          <div className='relative w-full h-full'>
            <Image
              className='rounded-3xl object-cover'
            //   src={post?.post[0]}
              alt='Picture of the author'
              fill={true}
              loading='lazy'
            />
          </div>
        </div>
      ) : (
        <div className='sm:px-4 p-2.5 pt-0'>
          {/* <p className='font-medium'>{post.text}</p> */}
        </div>
      )}

      {/* <!-- post icons --> */}
      <div className='sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold'>
        <div className='flex items-center gap-2.5'>
          <button
            type='button'
            className='button__ico text-red-500 bg-red-100 dark:bg-slate-700'
          >
            <IoHeart className='text-lg' />
          </button>
          <a href='#'>1,380</a>
        </div>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            className='button__ico bg-slate-200/70 dark:bg-slate-700'
          >
            <IoChatbubbleEllipses className='text-lg' />
          </button>
          <span>260</span>
        </div>
        <button type='button' className='button__ico ml-auto'>
          <IoPaperPlaneOutline className='text-lg' />
        </button>
        <button type='button' className='button__ico'>
          <IoShareOutline className='text-lg' />
        </button>
      </div>

      {/* <!-- post caption --> */}
      {/* {post?.post.length > 0 && post?.text.trim().length > 0 && (
        <div className='sm:px-4 p-2.5 flex items-center gap-4'>
          <p className='font-normal'>
            <span className='font-bold'>{post?.user?.fullName}</span>{" "}
            <span>{post?.text}</span>
          </p>
        </div>
      )} */}
      <div className='sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40'>
        <div className='relative w-6 h-6 mt-1'>
          <Image
            className='rounded-full'
            // src={userDetails.avatar}
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
      </div>
    </div>
  );
}
