"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import NavModel from "../common/NavModel";
import { UserPlaceholder } from "../Placeholders/UserPlaceholder";
import useOnClickOutside from "@/app/_hooks/useClickOutside";
import SearchForm from "../common/SearchForm";
import User from "../common/User";
import { debounce } from "@/helpers/debounce";

export default function NewSearchModel({
  onClose,
  sideref,
  topref,
  bottomref,
}) {
  const modalRef = useRef(null);
  useOnClickOutside([modalRef, sideref, topref, bottomref], onClose);

  const [search, setSearch] = useState({
    searchValue: "",
    searchUsers: [],
    searchLoading: false,
  });

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      searchValue: value,
      searchLoading: value ? true : false,
    }));
  };

  const handleSearch = async (value, signal = "") => {
    if (!value) return false;
    try {
      const request = {
        method: "POST",
        body: JSON.stringify({ search: value }),
        signal,
      };
      const response = await fetch("/api/users/search", request);
      const resJson = await response.json();
      if (response.ok) {
        setSearch((presVal) => ({ ...presVal, searchUsers: resJson.users }));
      } else {
        console.log(resJson.error);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSearch((presVal) => ({ ...presVal, searchLoading: false }));
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    if (search.searchValue) {
      let abortController = new AbortController();
      const signal = abortController.signal;
      setSearch((presVal) => ({ ...presVal, searchLoading: true }));
      console.log("object");
      debouncedSearch(search.searchValue, signal);

      return () => {
        abortController.abort();
      };
    }
  }, [search.searchValue, debouncedSearch]);

  return (
    <div ref={modalRef}>
      <NavModel>
        {/* <!-- header --> */}
        <div className="px-5 py-4 space-y-5 border-b border-gray-100 dark:border-slate-700">
          <h3 className="md:text-xl text-2xl font-medium mt-3 text-black dark:text-white">
            Search
          </h3>

          <SearchForm
            search={search.searchValue}
            onChange={handleChangeInput}
          />
        </div>

        {/* <!-- contents list --> */}
        <div className="p-2 dark:text-white">
          <div className="flex items-center justify-between py-2.5 px-3 font-semibold">
            <h4>Recent</h4>
            <button type="button" className="text-blue-500 text-sm">
              Clear all
            </button>
          </div>

          {search.searchLoading ? (
            <>
              <UserPlaceholder />
              <UserPlaceholder />
              <UserPlaceholder />
            </>
          ) : search?.searchUsers?.length > 0 ? (
            search.searchUsers.map((user, index) => (
              <div
                key={index}
                className="m-0 hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg"
                onClick={onClose}
              >
                <User
                  className={
                    "cursor-pointer relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                  }
                  user={user}
                  key={index}
                  followButton={false}
                  onClose={onClose}
                />
              </div>
            ))
          ) : (
            <div className="py-2.5 px-3 font-sm font-medium text-gray-600 ">
              {search.searchValue ? "No users found." : "No  recent searches."}
            </div>
          )}
        </div>
      </NavModel>
    </div>
  );
}
