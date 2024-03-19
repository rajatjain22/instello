"use client";

export default function NavModel({ children }) {
  return (
    <div className="ml:0 sm:ml-[--w-side-small] md:ml-[--w-side-md] lg:ml-[--w-side] z-10 animate-slideLeftToRight fixed sm:w-[397px] w-full bg-white shadow-lg top-0 dark:bg-dark2 dark:border1 max-md:bottom-[57px] h-screen">
      <div className="sm:h-screen overflow-y-auto h-[calc(100vh-52px)] mt-10 sm:mt-1 pb-10 sm:pb-5">
        {children}
      </div>
    </div>
  );
}
