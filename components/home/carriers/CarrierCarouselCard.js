import React from "react";
import Image from "next/image";

function CarrierCarouselCard({ carrier }) {
  return (
    <div className="flex w-7/12 lg:flex-1 shrink-0 relative grayscale">
      <Image src={carrier.image} alt={carrier.name} layout="fill" objectFit="contain" />
    </div>
  );
}

export default CarrierCarouselCard;
