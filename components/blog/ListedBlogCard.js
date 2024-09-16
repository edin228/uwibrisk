import React from "react";
import { memo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { takeRight } from "lodash";
import Link from "next/link";
import { truncateString } from "../../utils/utils";


function ListedBlogCard({ post, large = false }) {
  return (
    <li className="w-full py-1 listed-blog-card lg:p-2">
      <div className={`listed-blog-card-content-container`}>
        <motion.div className="flex flex-col cursor-pointer" layout={true}>
          <div className="flex items-center w-full">
            {large && (
              <motion.img
                className="w-[340px] rounded-lg shadow-lg hidden 2xl:flex"
                src={post.featuredImage?.url}
                alt="Blog featured image"
                data-featured-image={post.featuredImage?.url}
                initial={false}
              />
            )}
            <div className={`${large ? "px-4" : ""}`}>
              <Link href={`/blog/${post.slug}`}>
                <a className="flex w-full font-bold tracking-widest uppercase transition duration-100 text-md hover:text-yellow-500">
                  <div className="flex font-bold">{post.title}</div>
                </a>
              </Link>
              <div className="flex gap-1 py-2">
                {post.blogTags.map((tag) => (
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
              </div>
              {large && <div className="py-2">{truncateString(post.excerpt, 400)}</div>}
              {large && (
                <Link href={`/blog/${post.slug}`}>
                  <a className="flex w-full font-bold tracking-widest uppercase transition duration-100 text-md hover:text-yellow-500">
                    <div className="flex font-bold">Read More</div>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </li>
  );
}

export default ListedBlogCard;
