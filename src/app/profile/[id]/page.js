import Profile from "@/components/layout/Profile";

export default function page({ params: { id } }) {
  return <Profile userId={id} />;
}
