import Head from "next/head";
import React from "react";
import Base from "../../components/layout/Base";
import { motion } from "framer-motion";
import { getRecentBlogPosts, getTeamMember } from "../../services";
import { getIcon } from "../../utils/utils";
import BlogContainer from "../../components/blog/BlogContainer";

function TeamMember({ data, posts }) {
  return (
    <Base template={"Member"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col h-full px-12 2xl:w-3/4">
          <div className="flex flex-col items-center justify-center h-full md:flex-row md:justify-start md:items-start">
            <div className="flex relative min-w-[350px] h-[350px] md:my-8 overflow-hidden rounded-lg shadow-lg">
              <motion.img
                className="object-cover w-full h-full"
                src={data.photo.url}
                alt=""
                initial={false}
              />
            </div>
            <div className="flex flex-col px-6 py-6">
              <div className="text-4xl font-bold">{data.name}</div>
              <div className="text-2xl font-semibold">{data.position}</div>
              <div className="flex items-center py-2 space-x-2">
                {data.email ? (
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center transition duration-200 hover:text-sky-500"
                  >
                    <div className="pr-4">{getIcon("email")}</div>
                    <div>{data.email}</div>
                  </a>
                ) : null}
                {data.phone ? (
                  <div className="flex items-center">
                    <div className="pr-4">{getIcon("phone")}</div>
                    <div>{data.phone}</div>
                  </div>
                ) : null}
              </div>
              <div
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: data.bIo.html }}
              ></div>
            </div>
          </div>
          <BlogContainer posts={posts} />
        </div>
      </div>
    </Base>
  );
}

export default TeamMember;

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const data = await getTeamMember(`team/${params.slug}`);
  const posts = await getRecentBlogPosts();
  return {
    props: { data, posts },
  };
}
