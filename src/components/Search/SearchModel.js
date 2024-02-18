import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import NavModel from "./NavModel";
import { UserPlaceholder } from "../Placeholders/UserPlaceholder";
import useOnClickOutside from "@/app/_hooks/useClickOutside";

export default function NewSearchModel({ onClose }) {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, onClose);
  
  const [search, setsearch] = useState({
    searchValue: "",
    searchUsers: [],
    searchLoading: true,
  });

  useEffect(() => {
    fetch("/api/users/all")
      .then((res) => res.json())
      .then((res) => {
        if (res?.message) {
          setsearch((presVal) => ({ ...presVal, searchUsers: res.data }));
        } else {
          throw new Error(res?.error);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setsearch((presVal) => ({ ...presVal, searchLoading: false }));
      });
  }, []);
  return (
    <div ref={modalRef}>
      <NavModel>
        {/* <!-- header --> */}
        <div class="sm:mt-0 mt-12 px-5 py-4 space-y-5 border-b border-gray-100 dark:border-slate-700">
          <h3 class="md:text-xl text-2xl font-medium mt-3 text-black dark:text-white">
            Search
          </h3>

          <div class="relative -mx-1">
            <IoSearch className="absolute top-2.5 left-2 text-xl" />

            <input
              type="text"
              placeholder="Search"
              className="bg-transparen w-full !pl-10 !py-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none"
              value={search.searchValue}
              onChange={(e) =>
                setsearch((presVal) => ({
                  ...presVal,
                  searchValue: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* <!-- contents list --> */}
        <div class="p-2 space-y-2 dark:text-white">
          <div class="flex items-center justify-between py-2.5 px-3 font-semibold">
            <h4>Recent</h4>
            <button type="button" class="text-blue-500 text-sm">
              Clear all
            </button>
          </div>

          {search.searchLoading ? (
            <>
              <UserPlaceholder />
              <UserPlaceholder />
              <UserPlaceholder />
            </>
          ) : search.searchUsers.length > 0 ? (
            search.searchUsers.map((user, index) => (
              <Link
                href={`/profile/${user._id}`}
                key={index}
                className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    className="bg-gray-200 rounded-full"
                    src={user.avatar}
                    alt="Picture of the author"
                    fill={true}
                    loading="lazy"
                  />
                </div>
                <div className="fldex-1 min-w-0">
                  <h4 className="font-medium text-sm text-black dark:text-white">
                    {user.fullName}
                  </h4>
                  <div className="text-xs text-gray-500 font-normal mt-0.5 dark:text-white-80">
                    Suggested For You
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-2.5 px-3">No users found.</div>
          )}
        </div>
      </NavModel>
    </div>
  );
}
