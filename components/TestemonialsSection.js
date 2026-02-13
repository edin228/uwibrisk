import React from "react";
import { useState } from "react";
import { getTestemonials } from "../services";
import { useEffect } from "react";
import TestemonialPageCard from "./home/testemonials/TestemonialPageCard";

function TestemonialsSection({ data }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const handleChange = async () => {
      const info = await getTestemonials();
      if (info) {
        setContent(info);
      }
    };
    handleChange();
    return () => {};
  }, [data]);

  return (
    <div className="py-4 my-12">
      <div className="flex flex-col items-center justify-center w-full gap-2 mb-8 font-semibold text-center">
        <div className="tracking-widest uppercase">
          See what our clients are saying
        </div>
      </div>
      <div className="z-40 flex flex-col md:flex-row flex-wrap items-center justify-center w-full gap-2">
        {content?.slice(1, 9).map((card, i) => (
          <TestemonialPageCard key={card.id} testemonial={card} />
        ))}
      </div>
    </div>
  );
}

export default TestemonialsSection;
