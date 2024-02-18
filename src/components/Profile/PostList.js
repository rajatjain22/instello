import Image from "next/image";
import {
  IoChatbubbleEllipses,
  IoChevronForwardOutline,
  IoHeartCircle,
} from "react-icons/io5";

export default function PostList({ posts }) {
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 py-3">
        <h1 className="text-xl font-bold text-black dark:text-white">No Posts</h1>
      </div>
    );
  }
  return (
    <>
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
          {posts.map((post, index) => (
            <div key={`post${index}`} className="lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100">
              <div className="relative overflow-hidden rounded-lg uk-transition-toggle">
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
          ))}
        </div>
      </div>

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
