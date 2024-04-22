"use client";

import Image from "next/image";

const FilePreview = ({ i, file, filesRef, setFileRef, isFeed }) => {
  if (!file) return null;
  let isImage, isVideo, url;

  if (isFeed) {
    isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(file);
    isVideo = /\.(mp4|webm|ogv|mpg|mpeg)$/.test(file);
    url = file;
  } else {
    url = URL.createObjectURL(file); // Create temporary URL using URL.createObjectURL

    // Determine file type based on mimeType or extension
    isImage = file.type.startsWith("image/");
    isVideo = file.type.startsWith("video/");
  }

  return (
    <div
      className={`bg-white flex-shrink-0  h-[calc(30vw*1.5)] sm:h-[calc(30vw*1.5)] md:h-[calc(16vw*1.5)]  relative ${
        !isFeed && "w-[36vw] sm:w-[36vw] md:w-[20vw] mx-2"
      }`}
    >
      {isImage && (
        <Image
          src={url}
          className={`${
            !isFeed ? "object-cover" : "object-contain"
          } animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg`}
          alt={`Preview of post`}
          fill
        />
      )}
      {isVideo && (
        <>
          <video
            className={`${
              !isFeed ? "object-cover" : "object-contain"
            } w-full h-full animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg`}
            autoPlay={false}
            src={url}
            alt={`Preview of Post`}
            muted={true}
            controls={!isFeed}
          />
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="absolute top-2 right-2 text-xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M13.05 9.79 10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zm0 0L10 7.5v9l3.05-2.29L16 12zM11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69A7.941 7.941 0 0 1 11 4.07zM5.69 7.1 4.26 5.68A9.949 9.949 0 0 0 2.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM4.07 13H2.05c.2 2.01 1 3.84 2.21 5.32l1.43-1.43A7.868 7.868 0 0 1 4.07 13zm1.61 6.74A9.981 9.981 0 0 0 11 21.95v-2.02a7.941 7.941 0 0 1-3.9-1.62l-1.42 1.43zM22 12c0 5.16-3.92 9.42-8.95 9.95v-2.02C16.97 19.41 20 16.05 20 12s-3.03-7.41-6.95-7.93V2.05C18.08 2.58 22 6.84 22 12z"></path>
          </svg>
        </>
      )}
      {!isFeed && (
        <div
          onClick={() => {
            filesRef.splice(i, 1);
            return setFileRef([...filesRef]);
          }}
          className="absolute right-3 top-2 px-2 py-2 rounded-full bg-bg-card text-black bg-[#f7f7f7] group cursor-pointer backdrop-blur-[2px]"
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
            <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
