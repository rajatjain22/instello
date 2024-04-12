import ModelBox from "../ModelBox";
import PostSwiper from "./PostSwiper";

function ModelPost({ model, onClose }) {
  return (
    <ModelBox
      isOpen={model.open}
      onClose={onClose}
      className={"sm:max-w-4xl shadow-none !bg-transparent w-full h-[85vh]"}
    >
      <PostSwiper posts={model?.post?.post} />
    </ModelBox>
  );
}

export default ModelPost;
