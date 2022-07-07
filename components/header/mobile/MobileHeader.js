import Image from "next/image";
import React from "react";
import { Sidebar } from "./mobilesidebar/Sidebar";

function MobileHeader() {
  return (
    <div className="flex lg:hidden w-full h-20 z-50">
      <div className="flex w-full justify-between items-center">
        <div className="w-[150px] h-full relative left-4">
          <Image
            src="/logo-full.png"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default MobileHeader;
