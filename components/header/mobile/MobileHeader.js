import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Sidebar } from "./mobilesidebar/Sidebar";

function MobileHeader({navItems}) {
  return (
    <div className="flex lg:hidden w-full h-20 z-50">
      <div className="flex w-full justify-between items-center">
        <Link href="/">
          <a className="w-[140px] h-full relative left-4">
            <Image
              src="/logo-full.png"
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
