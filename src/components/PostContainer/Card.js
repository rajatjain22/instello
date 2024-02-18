import React from "react";

const Card = ({ children, style = "" }) => {
    return <div className={"bg-bg-card  rounded-2xl h-fit " + style}>{children}</div>;
};

export default Card;
