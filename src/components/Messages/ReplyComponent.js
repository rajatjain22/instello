const ReplyComponent = ({ className, data }) => {
  return (
    <div
      className={`absolute ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-500 group-hover:scale-100 -top-1 ${className}`}
    >
      <div className="flex max-w-xs items-center shadow-lg">
      {/* <div className="clip-bottom w-2 h-4 bg-gray-800"></div> */}
        <div
          className="rounded bg-gray-800 p-2 text-center text-xs text-white cursor-pointer"
          onClick={() => console.log(data)}
        >
          Reply
        </div>
      </div>
    </div>
  );
};

export default ReplyComponent;
