import React from "react";
import PostContainer from "../PostContainer/PostContainer";
import Story from "../Story/Story";

const MainContainer = ({ window: windoww, style = "" }) => {
  return (
    <div className={style + "show flex flex-col gap-4 w-full pb-[65px]"}>
        <Story /><PostContainer />
    </div>
  );
}

export default MainContainer;
