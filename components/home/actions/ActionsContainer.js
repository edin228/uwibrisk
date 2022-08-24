import React from "react";
import ActionButton from "./ActionButton";
import { useState } from "react";
import { motion } from "framer-motion";
import { getIcon } from "../../../utils/utils";

function ActionsContainer({homeButtons}) {
  const [selectedID, setSelectedID] = useState(null);

  const tile = {
    visible: {
      opacity: 1,
    },
    hidden: { opacity: 0 },
  };

  return (
    <div
      className="relative w-full h-fit flex shrink-0 justify-center items-center bg-slate-100 drop-shadow-md rounded-md p-2"
      onMouseOut={() => setSelectedID(null)}
    >
      <div className="flex flex-wrap items-start justify-center w-full rounded-md">
        {homeButtons.map((item) => (
          <div
            className="relative flex h-[140px] lg:w-[149.5px] w-[119px] items-center"
            key={item.id}
            onMouseOver={() => setSelectedID(item.id)}
          >
            <ActionButton button={item} />
            {selectedID === item.id && (
              <motion.div
                layoutId="actions"
                initial="hidden"
                animate={selectedID ? "visible" : "hidden"}
                variants={tile}
                transition={{ ease: "easeInOut", duration: 0.25 }}
                className="rounded-md h-full deep-blue-gradient top-0 absolute z-10 w-full shadow-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionsContainer;
