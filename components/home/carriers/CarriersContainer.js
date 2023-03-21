import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { graphCMSImageLoader } from "../../../utils/utils";
import CarrierCarouselCard from "./CarrierCarouselCard";

function CarriersContainer({ carriers }) {
  const [loaded, setLoaded] = useState(false);
  const [responsive, setResponsive] = useState({
    0: { items: 3 },
    568: { items: 2 },
    1024: { items: 7 },
  });

  useEffect(() => {
    setLoaded(true);

    return () => {
      setLoaded(false);
    };
  }, []);

  const handleDragStart = (e) => e.preventDefault();

  const items = carriers.map((x) => (
    <div className="flex items-center justify-center w-full h-full" key={x.id}>
      <img
        src={x.logo?.url}
        alt={x.name}
        role="presentation"
        className="h-[80px] object-contain"
      />
    </div>
  ));

  return (
    <div className="flex flex-col w-full rounded-md">
      <div className="flex items-center justify-center w-full mb-2 font-semibold tracking-widest text-center uppercase">
        we only partner with the best
      </div>
      <div className="w-full py-2">
        {loaded ? (
          <AliceCarousel
            items={items}
            responsive={responsive}
            autoPlay
            autoPlayStrategy="default"
            autoPlayInterval={2000}
            animationDuration={400}
            animationType="fadeout"
            infinite
            touchTracking={false}
            disableDotsControls
            disableButtonsControls
          />
        ) : null}
      </div>

      {/* <div className="flex  bg-white w-[400px] lg:w-full overflow-x-auto rounded-md">
        {carriers.map((item) => (
          <CarrierCarouselCard key={item.id} carrier={item} />
        ))}
      </div> */}
    </div>
  );
}

export default CarriersContainer;
