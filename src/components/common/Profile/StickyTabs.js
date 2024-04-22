"use client";

import Link from "next/link";

export default function StickyTabs() {
  return (
    <>
      <div className="">
        <nav className="text-sm text-center text-gray-500 capitalize font-semibold dark:text-white">
          <ul className="flex gap-2 justify-center border-t dark:border-slate-700">
            <li>
              <Link
                href="#"
                className="flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                aria-expanded="true"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-lg"
                >
                  <circle cx="256" cy="272" r="64"></circle>
                  <path d="M432 144h-59c-3 0-6.72-1.94-9.62-5l-25.94-40.94a15.52 15.52 0 0 0-1.37-1.85C327.11 85.76 315 80 302 80h-92c-13 0-25.11 5.76-34.07 16.21a15.52 15.52 0 0 0-1.37 1.85l-25.94 41c-2.22 2.42-5.34 5-8.62 5v-8a16 16 0 0 0-16-16h-24a16 16 0 0 0-16 16v8h-4a48.05 48.05 0 0 0-48 48V384a48.05 48.05 0 0 0 48 48h352a48.05 48.05 0 0 0 48-48V192a48.05 48.05 0 0 0-48-48zM256 368a96 96 0 1 1 96-96 96.11 96.11 0 0 1-96 96z"></path>
                </svg>
                Posts
              </Link>
            </li>
            {/* <li>
              <Link
                href='#'
                className='flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white'
                aria-expanded='false'
              >
                <IoPlayOutline className="text-lg"/>
                Reels
              </Link>
            </li>
            <li>
              <Link
                href='#'
                className='flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white'
                aria-expanded='false'
              >
                <IoPricetagsOutline className="text-lg"/>
                Tagged
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
}
