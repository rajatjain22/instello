import Link from "next/link";
import { IoCameraOutline, IoPlayOutline, IoPricetagsOutline } from "react-icons/io5";

export default function   StickyTabs() {
  return (
    <>
      <div className=''>
        <nav className='text-sm text-center text-gray-500 capitalize font-semibold dark:text-white'>
          <ul className='flex gap-2 justify-center border-t dark:border-slate-700'>
            <li>
              <Link
                href='#'
                className='flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white'
                aria-expanded='true'
              >
                <IoCameraOutline className="text-lg"/>
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
