import Sidebar from "@/components/Messages/Sidebar";

export default function Provider({ children }) {
  return (
    <div class="flex bg-white dark:bg-dark2">
      <Sidebar />
      {children}
    </div>
  );
}
