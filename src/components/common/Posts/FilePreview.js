import { IoClose } from "react-icons/io5";
import { MdSlowMotionVideo } from "react-icons/md";

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
    <>
      <div
        className={`slide flex-shrink-0  h-[calc(30vw*1.5)] sm:h-[calc(30vw*1.5)] md:h-[calc(16vw*1.5)] overflow-clip relative mx-2 snap-center rounded-3xl ${
          !isFeed && "w-[36vw] sm:w-[36vw] md:w-[20vw]"
        }`}
      >
        {isImage && (
          <img
            src={url}
            className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
            alt={`Preview of post`}
          />
        )}
        {isVideo && (
          <>
            <video
              className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
              autoPlay={!isFeed}
              src={url}
              alt={`Preview of Post`}
              muted={true}
              controls={!isFeed}
            />
            <MdSlowMotionVideo className="absolute top-2 right-2 text-xl"/>
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
            <IoClose />
          </div>
        )}
      </div>
    </>
  );
};

export default FilePreview;
