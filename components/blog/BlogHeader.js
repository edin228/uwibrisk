import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const BlogHeader = ({ id, image, title }) => {
  return (
    <div className="flex relative w-full h-[30vh] rounded-lg">
      <div className="z-10 flex absolute left-0 top-0 w-full blog-image-text-bg h-full rounded-lg">
      </div>
      <div className="text-white z-30 font-bold text-2xl lg:text-5xl p-8">{title}</div>
      <div className="flex absolute w-full h-[30vh] rounded-lg">
        <Image src={image} alt="header-pic" className=" rounded-lg" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};
