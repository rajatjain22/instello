import UserSidebar from "@/components/Messages/UserSidebar";

export default function MessageLayout({ children }) {
  return (
    <div className="flex bg-white dark:bg-dark2">
      <UserSidebar />
      {children}
    </div>
  );
}
