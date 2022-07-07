import React from "react";
import HeroCard from "./HeroCard";

function HeroContainer() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-center text-center items-center uppercase tracking-widest font-semibold">
        WE'RE LOCATED IN
      </div>
      <div className="flex flex-auto shrink-0 overflow-x-auto lg:overflow-x-visible space-x-2 lg:space-x-0 lg:gap-4 lg:w-full rounded-lg">
        <HeroCard
          image={"/laskyline.jpg"}
          label={"Los Angeles"}
          sublabel={"Est. 1995"}
        />
        <HeroCard
          image={"/seattleskyline.jpg"}
          label={"Seattle"}
          sublabel={"Est. 2018"}
        />
        <HeroCard
          image={"/idahoskyline.jpg"}
          label={"Idaho"}
          sublabel={"Est. 2020"}
        />
        <HeroCard
          image={"/tnskyline.jpg"}
          label={"Tennessee"}
          sublabel={"Est. 2022"}
        />
      </div>
    </div>
  );
}

export default HeroContainer;
