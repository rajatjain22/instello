import Profile from "@/components/Profile/Profile";

export default function page({ params }) {
  const userId = params.id;
  return <Profile userId={userId} />;
}
