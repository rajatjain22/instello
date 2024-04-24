import { Fragment } from "react";
import Image from "next/image";
import UnreadMessage from "./UnreadMessage";

// Common Avatar component to avoid repetition
function Avatar({ src, size = "small" }) {
  const avatarSize = size === "small" ? "w-5 h-5" : "w-9 h-9";
  return (
    <div className={`relative ${avatarSize}`}>
      <Image
        src={src}
        alt="profile"
        className="rounded-full shadow"
        fill={true}
      />
    </div>
  );
}

// Message components for text messages
function Message({ data, user, isSender }) {
  const alignment = isSender ? "flex-row-reverse items-end" : "";
  const bgColor = isSender
    ? "bg-gradient-to-tr from-sky-500 to-blue-500 text-white"
    : "bg-secondery";

  return (
    <div className={`flex gap-2 ${alignment}`}>
      {data?.send && <span className="text-[8px] text-[gray]">sending...</span>}
      <Avatar src={user?.avatar} size={isSender ? "small" : "large"} />
      <div className={`px-4 py-2 max-w-sm rounded-[20px] shadow ${bgColor}`}>
        <p>{data.text}</p>
        {/* <span className="text-xs text-gray-400">12:30pm</span> */}
      </div>
    </div>
  );
}

// Media Message components for image-based messages
function MediaMessage({ data, user, isSender, send }) {
  const alignment = isSender ? "flex-row-reverse items-end" : "";
  const imageSize = isSender ? "small" : "large";
  return (
    <div className={`flex gap-2 ${alignment}`}>
      {send && <span className="text-[8px] text-[gray]">sending...</span>}
      <Avatar src={user?.avatar} size={imageSize} />
      <a className="block rounded-[18px] border overflow-hidden" href="#">
        <div className="max-w-md">
          <div className="relative w-72 h-52 object-cover">
            <Image
              src={data}
              alt="profile"
              className="object-cover"
              fill={true}
            />
          </div>
        </div>
      </a>
    </div>
  );
}

// Main code structure for rendering messages
const RenderMessages = ({ messages, userDetails, msgData }) => {
  return (
    <>
      {messages?.map((e, index) => {
        const isSender = e.senderId === userDetails?._id;
        const hasFiles = e?.file?.length > 0;

        const renderMessage = () => {
          if (hasFiles) {
            return e.file.map((val, idx) => (
              <Fragment key={idx}>
                <MediaMessage
                  data={val}
                  user={isSender ? userDetails : msgData?.user}
                  isSender={isSender}
                  send={e?.send}
                />
                {e.file.length === idx + 1 && e.text && (
                  <Message
                    data={e}
                    user={isSender ? userDetails : msgData?.user}
                    isSender={isSender}
                  />
                )}
              </Fragment>
            ));
          } else {
            return (
              <Message
                data={e}
                user={isSender ? userDetails : msgData?.user}
                isSender={isSender}
              />
            );
          }
        };

        return (
          <Fragment key={index}>
            {renderMessage()}
            {/* Render UnreadMessage only if the current message is the last read and the next one is not from the sender */}
            {index < messages.length - 1 &&
              e._id === msgData?.lastReadMessage &&
              messages[index + 1].senderId !== userDetails?._id && (
                <UnreadMessage />
              )}
          </Fragment>
        );
      })}
    </>
  );
};

export { RenderMessages, Message, MediaMessage };
