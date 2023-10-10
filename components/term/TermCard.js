import React from "react";

function TermCard({ data }) {
  return (
    <div className="flex flex-col w-full">
      <div className="font-bold">{data.term}</div>
      <div>{data.definition}</div>
    </div>
  );
}

export default TermCard;
