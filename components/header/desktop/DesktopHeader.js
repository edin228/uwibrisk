import React from "react";
import HeaderNavButton from "./HeaderNavButton";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getIcon, sortByProperty } from "../../../utils/utils";
import { useRouter } from "next/router";

export default function DesktopHeader({ navItems }) {
  const [selectedID, setSelectedID] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  const orderedNav = sortByProperty(navItems, 'order')

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    searchInput.length > 1 ? router.push(`/search?q=${searchInput}`) : null;
  };

  const tile = {
    visible: {
      opacity: 1,
    },
    hidden: { opacity: 0 },
  };

  return (
    <div
      className="fixed top-0 z-50 hidden h-20 shadow-lg bg-zinc-800 lg:flex"
      style={{ width: "inherit" }}
    >
      <div className="flex items-center justify-between w-full px-4">
        <Link href="/">
          <a className="w-[140px] h-full relative left-4">
            <Image
              src="/Asset 6.png"
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
        <div className="flex items-center justify-end w-full ">
          <form
            className="relative flex w-1/5 mr-4 border-2 rounded-lg border-zinc-400/20"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full px-2 py-1 text-white bg-transparent rounded-md"
              type="search"
              name="search"
              placeholder="Search"
              value={searchInput}
              onInput={handleChange}
            />
            <div
              type="submit"
              name="search"
              onClick={() => handleSubmit()}
              className="flex items-center justify-center p-2 text-lg font-bold tracking-widest text-white uppercase cursor-pointer rounded-r-md"
            >
              {getIcon("search")}
            </div>
          </form>
          <div className="relative" onMouseOut={() => setSelectedID(null)}>
            <ul className="space-x-2 desktop-nav">
              {orderedNav.map((item) => (
                <li
                  key={item.id}
                  onMouseOver={() => setSelectedID(item.id)}
                  className="relative"
                >
                  <HeaderNavButton navItem={item} selectedID={selectedID} />
                  {selectedID === item.id && (
                    <motion.div
                      layoutId="tile"
                      initial="hidden"
                      animate={selectedID ? "visible" : "hidden"}
                      variants={tile}
                      transition={{ ease: "easeInOut", duration: 0.25 }}
                      className={`${
                        item.isDropdown ? "rounded-t-lg" : "rounded-lg"
                      } h-[34px] bg-yellow-500  top-0 absolute z-10 w-full shadow-lg`}
                    />
                  )}
                  {selectedID === item.id && item.isDropdown ? (
                    <motion.div
                      initial="hidden"
                      animate={selectedID ? "visible" : "hidden"}
                      variants={tile}
                      transition={{ ease: "easeInOut", duration: 0.25 }}
                      className="absolute top-[31px] min-w-[250px] right-0 bg-white rounded-lg shadow-2xl"
                    >
                      <div className="w-full h-[5px] gold-gradient" />
                      <ul className="p-2">
                        {item.pages?.map((pg) => (
                          <li key={pg.id} className="w-full h-full">
                            <a href={`/${pg?.slug}`} className="w-full h-full">
                              <div className="w-full h-full px-2 font-semibold transition duration-100 border-2 rounded-lg cursor-pointer border-zinc-100/0 hover:border-zinc-200">
                                {pg.title}
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
