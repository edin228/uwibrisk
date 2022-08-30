import React from "react";
import Image from "next/image";

function HeroCard({ image = "/", label, sublabel }) {
  return (
    <div className="flex w-10/12 lg:flex-1 shrink-0 relative rounded-md h-[120px] blue-orange-gradient hero-card lg:bg-cover lg:bg-fixed  text-white  shadow-2xl">
      <div className="w-full h-full relative opacity-50 rounded-md overflow-hidden">
        <Image src={image} alt="LA" layout="fill" objectFit="cover" />
      </div>
      <div className="flex items-end flex-col absolute right-0 bottom-0 p-4 z-40">
        <div className="text-2xl drop-shadow-xl uppercase font-bold tracking-widest">
          {label}
        </div>
        <div className="drop-shadow-xl font-semibold">{sublabel}</div>
      </div>
    </div>
  );
}

export default HeroCard;
