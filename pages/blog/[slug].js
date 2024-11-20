import React from "react";
import Head from "next/head";
import Base from "../../components/layout/Base";
import { getBlogPost, getRecentBlogPosts } from "../../services";
import RecentBlogColumn from "../../components/blog/RecentBlogColumn";
import { BlogHeader } from "../../components/blog/BlogHeader";
import Image from "next/image";

function BlogPost({ data, recentBlogs }) {
  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta property="og:description" content={data?.excerpt} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={data?.title} />
        <meta property="og:image" content={data?.featuredImage.url} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:url"
          content={`https://uwibrisk.com/${data?.slug}`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="article:published_time" content={data?.publishedAt} />
      </Head>
      <Base template={"Blog"}>
        <div className="flex flex-col w-full p-4 xl:flex-row xl:w-3/4 xl:mx-auto">
          <div className="flex flex-col w-full">
            <div className="block mb-4">
              <BlogHeader
                title={data?.title}
                id={data?.featuredImage.id}
                image={data?.featuredImage.url}
              />
            </div>
            <div className="z-30 flex py-2 text-xl font-bold xl:hidden lg:text-4xl">
              {data?.title}
            </div>
            <div className="flex flex-col w-full lg:flex-row">
              <div className="flex flex-col w-full blog gap-2">
                <div className="flex flex-wrap space-x-2">
                  {data?.blogTags.map((tag) => (
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
                {data?.teamMember?.blogPhoto ? (
                  <div className="flex w-full mt-4">
                    <div className="flex items-center justify-center mr-4 rounded-lg shadow-lg">
                      <Image
                        src={data?.teamMember?.blogPhoto?.url}
                        alt="author-pic"
                        width={50}
                        height={50}
                        className="rounded-full"
                        objectFit="cover"
                      />
                      <img
                        src={data?.teamMember?.blogPhoto?.url}
                        alt="featured image"
                        className="hidden"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex font-bold">
                        {data?.teamMember?.name}
                      </div>
                      <div>{data?.teamMember?.position}</div>
                    </div>
                  </div>
                ) : null}
                <div className="flex w-full h-full bg-white rounded-md p-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.content.html }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full px-4 lg:w-1/4">
            <RecentBlogColumn posts={recentBlogs} />
          </div>
        </div>
      </Base>
    </>
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
