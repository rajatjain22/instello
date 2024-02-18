export default function NavModel({ children }) {
  return (
    <div class="fixed sm:w-[397px] w-full bg-white shadow-lg top-0 dark:bg-dark2 dark:border1 max-md:bottom-[57px] h-screen">
      <div class="sm:h-screen overflow-y-auto h-[calc(100vh-52px)]">
        {children}
      </div>
    </div>
  );
}
