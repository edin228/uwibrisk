import Head from "next/head";
import React from "react";
import BlogContainer from "../../components/blog/BlogContainer";
import Base from "../../components/layout/Base";
import { getRecentTenBlogPosts } from "../../services";
import BreadcrumbSchema from "../../components/schema/BreadcrumbSchema";
import companyInfo from "../../utils/companyInfo";

function Blog({ posts }) {
  return (
    <Base template={"home"}>
      <Head>
        <title>Blog - UWIB Risk</title>
        <meta name="description" content="Insurance insights and updates from United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: companyInfo.url },
          { name: "Blog", url: `${companyInfo.url}/blog` },
        ]}
      />
      <div className="flex flex-col w-full px-2 py-2 space-y-4 lg:space-y-0 lg:gap-4 lg:py-4 lg:px-80">
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
