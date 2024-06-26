"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

export default function PostSwiper({ posts, model = false }) {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper w-full h-full ${
        !model && "bg-[#f3f3f3] rounded-3xl"
      }`}
    >
      {posts.map((post, i) => {
        const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(post);
        const isVideo = /\.(mp4|webm|ogv|mpg|mpeg)$/.test(post);

        return (
          <SwiperSlide key={i} className="w-full h-full">
            <>
              {isImage && (
                <div className="relative w-full h-full" key={i}>
                  <Image
                    className="object-contain"
                    src={post}
                    alt="Picture of the author"
                    fill={true}
                    loading="lazy"
                  />
                </div>
              )}

              {isVideo && (
                <video
                  className="block w-full h-full object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2"
                  autoPlay={false}
                  // loop={true}
                  src={post}
                  alt={`Preview of Post`}
                  // playsInline=""
                  muted={false}
                  controls={true}
                />
              )}
            </>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
