import Link from "next/link";
import React from "react";

function HeaderNavButton({ text, href, forceBg }) {
  return (
    <Link href={href}>
      <a
        className={`relative flex z-20 items-center uppercase tracking-widest font-semibold hover:text-white 
      p-2 ${forceBg ? "blood-orange-gradient rounded text-white" : ""}`}
      >
        <div className="text-xs transition duration-200 ease-in-out">{text}</div>
      </a>
    </Link>
  );
}

export default HeaderNavButton;
