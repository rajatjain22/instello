"use client";
import Image from "next/image";

export default function ReelList() {
    

    return (
        <>
            <div className='pt-16'>
            <div className='grid gap-3 lg:gap-4 lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-3 grid-cols-2'>
              {/* <!-- single reels --> */}
              <div className='lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100'>
                <a href='#'>
                  <div className='relative w-full lg:h-[270px] aspect-[2.5/4] overflow-hidden rounded-lg shrink-0'>
                    <Image
                      className='object-cover w-full h-full'
                      src='/people-know/avatar-2.jpg'
                      alt='reel'
                      fill={true}
                      loading="lazy"
                    />

                    <div className='w-full bottom-0 absolute left-0 bg-gradient-to-t from-black/60 pt-20'>
                      <div className='flex items-center gap-2.5 text-white p-3'>
                        <ion-icon
                          className='text-2xl md hydrated'
                          name='play-outline'
                          role='img'
                          aria-label='play outline'
                        ></ion-icon>{" "}
                        14
                      </div>
                    </div>
                  </div>
                </a>
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
    )
}
