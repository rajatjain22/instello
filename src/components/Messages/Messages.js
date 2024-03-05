"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { IoChevronBackOutline } from "react-icons/io5";

export default function Messages() {
  const bottomScroll = useRef(null);

  useLayoutEffect(() => {
    if (bottomScroll.current) {
      bottomScroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  return (
    <div class="flex-1 animate-slideLeftToRight">
      {/* <!-- chat heading --> */}
      <div class="flex items-center justify-between gap-2 w- px-6 py-3.5 z-10 border-b dark:border-slate-700 uk-animation-slide-top-medium">
        <div class="flex items-center sm:gap-4 gap-2">
          {/* <!-- toggle for mobile --> */}
          <Link href="/messages" class="md:hidden">
            <IoChevronBackOutline className="text-2xl -ml-4 md" />
          </Link>

          <div class="relative cursor-pointer max-md:hidden">
            <img
              src="/people-know/avatar-6.jpg"
              alt=""
              class="w-8 h-8 rounded-full shadow"
            />
            <div class="w-2 h-2 bg-teal-500 rounded-full absolute right-0 bottom-0 m-px"></div>
          </div>
          <div class="cursor-pointer">
            <div class="text-base font-bold"> Monroe Parker</div>
            <div class="text-xs text-green-500 font-semibold"> Online</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button type="button" class="button__ico">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <button type="button" class="hover:bg-slate-100 p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="hover:bg-slate-100 p-1.5 rounded-full"
            uk-toggle="target: .rightt ; cls: hidden"
            aria-expanded="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* <!-- chats bubble --> */}
      <div class="w-full p-5 overflow-y-auto sm:h-[calc(100vh-137px)] h-[calc(100vh-185px)]">
        <div class="py-5 text-center text-sm lg:pt-8">
          <img
            src="/people-know/avatar-6.jpg"
            class="w-24 h-24 rounded-full mx-auto mb-3"
            alt=""
          />
          <div class="mt-8">
            <div class="md:text-xl text-base font-medium text-black dark:text-white">
              Monroe Parker
            </div>
            <div class="text-gray-500 text-sm   dark:text-white/80">
              @Monroepark
            </div>
          </div>
          <div class="mt-3.5">
            <a
              href="profile.html"
              class="inline-block rounded-lg px-4 py-1.5 text-sm font-semibold bg-secondery"
            >
              View profile
            </a>
          </div>
        </div>

        <div class="text-sm font-medium space-y-6">
          {/* <!-- received --> */}
          <div class="flex gap-3">
            <img
              src="/people-know/avatar-2.jpg"
              alt=""
              class="w-9 h-9 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-secondery">
              Hi, I’m John
            </div>
          </div>

          {/* <!-- sent --> */}
          <div class="flex gap-2 flex-row-reverse items-end">
            <img
              src="/people-know/avatar-3.jpg"
              alt=""
              class="w-5 h-5 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">
              I’m Lisa. welcome John
            </div>
          </div>

          {/* <!-- time --> */}
          <div class="flex justify-center ">
            <div class="font-medium text-gray-500 text-sm dark:text-white/70">
              April 8,2023,6:30 AM
            </div>
          </div>

          {/* <!-- received --> */}
          <div class="flex gap-3">
            <img
              src="/people-know/avatar-2.jpg"
              alt=""
              class="w-9 h-9 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-secondery">
              I’m selling a photo of a sunset. It’s a print on canvas, signed by
              the photographer. Do you like it? 😊
            </div>
          </div>

          {/* <!-- sent --> */}
          <div class="flex gap-2 flex-row-reverse items-end">
            <img
              src="/people-know/avatar-3.jpg"
              alt=""
              class="w-4 h-4 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">
              Wow, it’s beautiful. How much ? 😍
            </div>
          </div>

          {/* <!-- sent media--> */}
          <div class="flex gap-2 flex-row-reverse items-end">
            <img
              src="/people-know/avatar-3.jpg"
              alt=""
              class="w-4 h-4 rounded-full shadow"
            />

            <a class="block rounded-[18px] border overflow-hidden" href="#">
              <div class="max-w-md">
                <div class="max-w-full relative w-72">
                  <div class="relative">
                    <div class="w-full h-full absolute inset-0">
                      <img
                        src="/product-3.jpg"
                        alt=""
                        class="block max-w-full max-h-52 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* <!-- time --> */}
          <div class="flex justify-center ">
            <div class="font-medium text-gray-500 text-sm dark:text-white/70">
              April 8,2023,6:30 AM
            </div>
          </div>

          {/* <!-- received --> */}
          <div class="flex gap-3">
            <img
              src="/people-know/avatar-2.jpg"
              alt=""
              class="w-9 h-9 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-secondery">
              I’m glad you like it. I’m asking for $200 🤑
            </div>
          </div>

          {/* <!-- sent --> */}
          <div class="flex gap-2 flex-row-reverse items-end">
            <img
              src="/people-know/avatar-3.jpg"
              alt=""
              class="w-5 h-5 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">
              $200? Too steep. Can you lower the price a bit? 😕
            </div>
          </div>

          {/* <!-- received --> */}
          <div class="flex gap-3">
            <img
              src="/people-know/avatar-2.jpg"
              alt=""
              class="w-9 h-9 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-secondery">
              Well, I can’t go too low because I paid a lot. But I’m willing to
              negotiate. What’s your offer? 🤔
            </div>
          </div>

          {/* <!-- sent -->  */}
          <div class="flex gap-2 flex-row-reverse items-end">
            <img
              src="/people-know/avatar-3.jpg"
              alt=""
              class="w-5 h-5 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">
              Sorry, can’t pay more than $150. 😅
            </div>
          </div>

          {/* <!-- time --> */}
          <div class="flex justify-center ">
            <div class="font-medium text-gray-500 text-sm dark:text-white/70">
              April 8,2023,6:30 AM
            </div>
          </div>

          {/* <!-- received --> */}
          <div class="flex gap-3">
            <img
              src="/people-know/avatar-2.jpg"
              alt=""
              class="w-9 h-9 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-secondery">
              $150? Too low. Photo worth more. 😬
            </div>
          </div>

          {/* <!-- sent --> */}
          <div class="flex gap-2 flex-row-reverse items-end">
            <img
              src="/people-know/avatar-3.jpg"
              alt=""
              class="w-5 h-5 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">
              Too high. I Can’t . How about $160? Final offer. 😬
            </div>
          </div>

          {/* <!-- received --> */}
          <div class="flex gap-3">
            <img
              src="/people-know/avatar-2.jpg"
              alt=""
              class="w-9 h-9 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-secondery">
              Fine, fine. You’re hard to please. I’ll take $160, but only
              because I like you. 😍
            </div>
          </div>

          {/* <!-- sent --> */}
          <div class="flex gap-2 flex-row-reverse items-end">
            <img
              src="/people-know/avatar-3.jpg"
              alt=""
              class="w-5 h-5 rounded-full shadow"
            />
            <div class="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">
              Great, thank you. I appreciate it. I love this photo and can’t
              wait to hang it. 😩
            </div>
          </div>
          <div ref={bottomScroll}></div>
        </div>
      </div>

      {/* <!-- sending message area --> */}
      <div class="flex items-center md:gap-4 gap-2 md:p-3 p-2 overflow-hidden">
        {/* <div id="message__wrap" class="flex items-center gap-2 h-full dark:text-white -mt-1.5">
                                
                                <button type="button" class="shrink-0" aria-haspopup="true" aria-expanded="false">
                                    <ion-icon class="text-3xl flex md hydrated" name="add-circle-outline" role="img" aria-label="add circle outline"></ion-icon>
                                </button>
                                <div class="dropbar pt-36 h-60 bg-gradient-to-t via-white from-white via-30% from-30% dark:from-slate-900 dark:via-900 uk-drop" uk-drop="stretch: x; target: #message__wrap ;animation:  slide-bottom ;animate-out: true; pos: top-left; offset:10 ; mode: click ; duration: 200">
 
                                    <div class="sm:w-full p-3 flex justify-center gap-5" uk-scrollspy="target: > button; cls: uk-animation-slide-bottom-small; delay: 100;repeat:true">
                                       
                                        <button type="button" class="bg-sky-50 text-sky-600 border border-sky-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0">
                                            <ion-icon class="text-3xl flex md hydrated" name="image" role="img" aria-label="image"></ion-icon>
                                        </button>
                                        <button type="button" class="bg-green-50 text-green-600 border border-green-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0">
                                            <ion-icon class="text-3xl flex md hydrated" name="images" role="img" aria-label="images"></ion-icon>
                                        </button>
                                        <button type="button" class="bg-pink-50 text-pink-600 border border-pink-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0">
                                            <ion-icon class="text-3xl flex md hydrated" name="document-text" role="img" aria-label="document text"></ion-icon>
                                        </button>
                                        <button type="button" class="bg-orange-50 text-orange-600 border border-orange-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0">
                                            <ion-icon class="text-3xl flex md hydrated" name="gift" role="img" aria-label="gift"></ion-icon>
                                        </button>
 

                                    </div>
                                    
                                </div>

                                <button type="button" class="shrink-0" aria-haspopup="true" aria-expanded="false">
                                    <ion-icon class="text-3xl flex md hydrated" name="happy-outline" role="img" aria-label="happy outline"></ion-icon>
                                </button>
                                <div class="dropbar p-2 uk-drop" uk-drop="stretch: x; target: #message__wrap ;animation: uk-animation-scale-up uk-transform-origin-bottom-left ;animate-out: true; pos: top-left ; offset:2; mode: click ; duration: 200 ">
 
                                    <div class="sm:w-60 bg-white shadow-lg border rounded-xl  pr-0 dark:border-slate-700 dark:bg-dark3">

                                        <h4 class="text-sm font-semibold p-3 pb-0">Send Imogi</h4>

                                        <div class="grid grid-cols-5 overflow-y-auto max-h-44 p-3 text-center text-xl">

                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😊 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🤩 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😎</div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥳 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😂 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥰 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😡 </div> 
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😊 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🤩 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😎</div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥳 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😂 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥰 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😡 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🤔 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😊 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🤩 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😎</div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥳 </div>
                                            <div class="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😂 </div>
                                          
                                        </div>
                                         

                                    </div>
                                    
                                </div>

                            </div> */}

        <div class="relative flex-1">
          <textarea
            placeholder="Write your message"
            rows="1"
            class="w-full resize-none bg-secondery rounded-full px-4 p-2"
          ></textarea>

          <button
            type="button"
            class="text-white shrink-0 p-2 absolute right-0.5 top-0"
          >
            <ion-icon
              class="text-xl flex md hydrated"
              name="send-outline"
              role="img"
              aria-label="send outline"
            ></ion-icon>
          </button>
        </div>

        <button type="button" class="flex h-full dark:text-white">
          <ion-icon
            class="text-3xl flex -mt-3 md hydrated"
            name="heart-outline"
            role="img"
            aria-label="heart outline"
          ></ion-icon>
        </button>
      </div>
    </div>
  );
}
