import Head from "next/head";
import React from "react";
import ListedBlogCard from "../components/blog/ListedBlogCard";
import Base from "../components/layout/Base";
import { getSearch } from "../services";

function Search({ data, term }) {
  return (
    <Base template={"Home"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <div className="flex w-full text-3xl tracking-widest justify-center items-center mb-4">
          Search for: <span className="ml-4 font-bold">{term}</span>
        </div>
        <ul className="flex flex-col items-start py-4 px-4 md:px-0">
          {data.blogPosts.map((card) => (
            <ListedBlogCard key={card.id} post={card} />
          ))}
        </ul>
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
