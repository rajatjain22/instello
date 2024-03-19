"use client";
import Image from "next/image";

export default function ShortList() {
  return (
    <>
      <div className='pt-16'>
        <div className='grid lg:grid-cols-3 grid-cols-2 gap-4'>
          <div className='relative lg:rounded-xl rounded-md overflow-hidden shadow bg-white dark:bg-dark2'>
            {/* <!-- heading --> */}
            <div className='flex items-center gap-3 sm:px-4 py-3 p-2 text-sm font-normal'>
              <a href='profile.html' className='relative w-6 h-6 max-md:hidden'>
                <Image
                  src='/people-know/avatar-2.jpg'
                  alt='short'
                  className='rounded-full'
                  fill={true}
                  loader='lazy'
                />
              </a>
              <div className='flex-1'>
                <a href='profile.html'>
                  <h4 className='text-black dark:text-white'>
                    {" "}
                    Monroe Parker{" "}
                  </h4>
                </a>
              </div>
            </div>

            {/* <!-- post image --> */}
            <a href='#preview_modal' aria-expanded='false'>
              <div className='relative w-full h-48'>
                <Image
                  src='/people-know/avatar-2.jpg'
                  alt=''
                  className='object-cover inset-0'
                  fill={true}
                  loader='lazy'
                />
              </div>
            </a>

            {/* <!-- post icons --> */}
            <div className='flex items-center md:gap-3 gap-1 md:py-2.5 md:px-3 p-1.5'>
              <button type='button' className='button__ico'>
                {" "}
                <ion-icon
                  className='md:text-2xl text-lg md hydrated'
                  name='heart-outline'
                  role='img'
                  aria-label='heart outline'
                ></ion-icon>{" "}
              </button>
              <button type='button' className='button__ico'>
                {" "}
                <ion-icon
                  className='md:text-2xl text-lg md hydrated'
                  name='chatbubble-ellipses-outline'
                  role='img'
                  aria-label='chatbubble ellipses outline'
                ></ion-icon>{" "}
              </button>
              <button type='button' className='button__ico ml-auto'>
                {" "}
                <ion-icon
                  className='md:text-2xl text-lg md hydrated'
                  name='bookmark-outline'
                  role='img'
                  aria-label='bookmark outline'
                ></ion-icon>{" "}
              </button>
            </div>
          </div>
        </div>

        {/* <!-- load more --> */}
        <div className='flex justify-center my-6'>
          <button
            type='button'
            className='bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-dark2'
          >
            Load more...
          </button>
        </div>
      </div>
    </>
  );
}
