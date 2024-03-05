import Messages from "./Messages";
import Sidebar from "./Sidebar";
import UserInfo from "./UserInfo";

export default function MainMessage() {
  return (
    <div class="flex bg-white dark:bg-dark2">
      <Sidebar />
      <Messages />
      <UserInfo />
    </div>
  );
}
