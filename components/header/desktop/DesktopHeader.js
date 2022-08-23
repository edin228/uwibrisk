import React, { useEffect, useRef } from "react";
import HeaderNavButton from "./HeaderNavButton";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getNavMenuItems } from "../../../services";
import { getIcon } from "../../../utils/utils";

export default function DesktopHeader() {
  const [selectedID, setSelectedID] = useState(null);
  const [navMenuItems, setNavMenuItems] = useState([]);
  const runOnce = useRef(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (runOnce.current) {
      runOnce.current = false;
      getNav();
    }
    return () => {};
  }, []);

  const getNav = async () => {
    const req = await getNavMenuItems();
    setNavMenuItems(req);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const tile = {
    visible: {
      opacity: 1,
    },
    hidden: { opacity: 0 },
  };

  return (
    <div className="hidden lg:flex fixed top-0 w-3/4 h-20 bg-white z-50 rounded-b-md">
      <div className="flex justify-between items-center w-full px-4">
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
        <div className="flex w-full justify-end items-center">
          <form className="flex w-1/4 mr-4 rounded-lg border-slate-500/10 border-2 relative" onSubmit={handleSubmit}>
            <input
              className="rounded-md py-1 px-2 w-full"
              type="search"
              name="search"
              placeholder="Search"
              value={searchInput}
              onInput={handleChange}
            />
            <div
              type="submit"
              name="search"
              className="cursor-pointer rounded-r-md p-2 items-center justify-center flex uppercase tracking-widest font-bold text-lg"
            >{getIcon('search')}</div>
          </form>
          <div className="relative" onMouseOut={() => setSelectedID(null)}>
            <ul className="desktop-nav">
              {navMenuItems?.map((item) => (
                <li
                  key={item.id}
                  onMouseOver={() => setSelectedID(item.id)}
                  className="relative"
                >
                  <HeaderNavButton navItem={item} />
                  {selectedID === item.id && (
                    <motion.div
                      layoutId="tile"
                      initial="hidden"
                      animate={selectedID ? "visible" : "hidden"}
                      variants={tile}
                      transition={{ ease: "easeInOut", duration: 0.25 }}
                      className="rounded h-[31px] deep-blue-gradient top-0 absolute z-10 w-full shadow-lg"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
