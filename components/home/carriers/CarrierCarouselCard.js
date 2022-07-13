import React from "react";
import Image from "next/image";

function CarrierCarouselCard({ carrier }) {
  return (
    <div className="w-7/12 h-[60px] relative grayscale hover:grayscale-0 transition duration-200 ease-out">
      <Image src={carrier.image} alt={carrier.name} layout="fill" objectFit="contain" />
    </div>
  );
}

export default CarrierCarouselCard;
