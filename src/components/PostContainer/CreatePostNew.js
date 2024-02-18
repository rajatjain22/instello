"use client";

export default function CreatePostNew() {
  return (
    <div className="absolute w-full h-full lg:p-20">
      <div className="uk-modal-dialog tt relative overflow-hidden mx-auto bg-white p-7 shadow-xl rounded-lg md:w-[520px] w-full dark:bg-dark2">
        <div className="text-center py-3 border-b -m-7 mb-0 dark:border-slate-700">
          <h2 className="text-sm font-medium"> Create Status </h2>

          {/* <!-- close button --> */}
          <button
            type="button"
            className="button__ico absolute top-0 right-0 m-2.5 uk-modal-close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div className="space-y-5 mt-7">
          <div>
            <label for="" className="text-base">
              What do you have in mind?{" "}
            </label>
            <input
              type="text"
            //   placeholder="Search"
              className="mt-3 bg-transparen w-full !pl-10 !py-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none"
            />
          </div>

          <div>
            <div
              className={`w-full h-72 relative border1 rounded-lg overflow-hidden`}
            >
              <label
                for="createStatusUrl"
                className="flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 w-full pb-6 pt-10 cursor-pointer bg-gradient-to-t from-gray-700/60"
              >
                <input id="createStatusUrl" type="file" className="hidden" />
                <ion-icon
                  name="image"
                  className="text-3xl text-teal-600 md hydrated"
                  role="img"
                  aria-label="image"
                ></ion-icon>
                <span className="text-white mt-2">Browse to Upload image </span>
              </label>

              <img
                id="createStatusImage"
                src="#"
                alt="Uploaded Image"
                accept="image/png, image/jpeg"
                className="w-full h-full absolute object-cover"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-start gap-2">
              <ion-icon
                name="time-outline"
                className="text-3xl text-sky-600 rounded-full bg-blue-50 dark:bg-transparent md hydrated"
                role="img"
                aria-label="time outline"
              ></ion-icon>
              <p className="text-sm text-gray-500 font-medium">
                {" "}
                Your Status will be available <br /> for{" "}
                <span className="text-gray-800"> 24 Hours</span>{" "}
              </p>
            </div>

            <button
              type="button"
              className="button bg-blue-500 text-white px-8"
            >
              {" "}
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
