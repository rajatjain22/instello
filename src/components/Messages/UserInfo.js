export default function UserInfo() {
  return (
    <div class="right w-full h-full absolute top-0 right-0 z-10 hidden transition-transform">
      <div class="w-[360px] border-l shadow-lg h-screen bg-white absolute right-0 top-0 uk-animation-slide-right-medium delay-200 z-50 dark:bg-dark2 dark:border-slate-700">
        <div class="w-full h-1.5 bg-gradient-to-r to-purple-500 via-red-500 from-pink-500 -mt-px"></div>

        <div class="py-10 text-center text-sm pt-20">
          <img
            src="people-know/avatar-3.jpg"
            class="w-24 h-24 rounded-full mx-auto mb-3"
            alt=""
          />
          <div class="mt-8">
            <div class="md:text-xl text-base font-medium text-black dark:text-white">
              {" "}
              Monroe Parker{" "}
            </div>
            <div class="text-gray-500 text-sm mt-1 dark:text-white/80">
              @Monroepark
            </div>
          </div>
          <div class="mt-5">
            <a
              href="profile.html"
              class="inline-block rounded-full px-4 py-1.5 text-sm font-semibold bg-secondery"
            >
              View profile
            </a>
          </div>
        </div>

        <hr class="opacity-80 dark:border-slate-700" />

        <ul class="text-base font-medium p-3">
          <li>
            <div class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery">
              <ion-icon
                name="notifications-off-outline"
                class="text-2xl md hydrated"
                role="img"
                aria-label="notifications off outline"
              ></ion-icon>{" "}
              Mute Notification
              <label class="switch cursor-pointer ml-auto">
                {" "}
                <input type="checkbox" checked="" />
                <span class="switch-button !relative"></span>
              </label>
            </div>
          </li>
          <li>
            {" "}
            <button
              type="button"
              class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"
            >
              {" "}
              <ion-icon
                name="flag-outline"
                class="text-2xl md hydrated"
                role="img"
                aria-label="flag outline"
              ></ion-icon>{" "}
              Report{" "}
            </button>
          </li>
          <li>
            {" "}
            <button
              type="button"
              class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"
            >
              {" "}
              <ion-icon
                name="settings-outline"
                class="text-2xl md hydrated"
                role="img"
                aria-label="settings outline"
              ></ion-icon>{" "}
              Ignore messages{" "}
            </button>{" "}
          </li>
          <li>
            {" "}
            <button
              type="button"
              class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"
            >
              {" "}
              <ion-icon
                name="stop-circle-outline"
                class="text-2xl md hydrated"
                role="img"
                aria-label="stop circle outline"
              ></ion-icon>{" "}
              Block{" "}
            </button>{" "}
          </li>
          <li>
            {" "}
            <button
              type="button"
              class="flex items-center gap-5 rounded-md p-3 w-full hover:bg-red-50 text-red-500"
            >
              {" "}
              <ion-icon
                name="trash-outline"
                class="text-2xl md hydrated"
                role="img"
                aria-label="trash outline"
              ></ion-icon>{" "}
              Delete Chat{" "}
            </button>{" "}
          </li>
        </ul>

        {/* <!-- close button --> */}
        <button
          type="button"
          class="absolute top-0 right-0 m-4 p-2 bg-secondery rounded-full"
          uk-toggle="target: .rightt ; cls: hidden"
          aria-expanded="true"
        >
          <ion-icon
            name="close"
            class="text-2xl flex md hydrated"
            role="img"
            aria-label="close"
          ></ion-icon>
        </button>
      </div>

      {/* <!-- overly --> */}
      <div
        class="bg-slate-100/40 backdrop-blur absolute w-full h-full dark:bg-slate-800/40"
        uk-toggle="target: .rightt ; cls: hidden"
        tabindex="0"
        aria-expanded="true"
      ></div>
    </div>
  );
}
