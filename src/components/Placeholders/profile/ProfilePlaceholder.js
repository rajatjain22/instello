import PostPlaceholder from "./PostPlaceholder";

export default function ProfilePlaceholder() {
  return (
    <div className="py-6 relative">
      <div className="flex md:gap-16 gap-4 max-md:flex-col">
        {/* Placeholder for image */}
        <div className="flex gap-5 animate-pulse">
          <div className="relative flex justify-center md:w-40 md:h-40 h-16 w-16 shrink-0 aspect-[3/3] bg-slate-200/60 rounded-full"></div>

          <div className="flex items-center gap-3 md:hidden animate-pulse">
            <div className="w-16 sm:w-28 h-8 bg-slate-200 rounded"></div>
            <div className="w-16 sm:w-28 h-8 bg-slate-200 rounded"></div>
            <div className="w-16 sm:w-28 h-8 bg-slate-200 rounded"></div>
          </div>
        </div>

        <div className="flex flex-col w-full animate-pulse">
          <div className="flex-1 space-y-2 py-1">
            <div className="w-28 h-8 bg-slate-200 rounded"></div>
            <div className="w-full h-2 bg-slate-200 rounded"></div>
            <div className="w-full h-2 bg-slate-200 rounded"></div>
            <div className="w-[65%] h-2 bg-slate-200 rounded"></div>
            <div className="w-[55%] h-2 bg-slate-200 rounded"></div>
          </div>

          <div className="hidden gap-3 md:flex">
            <div className="w-28 h-8 bg-slate-200 rounded"></div>
            <div className="w-28 h-8 bg-slate-200 rounded"></div>
            <div className="w-28 h-8 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-8 max-w-[600px] my-0 mx-auto">
        <div className="flex gap-2 justify-center border-t dark:border-slate-700"></div>
        <div className="grid grid-cols-3 gap-3 mt-6">
          <PostPlaceholder />
          <PostPlaceholder />
          <PostPlaceholder />
        </div>
      </div>
    </div>
  );
}
