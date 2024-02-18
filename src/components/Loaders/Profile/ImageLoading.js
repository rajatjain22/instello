import style from "./profile.module.css";

export function ImageLoading1() {
  return (
    <div class="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

export function ImageLoading2() {
  return <span className={style.loader}></span>;
}

export function ImageLoading3() {
  return (
    <div className={style["lds-spinner"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
