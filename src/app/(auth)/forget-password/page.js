import Image from "next/image";
export default function page() {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className='max-w-sm mx-auto md:px-10 p-4 w-full'>
        <div className='relative h-16 px-3 rounded-2xl p-2.5 my-5 mx-auto'>
          <Image
            src="/logo.svg"
            alt="profile"
            fill={true}
          />
        </div>
      </div>
    </div>
  );
}
