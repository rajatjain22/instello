import FilePreview from "./FilePreview";

export default function PostList({ posts }) {
  return (
    <>
      {posts.length > 0 ? (
        <div className="mt-8">
          {/* <!-- Post list --> */}
          <div className="grid grid-cols-3 gap-3 mt-6 ">
            {posts.map((post, index) => {
              console.log(post?.post);
              return (
                post?.post.length > 0 && (
                  <FilePreview file={post.post[0]} isFeed={true} />
                )
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 py-3">
          <h1 className="text-xl font-bold text-black dark:text-white">
            No Posts
          </h1>
        </div>
      )}
    </>
  );
}
