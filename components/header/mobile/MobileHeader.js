import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sidebar } from "./mobilesidebar/Sidebar";

function MobileHeader({navItems}) {
  return (
    <div className="z-50 flex w-full h-20 lg:hidden">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <a className="w-[240px] h-full relative left-4">
            <Image
              src="/UWIB-Wide-Black.jpg"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
        <Sidebar navItems={navItems} />
      </div>
    </div>
  );
}

export default MobileHeader;
