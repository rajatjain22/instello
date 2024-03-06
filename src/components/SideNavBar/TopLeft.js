import React from "react";
import Image from "next/image";

const TopLeft = () => {
    return (
        <div className="flex gap-4 justify-start items-center">
            {/* <TwitterIcon className="text-tweet-blue" sx={{ fontSize: "35px" }} /> */}
            <Image src={"/assets/z.jpeg"} width={60} height={80} alt="" style={{ width: "auto", height: "auto" }} />
        </div>
    );
};

export default TopLeft;
