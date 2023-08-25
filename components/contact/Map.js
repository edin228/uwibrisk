import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import { isLaptop, isMobile, isTablet } from "../../utils/utils";

export default function Map({ mapCallback, selectedStates }) {

  const mobile = isMobile()
  const laptop = isLaptop()
  const tablet = isTablet()

  const generateInitialColorMap = () => {
    const initialMap = {};
    selectedStates.forEach((state) => {
      initialMap[state] = { fill: "#eab308" };
    });
    return initialMap;
  };

  const [colorMap, setColorMap] = useState(generateInitialColorMap);

  const mapHandler = (e) => {
    const stateName = e.target.dataset.name;
    mapCallback(stateName);

    const newColorMap = { ...colorMap }; // Clone the colorMap
    const isPresent = selectedStates.includes(stateName);

    newColorMap[stateName] = !isPresent
      ? { fill: "#eab308" }
      : { fill: "#D3D3D3" };

    setColorMap(newColorMap);
  };
  return (
    <div>
      <USAMap
        customize={colorMap}
        onClick={mapHandler}
        width={mobile ? 380: 800}
        height={400}
      />
    </div>
  );
}
