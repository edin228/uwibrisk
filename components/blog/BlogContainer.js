import React from "react";
import { BlogCard } from "./BlogCard";

function BlogContainer( {posts}) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full mb-4 justify-center text-center items-center uppercase tracking-widest font-semibold">
        News & Insights
      </div>
      <ul className="flex px-4 flex-wrap items-start h-[800px] lg:h-[600px]">
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
