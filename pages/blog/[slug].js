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
        <meta
          name="description"
          property="og:description"
          content={data?.excerpt}
        />
        <meta name="type" property="og:type" content="website" />
        <meta name="title" property="og:title" content={data?.title} />
        <meta
          name="image"
          property="og:image"
          content={data?.featuredImage.url}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base template={"Blog"}>
        <div className="flex flex-col w-full px-2 py-2 space-y-4 xl:w-3/4 xl:mx-auto lg:space-y-0 lg:gap-4 lg:py-4">
          <BlogHeader
            title={data?.title}
            id={data?.featuredImage.id}
            image={data?.featuredImage.url}
          />

          <div className="flex flex-col w-full lg:flex-row">
            <div className="flex flex-col w-full px-4 blog">
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
                  </div>
                  <div className="flex flex-col">
                    <div className="flex font-bold">
                      {data?.teamMember?.name}
                    </div>
                    <div>{data?.teamMember?.position}</div>
                  </div>
                </div>
              ) : null}
              <div
                dangerouslySetInnerHTML={{ __html: data?.content.html }}
              ></div>
            </div>
            <div className="flex w-full px-4 lg:w-1/4">
              <RecentBlogColumn posts={recentBlogs} />
            </div>
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
