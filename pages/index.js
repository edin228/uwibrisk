import Head from "next/head";
import ActionsContainer from "../components/home/actions/ActionsContainer";
import BlogContainer from "../components/home/blog/BlogContainer";
import CarriersContainer from "../components/home/carriers/CarriersContainer";
import HeroContainer from "../components/home/hero/HeroContainer";
import Landing from "../components/home/landing/Landing";
import TestemonialContainer from "../components/home/testemonials/TestemonialContainer";
import Base from "../components/layout/Base";

export default function Home() {
  return (
    <Base template={"home"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col py-2 px-2 space-y-4 lg:space-y-0 lg:gap-4 lg:py-4">
        <Landing />
        <HeroContainer />
        <CarriersContainer />
        <div className="flex flex-col-reverse lg:flex-row space-y-4 lg:space-y-0 lg:gap-4 w-full">
          <BlogContainer />
          <div className="flex flex-col w-full space-y-4 lg:space-y-0 lg:gap-4">
            <ActionsContainer />
            <TestemonialContainer />
          </div>
        </div>
      </div>
    </Base>
  );
}
