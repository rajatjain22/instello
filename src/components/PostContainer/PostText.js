import Image from "next/image";
import {
  IoHeart,
  IoChatbubbleEllipses,
  IoPaperPlaneOutline,
  IoShareOutline,
  IoChevronDownOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";

export default function PostText() {
  return (
    <div className="bg-white rounded-xl shadow-sm text-sm font-medium border-1 dark:bg-dark2">
      <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
        <div className="relative w-9 h-9">
          <Image
            className="rounded-full"
            src="/people-know/avatar-2.jpg"
            alt="Picture of the author"
            fill={true}
            loading="lazy"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-black dark:text-white">Rajat Jain</h4>
          <div className="text-xs text-gray-500 dark:text-white/80">
            2 hours ago
          </div>
        </div>
        <div className="-mr-1">
          <button
            type="button"
            className="button__ico w-8 h-8"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <IoEllipsisHorizontal />
          </button>
        </div>
      </div>
      <div className="sm:px-4 p-2.5 pt-0">
        <p className="font-medium">
          Photography is the art of capturing light with a camera. It can be
          used to create images that tell stories, express emotions, or document
          reality. it can be fun, challenging, or rewarding. It can also be a
          hobby, a profession, or a passion. 📷
        </p>
      </div>

      {/* <!-- post icons --> */}
      <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="button__ico text-red-500 bg-red-100 dark:bg-slate-700"
          >
            <IoHeart className="text-lg" />
          </button>
          <a href="#">1,380</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="button__ico bg-slate-200/70 dark:bg-slate-700"
          >
            <IoChatbubbleEllipses className="text-lg" />
          </button>
          <span>260</span>
        </div>
        <button type="button" className="button__ico ml-auto">
          <IoPaperPlaneOutline className="text-lg" />
        </button>
        <button type="button" className="button__ico">
          <IoShareOutline className="text-lg" />
        </button>
      </div>

      <div className="sm:p-4 p-2.5 border-t border-gray-100 font-normal space-y-3 relative dark:border-slate-700/40">
        <div className="flex items-start gap-3 relative">
          <div className="relative w-6 h-6 mt-1">
            <Image
              className="rounded-full"
              src="/people-know/avatar-2.jpg"
              alt="Picture of the author"
              fill={true}
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <a
              href="profile.html"
              className="text-black font-medium inline-block dark:text-white"
            >
              Steeve
            </a>
            <p className="mt-0.5">What a beautiful photo! I love it. 😍 </p>
          </div>
        </div>
        <div className="flex items-start gap-3 relative">
          <div className="relative w-6 h-6 mt-1">
            <Image
              className="rounded-full"
              src="/people-know/avatar-2.jpg"
              alt="Picture of the author"
              fill={true}
              loading="lazy"
            />
          </div>
          <div className="flex-1">
            <a
              href="profile.html"
              className="text-black font-medium inline-block dark:text-white"
            >
              Rajat Jain
            </a>
            <p className="mt-0.5"> You captured the moment.😎 </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 mt-2"
        >
          <IoChevronDownOutline />
          More Comment
        </button>
      </div>

      <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
        <div className="relative w-6 h-6 mt-1">
          <Image
            className="rounded-full"
            src="/people-know/avatar-2.jpg"
            alt="Picture of the author"
            fill={true}
            loading="lazy"
          />
        </div>

        <div className="flex-1 relative overflow-hidden h-10">
          <textarea
            placeholder="Add Comment...."
            rows="1"
            className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent focus:outline-none"
            aria-haspopup="true"
            aria-expanded="false"
          ></textarea>
        </div>

        <button
          type="submit"
          className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
        >
          Replay
        </button>
      </div>
    </div>
  );
}
