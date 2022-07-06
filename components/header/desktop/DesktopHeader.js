import React from "react";

export default function DesktopHeader() {
  return (
    <div className="hidden md:flex w-full h-20 bg-white">
      <div className="flex w-full justify-between items-center">
        <div>LOGO</div>
        <div className="flex items-center space-x-2 px-4">
          <div>Resources</div>
          <div>Team</div>
          <div>Contact</div>
        </div>
      </div>
    </div>
  );
}
