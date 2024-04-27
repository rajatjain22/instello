"use client";

export default function page() {
  return (
    <div className="hidden flex-1 md:flex flex-col justify-center items-center">
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 256 256"
        className="w-[15%] h-auto pb-1"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M184.49,120.49l-32,32a12,12,0,0,1-17,0L112,129,88.49,152.49a12,12,0,0,1-17-17l32-32a12,12,0,0,1,17,0L144,127l23.51-23.52a12,12,0,0,1,17,17ZM236,128A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.05a12,12,0,0,1,1,9.82l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path>
      </svg>
      <p className="p-1 font-medium">Your messages</p>
      <p className="p-1 text-gray-400 text-sm">
        send private photo and messages to a friend or group
      </p>
    </div>
  );
}
