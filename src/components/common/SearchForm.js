import React from "react";
import { IoSearch } from "react-icons/io5";

function SearchForm({ search, onChange, handleSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="relative -mx-1">
        <IoSearch className="absolute top-2.5 left-2 text-xl" />

        <input
          type="text"
          placeholder="Search"
          className="bg-transparen w-full !pl-10 !py-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none"
          value={search}
          onChange={onChange}
        />
        <button type="submit" hidden></button>
      </div>
    </form>
  );
}

export default SearchForm;
