export function FollowPeoplePlaceholder() {
  return (
    <div className='animate-pulse bg-white flex gap-4 items-center flex-wrap justify-between p-5 rounded-lg shadow-sm border1 dark:bg-dark2'>
      <div className='rounded-full bg-slate-200 h-10 w-10'></div>
      <div className='flex-1 space-y-2 py-1'>
        <div className='w-24 h-2.5 bg-slate-200 rounded-full dark:bg-slate-700'></div>
        <div className='h-2 bg-slate-200 rounded w-32'></div>
      </div>
      <div className='w-16 h-7 bg-slate-200 rounded-full dark:bg-slate-700 '></div>
    </div>
  );
}
