import React from "react";
import Head from "next/head";
import Base from "../../components/layout/Base";
import { getBlogPost, getRecentBlogPosts } from "../../services";
import RecentBlogColumn from "../../components/blog/RecentBlogColumn";
import { BlogHeader } from "../../components/blog/BlogHeader";
import Image from "next/image";

function BlogPost({ data, recentBlogs }) {
  return (
    <Base template={"Blog"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col py-2 px-2 space-y-4 lg:space-y-0 lg:gap-4 lg:py-4">
        <BlogHeader
          title={data.title}
          id={data.featuredImage.id}
          image={data.featuredImage.url}
        />

        <div className="flex flex-col lg:flex-row w-full">
          <div className="flex flex-col w-full px-4">
            <div className="flex flex-wrap space-x-2">
              {data.blogTags.map((tag) => (
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
            {data.teamMember?.photo ? (
              <div className="flex w-full mt-4 ">
                <div className="rounded-lg mr-4">
                  <Image
                    src={data.teamMember?.photo?.url}
                    alt="author-pic"
                    width={50}
                    height={50}
                    className="rounded-full"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="font-bold flex">{data.teamMember?.name}</div>
                  <div>{data.teamMember?.position}</div>
                </div>
              </div>
            ) : null}
            <div dangerouslySetInnerHTML={{ __html: data.content.html }}></div>
          </div>
          <div className="flex w-full lg:w-1/4 px-4">
            <RecentBlogColumn posts={recentBlogs} />
          </div>
        </div>
      </div>
    </Base>
  );
}

export default BlogPost;

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const data = await getBlogPost(params.slug);
  const recentBlogs = await getRecentBlogPosts();

  return {
    props: { data, recentBlogs },
  };
}
