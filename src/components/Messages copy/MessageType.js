import { Fragment } from "react";
import Image from "next/image";
import UnreadMessage from "./UnreadMessage";
import Embed from "react-embed";
import Link from "next/link";

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
function MediaMessage({ data, user, isSender }) {
  const alignment = isSender ? "flex-row-reverse items-end" : "";
  const imageSize = isSender ? "small" : "large";

  return (
    <>
      {data.file?.length > 0 &&
        data.file.map((val, idx) => (
          <div className={`flex gap-2 ${alignment}`} key={idx}>
            {data?.send && (
              <span className="text-[8px] text-[gray]">sending...</span>
            )}
            <Avatar src={user?.avatar} size={imageSize} />
            <a className="block rounded-[18px] border overflow-hidden" href="#">
              <div className="max-w-md">
                <div className="relative w-72 h-52 object-cover">
                  <Image
                    src={val}
                    alt="profile"
                    className="object-cover"
                    fill={true}
                  />
                </div>
              </div>
            </a>
          </div>
        ))}
      {data?.text && <Message data={data} user={user} isSender={isSender} />}
    </>
  );
}

// Link Message components for image-based messages
function LinkMessage({ data, user, isSender }) {
  const alignment = isSender ? "flex-row-reverse items-end" : "";
  const imageSize = isSender ? "small" : "large";

  return (
    <>
      <div className={`flex gap-2 ${alignment}`}>
        <Avatar src={user?.avatar} size={imageSize} />
        {data?.send && (
          <span className="text-[8px] text-[gray]">sending...</span>
        )}
        <div className="max-w-md mt-4">
          <Embed width="300px" isDark url={data.text} />
          <Link
            href={data.text}
            target="_blank"
            className={`py-2 max-w-sm text-[blue]`}
          >
            {data.text}
          </Link>
        </div>
      </div>
    </>
  );
}

// Main code structure for rendering messages
const RenderMessages = ({ messages, userDetails, msgData }) => {
  return (
    <>
      {messages?.map((e, index) => {
        const isSender = e.senderId === userDetails?._id;
        const hasFiles = e?.type;
        const renderMessage = () => {
          if (hasFiles === "text" || hasFiles === "media") {
            return (
              <MediaMessage
                data={e}
                user={isSender ? userDetails : msgData?.user}
                isSender={isSender}
              />
            );
          }
          if (hasFiles === "link") {
            return (
              <LinkMessage
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
