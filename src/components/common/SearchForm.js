import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

function SearchForm({ search, onChange }) {
  const pathname = usePathname();

  const inputRef = useRef(null);

  useEffect(() => {
    if (pathname !== "/messages") {
      inputRef?.current?.focus();
    }
  }, []);

  return (
    <form>
      <div className="relative -mx-1">
        <IoSearch className="absolute top-2.5 left-2 text-xl" />

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
