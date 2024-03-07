export default function JoinNowLink({ formType, setFormType }) {
  return (
    <div className='space-x-2 text-sm text-center text-slate-400 dark:text-white/70 uk-scrollspy-inview '>
      <span> {formType ? "I have account?" : "No account ?"} </span>
      <span>—</span>
      <button
        onClick={()=>setFormType((presVal) => !presVal)}
        className='text-gray-600 hover:text-gray-500'
      >
        {formType ? "Join now" : "Login"}
      </button>
    </div>
  );
}
