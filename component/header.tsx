import React from "react";
import { ModeToggle } from "@/component/mode-toggle";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 shadow-md">
      {/* other header stuff like logo, nav links */}
      <ModeToggle />
    </header>
  );
}
