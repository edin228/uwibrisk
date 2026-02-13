import Link from "next/link";
import React, { useState } from "react";
import { getIcon } from "../../../../utils/utils";
import { motion } from "framer-motion";

function MobileNavButton({ navItem, selectedID = null }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const tile = {
    visible: {
      opacity: 1,
    },
    hidden: { opacity: 0 },
  };
  return (
    <>
      {navItem?.isDropdown ? (
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div
              className={`relative w-full flex z-20 items-center cursor-pointer uppercase tracking-widest font-semibold 
          p-2 ${
            navItem?.highlight ? "gold-gradient rounded text-white" : ""
          } ${selectedID == navItem.id ? "text-white" : ""}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="text-xs transition duration-200 ease-in-out">
                {navItem?.text}
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {getIcon(showDropdown ? "up" : "down")}
            </div>
          </div>
          {showDropdown ? (
            <motion.div
              initial="hidden"
              animate={showDropdown ? "visible" : "hidden"}
              variants={tile}
              transition={{ ease: "easeInOut", duration: 0.25 }}
            >
              <div className="w-full h-[5px] gold-gradient" />
              <ul className="p-2">
                {navItem.pages?.map((pg) => (
                  <li
                    key={pg.id}
                    className="w-full px-2 font-semibold transition duration-100 border-2 rounded-lg cursor-pointer border-slate-100/0 hover:border-slate-200"
                  >
                    <a href={pg.slug} className="relative w-full">
                      {pg.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </div>
      ) : (
        <Link
          href={
            navItem?.isExternalUrl ? navItem?.externalUrl : `/${navItem?.slug}`
          }
        >
          <a
            className={`relative flex z-20 items-center uppercase tracking-widest font-semibold 
          p-2 ${
            navItem?.highlight ? "buring-orange-gradient rounded text-white" : ""
          } ${selectedID == navItem.id ? "text-white" : ""}`}
          >
            <div className="text-xs transition duration-200 ease-in-out">
              {navItem?.text}
            </div>
          </a>
        </Link>
      )}
    </>
  );
}

export default MobileNavButton;
