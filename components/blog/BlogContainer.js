import React from "react";
import { BlogCard } from "./BlogCard";

function BlogContainer( {posts}) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-center w-full mb-4 font-semibold tracking-widest text-center uppercase">
        News & Insights
      </div>
      <ul className="flex flex-wrap items-start">
        {posts.map((card) => (
          <BlogCard
            key={card.id}
            {...card}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogContainer;
