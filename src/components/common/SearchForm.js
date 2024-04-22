"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

function SearchForm({ search, onChange }) {
  const pathname = usePathname();

  const inputRef = useRef(null);

  useEffect(() => {
    if (!pathname.startsWith("/messages")) {
      inputRef?.current?.focus();
    }
  }, [pathname]);

  return (
    <form>
      <div className="relative -mx-1">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className="absolute top-2.5 left-2 text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path>
        </svg>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="bg-transparen w-full !pl-10 !py-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none focus-visible:outline-black"
          value={search}
          onChange={onChange}
        />
        <button type="submit" hidden></button>
      </div>
    </form>
  );
}

export default SearchForm;
