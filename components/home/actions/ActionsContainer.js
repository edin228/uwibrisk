import React from "react";
import ActionButton from "./ActionButton";
import { TbCertificate } from "react-icons/tb";
import { GoReport } from "react-icons/go";
import { MdRequestQuote, MdOutlinePayments } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";

function ActionsContainer() {
  const [selectedID, setSelectedID] = useState(null);

  const actions = [
    {
      id: 1,
      icon: <TbCertificate />,
      href: "/",
      text: "Certificate of Insurance",
    },
    { id: 2, icon: <MdRequestQuote />, href: "/", text: "Get a Quote" },
    { id: 3, icon: <MdOutlinePayments />, href: "/", text: "Make a Payment" },
  ];

  const tile = {
    visible: {
      opacity: 1,
    },
    hidden: { opacity: 0 },
  };

  return (
    <div className="relative w-full h-fit flex justify-center items-center bg-slate-100 drop-shadow-md rounded-md p-2" onMouseOut={() => setSelectedID(null)}>
      <div className="flex flex-wrap items-start justify-center w-full rounded-md">
        {actions.map((item) => (
          <div
            className="relative flex h-[140px] lg:w-[149.5px] w-[119px] items-center"
            key={item.id}
            onMouseOver={() => setSelectedID(item.id)}
          >
            <ActionButton icon={item.icon} href={item.href} text={item.text} />
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
