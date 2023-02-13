import React from "react";
import CarrierCarouselCard from "./CarrierCarouselCard";

function CarriersContainer({ carriers }) {
  return (
    <div className="flex flex-col w-full h-[200px] rounded-md">
      <div className="flex items-center justify-center w-full font-semibold tracking-widest text-center uppercase">
        we only partner with the best
      </div>
      <div className="flex  bg-white w-[400px] lg:w-full overflow-x-auto rounded-md">
        {carriers.map((item) => (
          <CarrierCarouselCard key={item.id} carrier={item} />
        ))}
      </div>
    </div>
  );
}

export default CarriersContainer;
