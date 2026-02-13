import * as React from "react";
import { motion, useDeprecatedInvertedScale } from "framer-motion";
import { closeSpring } from "./animations";

export const BlogImage = ({
  id,
  image,
  isSelected,
}) => {
  const inverted = useDeprecatedInvertedScale(15,15);

  return (
    <motion.div
      className="blog-card-image-container"
      style={{...inverted, originX: 0, originY: 0 }}
    >
      <div className="z-10 flex absolute left-0 top-0 w-full blog-image-text-bg h-full"></div>
      <motion.img
        className="card-image"
        src={image}
        alt="Blog featured image"
        data-featured-image={image}
        data-image-url={image}
        initial={false}
        animate={
          isSelected ? { maxWidth:'100%' } : { maxWidth:'100%' }
        }
        transition={closeSpring}
      />
    </motion.div>
  );
};
