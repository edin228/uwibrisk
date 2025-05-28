import Head from "next/head";
import React from "react";
import Base from "../components/layout/Base";
import { useRouter } from "next/router";

function DirtHaulers() {
  const router = useRouter();

  return (
    <Base template="DualColumn">
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <h1 className="w-full py-8 text-3xl font-bold text-center">
          Dirt Haulers: Slash Insurance Costs & Avoid Pitfalls
        </h1>
        <div className="flex justify-center">
          <video
            src="https://media.graphassets.com/I5lQ9O1nTv2SBBitaDMw"
            controls
            className="w-full max-w-2xl"
            onEnded={() =>
              router.push(
                "https://uwibrisk.com/southern-states-dirt-hauling-and-excavation-contractors"
              )
            }
          />
        </div>
      </div>
    </Base>
  );
}

export default DirtHaulers;