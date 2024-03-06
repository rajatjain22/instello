import Messages from "@/components/Messages/Messages";
import UserInfo from "@/components/Messages/UserInfo";

export default function page({ params: { userId } }) {
  return <Messages userId={userId}/>;
}
