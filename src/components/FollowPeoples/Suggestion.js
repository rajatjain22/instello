import Link from "next/link";

export default function Suggestion() {
  return (
    <div className="mt-10">
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 text-xs font-normal text-gray-500 dark:text-white/80">
      <div className="flex flex-col items-center shadow-sm p-2 rounded-xl bg-white border1 dark:bg-dark2">
        <Link href="profile.html">
          <div className="relative w-20 h-20 mx-auto mt-3">
            <img
              src="/people-know/avatar-6.jpg"
              alt=""
              className="h-full object-cover rounded-full shadow w-full"
            />
          </div>
        </Link>
        <div className="mt-5 text-center w-full">
          <Link href="profile.html">
            <h4 className="font-semibold text-sm text-black dark:text-white">
              Jesse Steeve
            </h4>
          </Link>
          <div className="mt-1"> 15K Followers</div>
          <button
            type="button"
            className="block font-semibold mt-4 py-1.5 rounded-lg text-[13px] w-full bg-slate-100/70 dark:bg-slate-700"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
