import React from "react";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

export default function Wrapper({ children }) {
  return (
    <main className="wrapper container mx-auto relative">
      <TopBar />
      {children}
      <BottomBar />
    </main>
  );
}
