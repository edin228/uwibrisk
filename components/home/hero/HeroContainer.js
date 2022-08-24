import React from "react";
import HeroCard from "./HeroCard";

function HeroContainer( {locations = []} ) {
  return (
    <div className="flex flex-col w-full lg:!mt-[-40px] z-20">
      <div className="flex overflow-x-auto space-x-2 lg:space-x-0 lg:gap-4 lg:w-full rounded-md">
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
