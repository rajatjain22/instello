// SocialLoginButtons.jsx
import { IoLogoApple, IoLogoFacebook, IoLogoGoogle } from 'react-icons/io5';
import Link from 'next/link';

export default function SocialLoginButtons() {
  return (
    <div className="flex gap-3 justify-center text-2xl py-5 text-slate-500 uk-scrollspy-inview ">
      <Link href="#"><IoLogoFacebook /></Link>
      <Link href="#"><IoLogoGoogle /></Link>
      <Link href="#"><IoLogoApple /></Link>
    </div>
  );
}
