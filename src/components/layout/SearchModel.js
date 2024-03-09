import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import NavModel from "../common/NavModel";
import { UserPlaceholder } from "../Placeholders/UserPlaceholder";
import useOnClickOutside from "@/app/_hooks/useClickOutside";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SearchForm from "../common/SearchForm";
import User from "../common/User";

export default function NewSearchModel({
  onClose,
  sideref,
  topref,
  bottomref,
}) {
  const modalRef = useRef(null);
  const router = useRouter();
  useOnClickOutside(modalRef, onClose, sideref, topref, bottomref);

  const [search, setsearch] = useState({
    searchValue: "",
    searchUsers: [],
    searchLoading: false,
  });

  const handleSearch = async () => {
    if (!search.searchValue) {
      toast.error("Please enter value!");
      return false;
    }
    try {
      setsearch((presVal) => ({ ...presVal, searchLoading: true }));
      const request = {
        method: "POST",
        body: JSON.stringify({ search: search.searchValue }),
      };
      const response = await fetch("/api/users/search", request);
      const resJson = await response.json();
      if (response.ok) {
        setsearch((presVal) => ({ ...presVal, searchUsers: resJson.users }));
      } else {
        console.log(resJson.error);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setsearch((presVal) => ({ ...presVal, searchLoading: false }));
    }
  };

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
            onChange={(e) =>
              setsearch((presVal) => ({
                ...presVal,
                searchValue: e.target.value,
              }))
            }
            handleSearch={handleSearch}
          />
        </div>

        {/* <!-- contents list --> */}
        <div className="p-2 space-y-2 dark:text-white">
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
              <User
                className={
                  "cursor-pointer relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                }
                user={user}
                key={index}
                followButton={false}
              />
            ))
          ) : (
            <div className="py-2.5 px-3">No users found.</div>
          )}
        </div>
      </NavModel>
    </div>
  );
}
