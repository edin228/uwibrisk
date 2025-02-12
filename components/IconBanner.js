import React from "react";
import { getIcon } from "../utils/utils";

function IconBanner({ data }) {
  if (!data) return null;

  const { bannerTitle, descriptions, icons, labels } = data;

  return (
    <div className="flex flex-col w-full bg-zinc-100 p-4 rounded-md">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {icons.map((icon, index) => (
          <div key={index} className="flex flex-col items-center md:w-[360px]">
            <div className="text-[3rem] md:text-[5rem] mb-4">
              {getIcon(icon)}
            </div>
            <div className="font-bold text-2xl">{labels[index]}</div>
            <div className="p-2 w-3/4 text-center">{descriptions[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IconBanner;