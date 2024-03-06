"use client";
import MainContainer from "./MainContainer";

const PageWrapper = () => {
  return (
    <>
      <div className="max-[660px]:px-4 w-full flex  gap-4">
        <MainContainer window={"mobile"} style={"pb-[69px] md:pb-0 "} />
      </div>
    </>
  );
};

export default PageWrapper;
