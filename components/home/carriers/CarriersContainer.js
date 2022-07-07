import React from "react";
import CarrierCarouselCard from "./CarrierCarouselCard";

function CarriersContainer() {
  const carriers = [
    {
      id: 1,
      name: "Chubb",
      image:
        "https://925681.smushcdn.com/2340851/wp-content/uploads/2020/02/chubb-300x56.jpg?lossy=1&strip=1&webp=1",
    },
    {
      id: 2,
      name: "hanover",
      image:
        "https://925681.smushcdn.com/2340851/wp-content/uploads/2020/02/Hanover-300x56.jpg?lossy=1&strip=1&webp=1",
    },
    {
      id: 3,
      name: "nationwide",
      image:
        "https://925681.smushcdn.com/2340851/wp-content/uploads/2020/02/Nationwide-300x56.jpg?lossy=1&strip=1&webp=1",
    },
    {
      id: 4,
      name: "travelers",
      image:
        "https://925681.smushcdn.com/2340851/wp-content/uploads/2020/02/travelers-300x56.jpg?lossy=1&strip=1&webp=1",
    },
    {
      id: 5,
      name: "safeco",
      image:
        "https://925681.smushcdn.com/2340851/wp-content/uploads/2020/02/safeco1-300x57.jpg?lossy=1&strip=1&webp=1",
    },
    {
      id: 6,
      name: "mercury",
      image:
        "https://925681.smushcdn.com/2340851/wp-content/uploads/2020/02/mercury-300x56.jpg?lossy=1&strip=1&webp=1",
    },
    {
        id: 7,
        name: "lm",
        image:
          "https://925681.smushcdn.com/2340851/wp-content/uploads/2020/02/libery-mutual-300x106.jpg?lossy=1&strip=1&webp=1",
      },
      {
        id: 8,
        name: "prm",
        image:
          "https://925681.smushcdn.com/2340851/wp-content/uploads/2021/12/Capture-171x110.png?lossy=1&strip=1&webp=1",
      },
      {
        id: 9,
        name: "hrt",
        image:
          "https://925681.smushcdn.com/2340851/wp-content/uploads/2020/02/the-hartford-300x56.jpg?lossy=1&strip=1&webp=1",
      },
  ];
  return (
    <div className="flex flex-col w-full h-[10vh] rounded-lg">
      <div className="flex w-full justify-center text-center items-center uppercase tracking-widest font-semibold">
        we only partner with the best
      </div>
      <div className="flex flex-auto shrink-0 overflow-x-auto opacity-80">
        {carriers.map((item) => (
          <CarrierCarouselCard key={item.id} carrier={item} />
        ))}
      </div>
    </div>
  );
}

export default CarriersContainer;
