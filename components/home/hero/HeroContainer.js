import React from "react";
import HeroCard from "./HeroCard";

function HeroContainer( {locations = []} ) {
  return (
    <div className="flex flex-col h-[190px] w-full z-20">
      <div className="flex overflow-x-auto lg:overflow-visible space-x-2 lg:space-x-0 lg:gap-4 w-full rounded-md">
      {locations.map((card) => (
          <HeroCard
          key={card.id}
          image={card.image?.url}
          label={card.state}
          sublabel={card.subtitle}
        />
        ))}
      </div>
    </div>
  );
}

export default HeroContainer;
