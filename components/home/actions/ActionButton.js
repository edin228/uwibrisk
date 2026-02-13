import React from "react";
import Link from "next/link";
import { getIcon } from "../../../utils/utils";

function ActionButton({ button }) {
  return (
    <>
      <Link href={button.useExternalUrl? button.externalUrl : button.link}>
        <a className="relative h-full p-4 flex flex-1 flex-col items-center justify-center rounded-md hover:drop-shadow-lg hover:text-white transition duration-200 z-20 ease-in-out">
          <div className="flex items-center text-4xl lg:text-5xl">{getIcon(button.icon)}</div>
          <div className="text-sm lg:text-md flex items-center text-center font-semibold">{button.text}</div>
        </a>
      </Link>
    </>
  );
}

export default ActionButton;
