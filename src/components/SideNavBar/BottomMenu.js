"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";

 const bottomMenu = [
    {
        path: "/",
        icon:"t"
    },
    {
        path: "/explore",
        icon:"t"
    },
    {
        path: "/notifications",
        icon:"t"
    },
    {
        path: "/profile",
        icon:"t"
    },
];


const BottomMenu = () => {
    const pathname = usePathname();
    return (
        <>
            {bottomMenu.map((item, i) => {
                return (
                    <Link
                        key={i}
                        href={item.path}
                        className={
                            "flex justify-start items-center gap-2 " + (pathname == item.path ? " text-tweet-blue" : "")
                        }
                    >
                        {item.icon}
                    </Link>
                );
            })}
        </>
    );
};

export default BottomMenu;
