import * as React from "react";
import { motion, useDeprecatedInvertedScale } from "framer-motion";
import Link from "next/link";

// eslint-disable-next-line react/display-name
export const Placeholder = React.memo(({ slug, excerpt }) => {
  const inverted = useDeprecatedInvertedScale(15, 15);
  return (
    <motion.div
      className="content-container text-white flex flex-col"
      style={{ ...inverted, originY: 0, originX: 0 }}
    >
      {excerpt}
      <Link href={`/blog/${slug}`}>
        <a className="flex justify-end w-full text-md text-sky-500 font-bold uppercase tracking-widest">
          Read More
        </a>
      </Link>
    </motion.div>
  );
});
