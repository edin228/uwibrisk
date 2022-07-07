import React from "react";
import HeaderNavButton from "./HeaderNavButton";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DesktopHeader() {
  const [selectedID, setSelectedID] = useState(null);

  const navItems = [
    { id: 1, text: "resources", href: "/resources", forceBg:false },
    { id: 2, text: "team", href: "/team", forceBg:false },
    { id: 3, text: "blog", href: "/blog", forceBg:false },
    { id: 4, text: "contact", href: "/contact", forceBg:false },
    { id: 5, text: "client portal", href: "/client-portal", forceBg:true },
  ];

  const tile = {
    visible: {
      opacity: 1,
    },
    hidden: { opacity: 0 },
  };

  return (
    <div className="hidden lg:flex fixed top-0 w-3/4 h-20 bg-white z-50">
      <div className="flex w-full justify-between items-center px-4">
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
        <div className="relative" onMouseOut={() => setSelectedID(null)}>
          <ul className="desktop-nav">
            {navItems.map((item) => (
              <li
                key={item.id}
                onMouseOver={() => setSelectedID(item.id)}
                className="relative"
              >
                <HeaderNavButton text={item.text} href={item.href} forceBg={item.forceBg}/>
                {selectedID === item.id && (
                  <motion.div
                    layoutId="tile"
                    initial="hidden"
                    animate={selectedID ? "visible" : "hidden"}
                    variants={tile}
                    transition={{ ease: "easeInOut", duration: 0.25 }}
                    className="rounded-lg h-[31px] deep-blue-gradient top-0 absolute z-10 w-full shadow-lg"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
