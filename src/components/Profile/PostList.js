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
      {posts.length > 0 ? (
        <div className="mt-8">
          {/* <!-- post heading --> */}
          {/* <div className='flex items-center justify-between py-3'>
            <h1 className='text-xl font-bold text-black dark:text-white'>
              Posts
            </h1> */}

          {/* <a href='#' className='text-sm font-semibold flex items-center gap-2'>
            Show acheived
            <IoChevronForwardOutline />
          </a> */}
          {/* </div> */}

          {/* <!-- Post list --> */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {posts.map((post, index) => {
              const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
                post.post[0]
              );
              const isVideo = /\.(mp4|webm|ogv|mpg|mpeg)$/.test(post.post[0]);
              return (
                post?.post.length > 0 && (
                  <div
                    key={`post${index}`}
                    className="shadow-slate-300 p-1 cursor-pointer lg:hover:scale-105 shadow-lg hover:shadow-2xl hover:z-10 duration-500 delay-100"
                  >
                    <div className="relative w-full lg:h-60 h-full aspect-[3/3]">
                      {isImage && (
                        <Image
                          className="object-cover"
                          src={post.post[0]}
                          alt="Picture of the author"
                          fill={true}
                          loading="lazy"
                        />
                      )}

                      {isVideo && (
                        <video
                          className="block w-full h-full object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2"
                          src={post.post[0]}
                          alt={`Preview of Post`}
                          playsInline=""
                          // controls
                        />
                      )}

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
                )
              );
            })}
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
