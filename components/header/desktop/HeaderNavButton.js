import Link from "next/link";
import React from "react";

function HeaderNavButton({ navItem = null, selectedID = null }) {
  return navItem?.isDropdown ? (
    <div
      className={`relative rounded-lg border-[1px] border-yellow-500  flex z-20 items-center uppercase cursor-pointer tracking-widest font-semibold 
      p-2 text-white ${
        navItem?.highlight ? "bg-yellow-500 rounded text-white" : ""
      } ${selectedID == navItem.id ? "text-white" : "text-white"}`}
    >
      <div className="text-xs transition duration-200 ease-in-out">
        {navItem?.text}
      </div>
    </div>
  ) : (
    <Link
      href={navItem?.isExternalUrl ? navItem?.externalUrl : `/${navItem?.slug}`}
    >
      <a
        className={`relative rounded-lg border-[1px] border-yellow-500 flex z-20 items-center uppercase tracking-widest font-semibold 
      p-2 text-white ${
        navItem?.highlight ? "bg-yellow-500 border-0 rounded text-white" : ""
      } ${selectedID == navItem.id ? "text-white" : ""}`}
        target={navItem?.openInNewTab ? "_blank" : undefined}
        rel={navItem?.openInNewTab ? "noopener noreferrer" : undefined}
      >
        <div className="text-xs transition duration-200 ease-in-out">
          {navItem?.text}
        </div>
      </a>
    </Link>
  );
}

export default HeaderNavButton;
