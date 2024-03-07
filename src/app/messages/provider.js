
'use client'
import Sidebar from "@/components/Messages/Sidebar";

export default function Provider({ children }) {
  return (
    <div className="flex bg-white dark:bg-dark2">
      <Sidebar />
      {children}
    </div>
  );
}
