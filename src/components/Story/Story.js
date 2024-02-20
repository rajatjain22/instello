import Image from "next/image";
import { IoIosCamera } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function Story() {
  return (
    <div className="sm:mt-0 mt-6">
      <h3 className='font-extrabold text-2xl text-black dark:text-white'>
        Stories
      </h3>

      <div className='relative overflow-x-scroll'>
        <div className='py-5 container'>
          <ul className='w-[calc(100%+14px)] flex'>
            <li className='md:pr-3 '>
              <div className='md:w-20 md:h-20 w-12 h-12 rounded-full relative border-2 border-dashed grid place-items-center bg-slate-200 border-slate-300 dark:border-slate-700 dark:bg-dark2'>
                <IoIosCamera />
              </div>
            </li>
            <li className='md:pr-2.5 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300 '>
              <div className='md:w-20 md:h-20 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700'>
                <Image
                  className=''
                  src='/people-know/avatar-2.jpg'
                  alt='Picture of the author'
                  fill={true}
                  loading='lazy'
                />
              </div>
            </li>
          </ul>
        </div>

        <div className='max-md:hidden'>
          <button
            type='button'
            className='absolute -translate-y-1/2 bg-white shadow rounded-full top-1/2 -left-3.5 grid w-8 h-8 place-items-center dark:bg-dark3'
          >
            <IoChevronBack />
          </button>
          <button
            type='button'
            className='absolute -right-2 -translate-y-1/2 bg-white shadow rounded-full top-1/2 grid w-8 h-8 place-items-center dark:bg-dark3'
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Story;
