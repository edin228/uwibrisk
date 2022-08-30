import Link from "next/link";
import React from "react";

function HeaderNavButton({ navItem,selectedID=null }) {
  return (
    <Link href={navItem?.isExternalUrl ? navItem?.externalUrl : `/${navItem?.slug}`}>
      <a
        className={`relative flex z-20 items-center uppercase tracking-widest font-semibold 
      p-2 ${
        navItem?.highlight ? "blood-orange-gradient rounded text-white" : ""
      } ${selectedID == navItem.id ? 'text-white' : ''}`}
      >
        <div className="text-xs transition duration-200 ease-in-out">
          {navItem?.text}
        </div>
      </a>
    </Link>
  );
}

export default HeaderNavButton;
