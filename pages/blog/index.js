import Head from "next/head";
import React from "react";
import BlogContainer from "../../components/blog/BlogContainer";
import Base from "../../components/layout/Base";
import { getRecentTenBlogPosts } from "../../services";

function Blog({ posts }) {
  return (
    <Base template={"home"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col py-2 px-2 space-y-4 lg:space-y-0 lg:gap-4 lg:py-4">
        <BlogContainer posts={posts} />
      </div>
    </Base>
  );
}

export default Blog;

// Fetch data at build time
export async function getServerSideProps() {
  const posts = await getRecentTenBlogPosts();
  return {
    props: { posts },
  };
}