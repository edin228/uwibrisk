import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import { useDimensions } from "./user-dimensions";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    background: '#fff',
    transition: {
      type: "spring",
      stiffness: 300,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(25px at 271px 42px)",
    background: '#fff',
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export const Sidebar = ({navItems}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={isOpen?'open-nav':''}
    >
      <motion.div className="sb-background" variants={sidebar} />
      <Navigation isOpen={isOpen} navItems={navItems} />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
