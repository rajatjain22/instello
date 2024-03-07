"use client";

import { useEffect } from "react";

function useOnClickOutside(ref, handler, sideref, topref, bottomref) {
  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        sideref.current &&
        !sideref.current.contains(event.target) &&
        topref.current &&
        !topref.current.contains(event.target) &&
        bottomref.current &&
        !bottomref.current.contains(event.target)
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, handler, sideref, topref, bottomref]);
}

export default useOnClickOutside;
