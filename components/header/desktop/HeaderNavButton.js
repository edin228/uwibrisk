import Link from "next/link";
import React from "react";

function HeaderNavButton({ navItem = null, selectedID = null }) {
  return navItem?.isDropdown ? (
    <div
      className={`relative flex z-20 items-center uppercase cursor-pointer tracking-widest font-semibold 
      p-2 ${
        navItem?.highlight ? "blood-orange-gradient rounded text-white" : ""
      } ${selectedID == navItem.id ? "text-white" : ""}`}
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
        className={`relative flex z-20 items-center uppercase tracking-widest font-semibold 
      p-2 ${
        navItem?.highlight ? "blood-orange-gradient rounded text-white" : ""
      } ${selectedID == navItem.id ? "text-white" : ""}`}
      >
        <div className="text-xs transition duration-200 ease-in-out">
          {navItem?.text}
        </div>
      </a>
    </Link>
  );
}

export default HeaderNavButton;
