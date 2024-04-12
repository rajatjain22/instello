"use client";
export default function IsPrivate() {
  return (
    <div className='mt-10 flex flex-col gap-8 max-w-[600px] my-0 mx-auto'>
      <div className='gap-2 border-t dark:border-slate-700 flex flex-col items-center justify-center font-medium'>
        <div className='pt-4'>This account is private</div>
        <div>Follow to see their photos and videos.</div>
      </div>
    </div>
  );
}
