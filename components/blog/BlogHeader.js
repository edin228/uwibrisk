import * as React from "react";
import Image from "next/image";

export const BlogHeader = ({ id, image, title }) => {
  return (
    <div className="relative flex w-full rounded-lg">
      <div className="hidden absolute h-[300px] top-0 left-0 z-20 xl:flex w-full rounded-lg blog-image-text-bg"></div>
      <div className="z-30 hidden px-2 pt-2 text-xl font-bold text-white xl:flex lg:text-5xl">
        {title}
      </div>
      <div className="absolute z-10 flex w-full rounded-lg">
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
