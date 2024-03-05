export default function NavModel({ children }) {
  return (
    <div className='animate-slideLeftToRight fixed sm:w-[397px] w-full bg-white shadow-lg top-0 dark:bg-dark2 dark:border1 max-md:bottom-[57px] h-screen'>
      <div className='sm:h-screen overflow-y-auto h-[calc(100vh-52px)]'>
        {children}
      </div>
    </div>
  );
}
