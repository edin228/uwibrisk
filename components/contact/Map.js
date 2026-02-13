import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";
import { isLaptop, isMobile, isTablet } from "../../utils/utils";

const PinIcon = ({ color = "#2563eb", size = 28 }) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 24 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20C24 5.373 18.627 0 12 0z"
      fill={color}
    />
    <circle cx="12" cy="12" r="5" fill="white" />
  </svg>
);

const StarIcon = ({ color = "#dc2626", size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={color}
      stroke="white"
      strokeWidth="1"
    />
  </svg>
);

// ── Marker positions ──────────────────────────────────
// Adjust left / top percentages independently for each breakpoint.
// Desktop = 800×400 map, Mobile = 380×400 map.
const desktopMarkers = [
  { id: "ca", type: "pin",  label: "California",     left: "14%", top: "52%", color: "#2563eb" },
  { id: "id", type: "pin",  label: "Idaho",           left: "22%", top: "27%", color: "#2563eb" },
  { id: "tn", type: "star", label: "HQ - Tennessee",  left: "58%", top: "57%", color: "#dc2626" },
];

const mobileMarkers = [
  { id: "ca", type: "pin",  label: "California",     left: "8%", top: "52%", color: "#2563eb" },
  { id: "id", type: "pin",  label: "Idaho",           left: "22%", top: "37%", color: "#2563eb" },
  { id: "tn", type: "star", label: "HQ - Tennessee",  left: "72%", top: "54%", color: "#dc2626" },
];

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

  const markerSize = mobile ? 20 : 28;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <USAMap
        customize={colorMap}
        onClick={mapHandler}
        width={mobile ? 380: 800}
        height={400}
      />
      {(mobile ? mobileMarkers : desktopMarkers).map((marker) => (
        <div
          key={marker.id}
          style={{
            position: "absolute",
            left: marker.left,
            top: marker.top,
            transform:
              marker.type === "pin"
                ? "translate(-50%, -100%)"
                : "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10,
            filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
          }}
          title={marker.label}
        >
          {marker.type === "pin" ? (
            <PinIcon color={marker.color} size={markerSize} />
          ) : (
            <StarIcon color={marker.color} size={markerSize} />
          )}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 8,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          fontSize: mobile ? 10 : 12,
          color: "#4b5563",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <PinIcon color="#2563eb" size={14} />
          <span>Office Location</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <StarIcon color="#dc2626" size={14} />
          <span>Headquarters</span>
        </div>
      </div>
    </div>
  );
}
