export function UserPlaceholder() {
  return (
    <div className="animate-pulse flex space-x-4 p-2 items-center">
      <div className="rounded-full bg-slate-200 h-10 w-10"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="w-32 h-2.5 bg-slate-200 rounded-full dark:bg-slate-700"></div>
        <div className="w-48 h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
}

export function UserPlaceholderWithButton() {
  return (
    <div className="animate-pulse flex space-x-4 items-center">
      <div className="rounded-full bg-slate-200 h-10 w-10"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="w-24 h-2.5 bg-slate-200 rounded-full dark:bg-slate-700"></div>
        <div className="h-2 bg-slate-200 rounded w-32"></div>
      </div>
      <div className="w-16 h-7 bg-slate-200 rounded-full dark:bg-slate-700 "></div>
    </div>
  );
}
