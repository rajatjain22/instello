import React from "react";

export default function PostPlaceholder() {
  return (
    <div>
      <div className="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-300/20"></div>
          <div className="flex-1 space-y-3">
            <div className="w-40 h-5 rounded-md bg-slate-300/20"></div>
            <div className="w-24 h-4 rounded-md bg-slate-300/20"></div>
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-300/20"></div>
        </div>

        <div className="w-full h-52 rounded-lg bg-slate-300/10 my-3"> </div>

        <div className="flex gap-3">
          <div className="w-16 h-5 rounded-md bg-slate-300/20"></div>

          <div className="w-14 h-5 rounded-md bg-slate-300/20"></div>

          <div className="w-6 h-6 rounded-full bg-slate-300/20 ml-auto"></div>
          <div className="w-6 h-6 rounded-full bg-slate-300/20  "></div>
        </div>
      </div>
    </div>
  );
}
