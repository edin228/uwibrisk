import React from "react";
import Image from "next/image";
import { graphCMSImageLoader } from "../../../utils/utils";

function CarrierCarouselCard({ carrier }) {
  return (
    <div className="flex w-4/12 lg:flex-1 shrink-0 relative rounded-md h-[140px] transition duration-200 ease-out">
      <Image loader={graphCMSImageLoader} src={carrier.logo?.url} alt={carrier.name} layout="fill" objectFit="contain" />
    </div>
  );
}

export default CarrierCarouselCard;
