import { useCallback, useContext, useEffect } from "react";
import { UserContext } from "@/app/_context/User";
import { Back, CheckMarkCircle, Setting } from "@/components/Icons/SvgIcons";
import SearchForm from "@/components/common/SearchForm";
import Link from "next/link";
import { debounce } from "@/helpers/debounce";

export default function Heading({ search, setSearch }) {
  const { userDetails } = useContext(UserContext);

  const handleSearch = async (value, signal = "") => {
    if (!value) {
      toast.error("Please enter value!");
      return false;
    }
    try {
      setSearch((presVal) => ({ ...presVal, searchLoading: true }));
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
    if (search.text) {
      let abortController = new AbortController();
      const signal = abortController.signal;
      setSearch((presVal) => ({ ...presVal, searchLoading: true }));
      debouncedSearch(search.text, signal);

      return () => {
        abortController.abort();
      };
    }
  }, [search.text, debouncedSearch]);
  
  return (
    <div className="p-4 border-b dark:border-slate-700">
      <div className="flex my-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="md:hidden pl-2">
            <Back className={"text-2xl -ml-4 md"} />
          </Link>
          <h2 className="text-2xl font-bold text-black ml-1 dark:text-white">
            {userDetails.fullName}
          </h2>
        </div>

        {/* <!-- right action buttons --> */}
        <div className="flex items-center gap-2.5">
          <button className="group">
            <Setting
              className={"text-2xl flex group-aria-expanded:rotate-180 md"}
            />
          </button>
          <button className="">
            <CheckMarkCircle className={"text-2xl flex md"} />
          </button>
        </div>
      </div>

      {/* <!-- search --> */}
      <SearchForm
        search={search.text}
        onChange={(e) =>
          setSearch((presVal) => ({
            ...presVal,
            text: e.target.value,
          }))
        }
        handleSearch={handleSearch}
      />
    </div>
  );
}
