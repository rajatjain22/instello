import { PostContext } from "@/app/_context/Post";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";

const FilePreview = ({ i, file, filesRef, setFileRef, isFeed }) => {
    const { setModalImage } = useContext(PostContext);
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

    const handleClick = () => {
        setModalImage({
            url: url,
            open: true,
        });
    };

    return (
        <>
            <div className="slide flex-shrink-0 w-[36vw] h-[calc(30vw*1.5)] sm:w-[36vw] sm:h-[calc(30vw*1.5)] md:w-[20vw] md:h-[calc(16vw*1.5)]  overflow-clip relative mx-2 snap-center rounded-3xl">
                {isImage && (
                    <img
                        onClick={handleClick}
                        src={url}
                        width={200}
                        height={"500px"}
                        className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
                        alt={`Preview of post`}
                    />
                )}
                {isVideo && (
                    <video
                        onClick={handleClick}
                        className=" block w-full h-full object-cover object-center absolute right-0 animate-parallax [animation-timeline:view(x)] mb-2 rounded-lg"
                        autoPlay
                        width={300}
                        height={240}
                        src={url}
                        alt={`Preview of Post`}
                    />
                )}
                {!isFeed && (
                    <div
                        sx={{
                            fontSize: "30px",
                        }}
                        onClick={() => {
                            filesRef.splice(i, 1);
                            return setFileRef([...filesRef]);
                        }}
                        className=" absolute right-3 top-2 px-2 py-2 rounded-full bg-bg-card text-white group cursor-pointer backdrop-blur-[2px]"
                   ><IoClose /></div>
                )}
            </div>
        </>
    );
};

export default FilePreview;
