// ForgotPasswordLink.jsx
import Link from 'next/link';

export default function ForgotPasswordLink() {
  return (
    <Link href="#">
      <div className="text-sm text-right text-gray-400 py-4">
        Forget password
      </div>
    </Link>
  );
}
