import Head from "next/head";
import React, { useState } from "react";
import ListedBlogCard from "../components/blog/ListedBlogCard";
import Base from "../components/layout/Base";
import TeamCard from "../components/team/TeamCard";
import { getSearch } from "../services";

function Search({ data, term }) {
  const [showBlog, setShowBlog] = useState(true);
  const [showTeam, setShowTeam] = useState(true);
  const [showPages, setShowPages] = useState(true);

  return (
    <Base template={"Home"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col w-full text-3xl tracking-widest justify-center items-center mb-4">
          <div>Search for: </div>
          <div className="flex items-center text-center ml-4 font-bold">{term}</div>
        </div>
        <div className="flex w-full justify-center space-x-2">
          <div className="flex items-center">
            <div
              onClick={() => setShowBlog(!showBlog)}
              className={`cursor-pointer hover:text-sky-500 duration-100 ease-out transition font-bold ${
                showBlog ? "" : "opacity-50 line-through"
              }`}
            >
              Blogs
            </div>
          </div>
          <div className="flex items-center">
            <div
              onClick={() => setShowPages(!showPages)}
              className={`cursor-pointer hover:text-sky-500 duration-100 ease-out transition font-bold ${
                showPages ? "" : "opacity-50 line-through"
              }`}
            >
              Pages
            </div>
          </div>
          <div className="flex items-center">
            <div
              onClick={() => setShowTeam(!showTeam)}
              className={`cursor-pointer hover:text-sky-500 duration-100 ease-out transition font-bold ${
                showTeam ? "" : "opacity-50 line-through"
              }`}
            >
              Team
            </div>
          </div>
        </div>
        {showBlog && data.blogPosts.length > 0 ? (
          <ul className="flex flex-col items-start py-4 px-4 md:px-0">
            {data.blogPosts.map((card) => (
              <ListedBlogCard key={card.id} post={card} />
            ))}
          </ul>
        ) : null}
        {showTeam && data.teamMembers.length > 0 ? (
          <ul className="flex flex-col items-start py-4 px-4 md:px-0">
            {data.teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </ul>
        ) : null}
        {showPages && data.pages.length > 0 ? (
          <ul className="flex flex-col items-start py-4 px-4 md:px-0">
            {data.pages.map((card) => (
              <div key={card.id}>{card.title}</div>
            ))}
          </ul>
        ) : null}
        {data.blogPosts.length < 1 && data.teamMembers.length < 1 && data.pages.length < 1 ?
            <div className="font-bold text-4xl py-8 text-center w-full">No Results</div>
            :null
        }

      </div>
    </Base>
  );
}

export default Search;

export async function getServerSideProps({ query }) {
  const data = await getSearch(query.q);
  return {
    props: { data, term: query.q },
  };
}
