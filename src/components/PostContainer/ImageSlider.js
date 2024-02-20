import React, { useEffect, useRef } from "react";
import FilePreview from "./FilePreview";

const ImageSlider = ({ filesRef, setFileRef, isFeed }) => {
    // const [filesRef, setFileRef] = useState([]);
    const slidesContainerRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    useEffect(() => {
        const slideWidth = slidesContainerRef.current.querySelector(".slide")?.clientWidth;
    
        const handleNextClick = () => {
            if (slideWidth) {
                slidesContainerRef.current.scrollLeft += slideWidth;
            }
        };
    
        const handlePrevClick = () => {
            if (slideWidth) {
                slidesContainerRef.current.scrollLeft -= slideWidth;
            }
        };
    
        const nextButton = nextButtonRef?.current;
        const prevButton = prevButtonRef?.current;
    
        if (nextButton && prevButton) {
            nextButton.addEventListener("click", handleNextClick);
            prevButton.addEventListener("click", handlePrevClick);
        }
    
        return () => {
            // Cleanup function for event listeners
            if (nextButton && prevButton) {
                nextButton.removeEventListener("click", handleNextClick);
                prevButton.removeEventListener("click", handlePrevClick);
            }
        };
    }, [slidesContainerRef, nextButtonRef, prevButtonRef]);
    

    return (
        <div className="relative text-zinc-50 font-generalSans">
            <div
                ref={slidesContainerRef}
                className="no-scrollbar slides overflow-scroll smooth-scroll w-full whitespace-nowrap touch-pan-x before:shrink-0 after:shrink-0  snap-mandatory flex snap-x"
            >
                {filesRef.length > 0
                    ? filesRef.map((file, idx) => (
                          <FilePreview
                              key={idx}
                              i={idx}
                              filesRef={filesRef}
                              file={file}
                              setFileRef={setFileRef}
                              isFeed={isFeed}
                          />
                      ))
                    : ""}
            </div>
           

            {filesRef?.length > 2 ? (
                <>
                    {/* <!-- Buttons	 --> */}
                    <div className="absolute  -left-4  top-1/2 items-center hidden md:flex">
                        <button
                            ref={prevButtonRef}
                            role="button"
                            className="prev px-2 py-2 rounded-full  bg-bg-card text-white group"
                            aria-label="prev"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 group-active:-translate-x-2 transition-all duration-200 ease-linear"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute  -right-[15px] top-1/2  items-center hidden md:flex">
                        <button
                            ref={nextButtonRef}
                            role="button"
                            className="next px-2 py-2 rounded-full bg-bg-card text-white group"
                            aria-label="next"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 group-active:translate-x-2 transition-all duration-200 ease-linear"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ImageSlider;