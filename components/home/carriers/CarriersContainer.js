import React from "react";
import CarrierCarouselCard from "./CarrierCarouselCard";

function CarriersContainer({carriers}) {
  return (
    <div className="flex flex-col w-full h-full rounded-md">
      <div className="flex w-full justify-center text-center items-center uppercase tracking-widest font-semibold">
        we only partner with the best
      </div>
      <div className="flex max-w-[100vw] h-full py-2 lg:py-4 overflow-x-auto opacity-80 px-4">
        {carriers.map((item) => (
          <CarrierCarouselCard key={item.id} carrier={item} />
        ))}
      </div>
    </div>
  );
}

export default CarriersContainer;
