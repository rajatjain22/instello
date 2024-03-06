import { IoDocumentText, IoGift, IoImage, IoImages } from "react-icons/io5";

export default function DocumentModel() {
  return (
    <>
      <div className='dropbar pt-36 h-60 bg-gradient-to-t via-white from-white via-30% from-30% dark:from-slate-900 dark:via-900'>
        <div className='sm:w-full p-3 flex justify-center gap-5'>
          <button
            type='button'
            className='bg-sky-50 text-sky-600 border border-sky-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0'
          >
            <IoImage className='text-3xl flex md' />
          </button>
          <button
            type='button'
            className='bg-green-50 text-green-600 border border-green-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0'
          >
            <IoImages className='text-3xl flex md' />
          </button>
          <button
            type='button'
            className='bg-pink-50 text-pink-600 border border-pink-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0'
          >
            <IoDocumentText className='text-3xl flex md' />
          </button>
          <button
            type='button'
            className='bg-orange-50 text-orange-600 border border-orange-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0'
          >
            <IoGift className='text-3xl flex md' />
          </button>
        </div>
      </div>
    </>
  );
}
