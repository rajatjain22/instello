import PostSwiper from "./Posts/PostSwiper";

function ImageModel({ isOpen, data, onClose }) {
  return (
    isOpen && (
      <div className="fixed inset-0 z-30 bg-[black] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <div className={`w-full h-[85vh]`}>
            <PostSwiper posts={data} model={true} />
            <div
              className="absolute top-3 right-3 border rounded-full p-1 cursor-pointer text-2xl text-black bg-white"
              onClick={onClose}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ImageModel;
