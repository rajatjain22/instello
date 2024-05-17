import { ImageLoading4 } from "@/components/Loaders/Profile/ImageLoading";
import { RenderMessages } from "@/components/Messages/MessageType";
import Link from "next/link";
import React from "react";

function ChatBubble({ userId, userData, messageData, msgData }) {
  console.log( userId, userData, messageData, msgData)
  return (
    <div className="w-full p-2">
      <div className="py-5 text-center text-sm lg:pt-8">
        <div className="relative w-24 h-24 rounded-full mx-auto mb-3">
          <Image
            src={userData?.[userId]?.avatar}
            alt="profile"
            className="rounded-full shadow"
            fill={true}
          />
        </div>
        <div className="mt-8">
          <div className="md:text-xl text-base font-medium text-black dark:text-white">
            {userData?.[userId]?.fullName}
          </div>
          <div className="text-gray-500 text-sm dark:text-white/80">
            @{userData?.[userId]?.username}
          </div>
        </div>
        <div className="mt-3.5">
          <Link
            href={`/profile/${userId}`}
            className="inline-block rounded-lg px-4 py-1.5 text-sm font-semibold bg-secondery"
          >
            View profile
          </Link>
        </div>
      </div>
      {msgData.msgLoadig ? (
        <ImageLoading4 className="w-12 h-12" />
      ) : (
        <>
          <div className="font-medium space-y-2 mb-16">
            <RenderMessages
              messages={messageData?.[userId]}
              userDetails={userDetails}
              user={userData?.[userId]}
              lastReadMessage={msgData.lastReadMessage}
              isTyping={allConversations.find((e) => e.user_id === userId)}
            />
          </div>
          <div ref={bottomScroll}></div>
        </>
      )}
    </div>
  );
}

export default ChatBubble;
