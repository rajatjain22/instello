"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { IoSyncSharp } from "react-icons/io5";

export default function SwiperPhotos() {
  return (
    <div className="custom-swiper my-4 bg-white rounded-xl shadow-sm p-5 px-6 border1 dark:bg-dark2 relative">
      <div className="flex justify-between text-black dark:text-white my-4">
        <h3 className="font-bold text-base">People you might know </h3>
        <button>
          <IoSyncSharp className="text-xl md hydrated" />
        </button>
      </div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          "--swiper-navigation-size": "60px",
        }}
        slidesPerView={2}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={true}
        className="rounded-xl p-5 px-6 border1 mySwiper"
      >
        {[...Array(3)].map((_, index) => (
          <SwiperSlide key={index} className="w-1/2">
            <div className="relative w-full h-40">
              <Image
                className="rounded-xl"
                src="/product-3.jpg"
                alt="Picture of the author"
                fill={true}
                loading="lazy"
              />
            </div>
            <div className="mt-3 w-full text-center font-medium"> Gaming Mouse</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
