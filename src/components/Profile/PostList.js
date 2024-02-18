import Image from "next/image";
import Link from "next/link";
import {
  IoCameraOutline,
  IoChatbubbleEllipses,
  IoChevronForwardOutline,
  IoHeartCircle,
  IoPlayOutline,
  IoPricetagsOutline,
} from "react-icons/io5";

export default function PostList({ posts }) {
  return (
    <>
      <nav className="text-sm text-center text-gray-500 capitalize font-semibold dark:text-white">
        <ul className="flex gap-2 justify-center border-t dark:border-slate-700">
          <li>
            <Link
              href="#"
              className="flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
              aria-expanded="true"
            >
              <IoCameraOutline className="text-lg" />
              Posts
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
              aria-expanded="false"
            >
              <IoPlayOutline className="text-lg" />
              Texts
            </Link>
          </li>
          {/* <li>
            <Link
              href="#"
              className="flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
              aria-expanded="false"
            >
              <IoPlayOutline className="text-lg" />
              Reels
            </Link>
          </li> */}
          {/* <li>
            <Link
              href="#"
              className="flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
              aria-expanded="false"
            >
              <IoPricetagsOutline className="text-lg" />
              Tagged
            </Link>
          </li> */}
        </ul>
      </nav>

      {posts.length > 0 ? (
        <div className="mt-8">
          {/* <!-- post heading --> */}
          <div className="flex items-center justify-between py-3">
            <h1 className="text-xl font-bold text-black dark:text-white">
              Posts
            </h1>

            {/* <a href='#' className='text-sm font-semibold flex items-center gap-2'>
            Show acheived
            <IoChevronForwardOutline />
          </a> */}
          </div>

          {/* <!-- Post list --> */}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 mt-6">
            {posts.map((post, index) =>
              post?.post.length > 0 ? (
                <div
                  key={`post${index}`}
                  className="lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <div className="relative w-full lg:h-60 h-full aspect-[3/3]">
                      <Image
                        className="object-cover"
                        src={post?.post?.[0]}
                        alt="Picture of the author"
                        fill={true}
                        loading="lazy"
                      />
                    </div>
                    {/* <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'>
                <div className='flex items-center justify-center gap-4 text-white w-full h-full'>
                <div className='flex items-center gap-2'>
                <IoHeartCircle />
                510
                </div>
                <div className='flex items-center gap-2'>
                <IoChatbubbleEllipses />
                290
                </div>
                </div>
              </div> */}
                  </div>
                </div>
              ) : (
                <div
                  key={`post${index}`}
                  className="lg:hover:scale-105 shadow-2xl font-medium hover:z-10 duration-500 delay-100 rounded-lg p-3"
                >
                  {post?.text}
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 py-3">
          <h1 className="text-xl font-bold text-black dark:text-white">
            No Posts
          </h1>
        </div>
      )}

      {/* <!-- load more --> */}
      {/* <div className="flex justify-center my-6">
        <button
          type="button"
          className="bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-dark2"
        >
          Load more...
        </button>
      </div> */}
    </>
  );
}
