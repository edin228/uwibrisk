import * as React from "react";
import Image from "next/image";

export const BlogHeader = ({ id, image, title }) => {
  return (
    <div className="relative flex w-full overflow-hidden rounded-lg">
      <div className="absolute bottom-0 z-30 hidden w-full px-2 py-2 pt-2 font-bold text-white bg-gradient-to-t from-slate-900/80 to-slate-100/0 min-h-[150px] items-end text-md xl:flex lg:text-3xl">
        {title}
      </div>
      <div className="z-10 flex w-full">
        <Image
          src={image}
          alt="header-pic"
          className="rounded-lg"
          width={1920}
          height={400}
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};
