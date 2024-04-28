import style from "./loader.module.css";

export function TypingLoader({ className }) {
  return (
    <div className={`${style.typing} ${className}`}>
      <div className={style.typing__dot}></div>
      <div className={style.typing__dot}></div>
      <div className={style.typing__dot}></div>
    </div>
  );
}


export function TypingLoader2() {
  return (
    <div className={style.typing2}></div>
  )
}