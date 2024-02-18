import { IoChevronBack } from "react-icons/io5";

export default function HightlightList() {
  return (
    <>
      <div className='mt-8'>
        {/* <!-- post heading --> */}
        <div className='flex items-center justify-between py-3'>
          <h1 className='text-xl font-bold text-black dark:text-white'>
            Highths
          </h1>

          <button type='button' className='lg:hidden'>
            <svg
              id='icon__outline'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
          </button>
        </div>

        <div className='relative mt-5'>
          <div className='overflow-hidden py-10'>
            <ul className='flex -ml-2  w-[calc(100%+0.875rem)]'>
              <li className='lg:w-1/5 sm:w-1/4 w-1/3 pr-3.5 max-lg:hidden'>
                <div className='flex flex-col items-center justify-center rounded-lg h-64 border-2 border-dashed border-teal-600'>
                  <ion-icon
                    name='add-circle'
                    className='text-4xl text-teal-900 md hydrated'
                    role='img'
                    aria-label='add circle'
                  ></ion-icon>
                  <div className='mt-1 font-semibold'>Add New</div>
                </div>
              </li>
              <li className='lg:w-1/5 sm:w-1/4 w-1/3 pr-3.5' tabindex='-1'>
                <a
                  href='assets/images/avatars/avatar-lg-1.jpg'
                  data-caption='Caption'
                >
                  <div className=' lg:hover:scale-105 hover:shadow-lg hover:z-10 duration-500 delay-100'>
                    <div className='w-full lg:h-64 aspect-[2.5/4] realtive'>
                      <img
                        src='/people-know/avatar-2.jpg'
                        className='rounded-lg w-full h-full object-cover inset-0'
                        alt=''
                      />
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <button
            type='button'
            className='absolute -translate-y-1/2 bg-white rounded-full top-1/2 -left-4 grid w-9 h-9 place-items-center shadow dark:bg-dark3'
          >
            <IoChevronBack />
          </button>
          <button
            type='button'
            className='absolute -right-4 -translate-y-1/2 bg-white rounded-full top-1/2 grid w-9 h-9 place-items-center shadow dark:bg-dark3'
          >
            {" "}
            <ion-icon
              name='chevron-forward'
              className='text-2xl md hydrated'
              role='img'
              aria-label='chevron forward'
            ></ion-icon>
          </button>
        </div>
      </div>
    </>
  );
}
