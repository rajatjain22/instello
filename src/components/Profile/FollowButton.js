import { ImageLoading4 } from "../Loaders/Profile/ImageLoading";

export default function FollowButton({
  followBtnLoading,
  isFollowed,
  handleFollow,
  isFollowRequest,
}) {
  return (
    <>
      {followBtnLoading ? (
        <button
          type='button'
          className='button bg-pink-100 text-pink-600 border border-pink-200 cursor-not-allowed'
          disabled
        >
          <ImageLoading4 className='w-20' />
        </button>
      ) : isFollowRequest ? (
        <button
          type='button'
          className='button bg-pink-100 text-pink-600 border border-pink-200'
          // onClick={() => handleFollow("unfollow")}
        >
          Request
        </button>
      ) : isFollowed ? (
        <button
          type='button'
          className='button bg-pink-100 text-pink-600 border border-pink-200'
          onClick={() => handleFollow("unfollow")}
        >
          Unfollow
        </button>
      ) : (
        <button
          type='button'
          className='button text-gray-600 bg-slate-200'
          onClick={() => handleFollow("follow")}
        >
          Follow
        </button>
      )}
    </>
  );
}
