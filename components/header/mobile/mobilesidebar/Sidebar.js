import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import { useDimensions } from "./user-dimensions";
import Image from "next/image";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    background: "#fff",
  }),
  closed: {
    clipPath: "circle(25px at 271px 42px)",
    background: "#fff0",
  },
};

export const Sidebar = ({ navItems }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={isOpen ? "open-nav" : "z-0"}
    >
      <motion.div className="sb-background" variants={sidebar} />
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-[240px] h-[80px] fixed top-0 left-4`}
      >
        <Image
          src="/UWIB-Wide-Black.jpg"
          alt="logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <Navigation isOpen={isOpen} navItems={navItems} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
