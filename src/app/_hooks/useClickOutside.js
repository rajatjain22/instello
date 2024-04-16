"use client";

import { useEffect } from "react";

function useOnClickOutside(refs, handler) {
  useEffect(() => {
    const handleClick = (event) => {
      let isOutside = true;
      for (const ref of refs) {
        if (ref?.current && ref.current.contains(event.target)) {
          isOutside = false;
          break;
        }
      }
      if (isOutside) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [refs, handler]);
}

export default useOnClickOutside;
