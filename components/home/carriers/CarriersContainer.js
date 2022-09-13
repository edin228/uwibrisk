import React from "react";
import CarrierCarouselCard from "./CarrierCarouselCard";

function CarriersContainer({ carriers }) {
  return (
    <div className="flex flex-col w-full h-[200px] rounded-md">
      <div className="flex w-full justify-center text-center items-center uppercase tracking-widest font-semibold">
        we only partner with the best
      </div>
      <div className="flex overflow-x-auto space-x-2 lg:space-x-0 lg:gap-4 lg:w-full rounded-md bg-white">
        {carriers.map((item) => (
          <CarrierCarouselCard key={item.id} carrier={item} />
        ))}
      </div>
    </div>
  );
}

export default CarriersContainer;
