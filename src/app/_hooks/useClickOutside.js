"use client";

import { useEffect } from "react";

function useOnClickOutside(ref, handler, additionalRef) {
  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        additionalRef.current &&
        !additionalRef.current.contains(event.target)
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, handler, additionalRef]);
}

export default useOnClickOutside;
