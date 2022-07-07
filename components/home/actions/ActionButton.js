import React from "react";
import Link from "next/link";

function ActionButton({ icon, text, href }) {
  return (
    <>
      <Link href={href}>
        <a className="relative h-full p-4 flex flex-1 flex-col items-center justify-center rounded-lg hover:drop-shadow-lg hover:text-white transition duration-200 z-20 ease-in-out">
          <div className="flex flex-1 items-center shrink-0 text-4xl lg:text-5xl">{icon}</div>
          <div className="text-sm lg:text-md flex flex-1 items-center shrink-0 text-center font-semibold">{text}</div>
        </a>
      </Link>
    </>
  );
}

export default ActionButton;
