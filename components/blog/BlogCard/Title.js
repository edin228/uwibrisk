import * as React from "react";
import { motion, useDeprecatedInvertedScale } from "framer-motion";
import { closeSpring, openSpring } from "./animations";

export const Title = ({ title, category, isSelected }) => {
  const x = isSelected ? 30 : 15;
  const y = x;
  const inverted = useDeprecatedInvertedScale(x,y);

  return (
    <motion.div
      className="z-40 title-container"
      initial={false}
      animate={{ x, y }}
      transformTemplate={scaleTranslate}
      style={{ ...inverted, originX: 0, originY: 0 }}
    >
      {category.map(cat => (
        <span key={cat.id} className="category text-shadow">{cat.title}</span>
      ))}
      <h2 className="text-lg font-bold drop-shadow-2xl md:text-2xl text-shadow">{title}</h2>
    </motion.div>
  );
};

/**
 * `transform` is order-dependent, so if you scale(0.5) before translateX(100px),
 * the visual translate will only be 50px.
 *
 * The intuitive pattern is to translate before doing things like scale and
 * rotate that will affect the coordinate space. So Framer Motion takes an
 * opinion on that and allows you to animate them
 * individually without having to write a whole transform string.
 *
 * However in this component we're doing something novel by inverting
 * the scale of the parent component. Because of this we want to translate
 * through scaled coordinate space, and can use the transformTemplate prop to do so.
 */
const scaleTranslate = ({ x, y, scaleX, scaleY }) =>
  `scaleX(${scaleX}) scaleY(${scaleY}) translate(${x}, ${y}) translateZ(0)`;
