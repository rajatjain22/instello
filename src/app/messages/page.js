import { PiMessengerLogoBold } from "react-icons/pi";

export default function Home() {
  return (
    <div className="hidden flex-1 md:flex flex-col justify-center items-center">
      <PiMessengerLogoBold className="w-[15%] h-auto pb-1" />
      <p className="p-1 font-medium">Your messages</p>
      <p className="p-1 text-gray-400 text-sm">
        send private photo and messages to a friend or group
      </p>
    </div>
  );
}
