"use client";

import Image from "next/image";

function Story() {
  return (
    <div className="sm:mt-0 mt-6">
      <h3 className="font-extrabold text-2xl text-black dark:text-white">
        Stories
      </h3>

      <div className="no-scrollbar relative overflow-x-scroll">
        <div className="py-5 container">
          <ul className="w-[calc(100%+14px)] flex">
            <li className="md:pr-3 ">
              <div className="md:w-20 md:h-20 w-12 h-12 rounded-full relative border-2 border-dashed grid place-items-center bg-slate-200 border-slate-300 dark:border-slate-700 dark:bg-dark2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="256" cy="275" r="57.5"></circle>
                  <path d="M417.5 160H363c-4.6 0-8.9-2-12-5.4-28.4-31.8-39.1-42.6-50.7-42.6h-85.5c-11.7 0-23.2 10.8-51.7 42.7-3 3.4-7.4 5.3-11.9 5.3h-4.1v-8c0-4.4-3.6-8-8-8h-26c-4.4 0-8 3.6-8 8v8h-7.5C79.9 160 64 173.2 64 190.7v176c0 17.5 15.9 33.3 33.5 33.3h320c17.6 0 30.5-15.8 30.5-33.3v-176c0-17.5-12.9-30.7-30.5-30.7zM260 360.4c-50.3 2.3-91.7-39.1-89.4-89.4 2-43.9 37.5-79.4 81.4-81.4 50.3-2.3 91.7 39.1 89.4 89.4-2 43.9-37.5 79.4-81.4 81.4zM352 218c-7.2 0-13-5.8-13-13s5.8-13 13-13 13 5.8 13 13-5.8 13-13 13z"></path>
                </svg>
              </div>
            </li>
            <li className="md:pr-2.5 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300 ">
              <div className="md:w-20 md:h-20 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                <Image
                  className=""
                  src="/people-know/avatar-2.jpg"
                  alt="Picture of the author"
                  fill={true}
                  loading="lazy"
                />
              </div>
            </li>
          </ul>
        </div>

        <div className="max-md:hidden">
          <button
            type="button"
            className="absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -left-3.5 grid w-8 h-8 place-items-center dark:bg-dark3"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M328 112 184 256l144 144"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="absolute -right-2 -translate-y-1/2 bg-white shadow rounded-full top-1/2 grid w-8 h-8 place-items-center dark:bg-dark3"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="m184 112 144 144-144 144"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Story;
