"use client";

import Menu from "./Menu";
import TopLeft from "./TopLeft";

const TopBar = () => {
  return (
    <div className="flex justify-between gap-4 py-6 sticky top-0 bg-[#06141d8f] backdrop-blur-[2px] z-[1] max-[660px]:px-2 ">
      <TopLeft />
      <div className="flex gap-8 items-center">
       test
        <Menu style={"max-md:hidden "} />
      </div>
    </div>
  );
};

export default TopBar;
