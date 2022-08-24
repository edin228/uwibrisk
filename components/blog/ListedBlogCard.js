import React from "react";
import { memo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { takeRight } from "lodash";
import Link from "next/link";

function ListedBlogCard({ post }) {
  return (
    <li className="listed-blog-card py-1 lg:p-2">
      <div className={`listed-blog-card-content-container`}>
        <motion.div className="flex flex-col cursor-pointer" layout={true}>
          <Link href={`/blog/${post.slug}`}>
            <a className="flex justify-end w-full text-md hover:text-sky-500 transition duration-100 font-bold uppercase tracking-widest">
              <div className="flex font-bold mb-2">{post.title}</div>
            </a>
          </Link>
          <div className="flex flex-wrap space-x-2">
            {post.blogTags.map((tag) => (
              <div
                key={tag.id}
                className="text-sm rounded-md px-2"
                style={{
                  background: tag.backgroundColor.hex,
                  color: tag.textColor.hex,
                }}
              >
                {tag.title}
              </div>
            ))}
          </div>
          <div className="w-full h-[5px] blue-green-gradient rounded-lg mt-4" />
        </motion.div>
      </div>
    </li>
  );
}

export default ListedBlogCard;
