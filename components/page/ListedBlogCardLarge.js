import React from "react";
import { motion } from "framer-motion";

function ListedBlogCardLarge({ page }) {
  return (
    <li className="w-full py-1 listed-blog-card lg:p-2">
      <div className={`listed-blog-card-content-container`}>
        <motion.div className="flex flex-col cursor-pointer" layout={true}>
          <a
            href={`/${page.slug}`}
            className="flex w-full font-bold tracking-widest uppercase transition duration-100 text-md hover:text-sky-500"
          >
            <div className="flex mb-2 font-bold">{page.title}</div>
          </a>
          {/* <div className="flex flex-wrap space-x-2">
            {page.blogTags.map((tag) => (
              <div
                key={tag.id}
                className="px-2 text-sm rounded-md"
                style={{
                  background: tag.backgroundColor.hex,
                  color: tag.textColor.hex,
                }}
              >
                {tag.title}
              </div>
            ))}
          </div> */}
          <div className="w-full h-[5px] blue-green-gradient rounded-lg mt-4" />
        </motion.div>
      </div>
    </li>
  );
}

export default ListedBlogCardLarge;
