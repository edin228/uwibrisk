import Head from "next/head";
import ActionsContainer from "../components/home/actions/ActionsContainer";
import BlogContainer from "../components/blog/BlogContainer";
import CarriersContainer from "../components/home/carriers/CarriersContainer";
import HeroContainer from "../components/home/hero/HeroContainer";
import Landing from "../components/home/landing/Landing";
import TestemonialContainer from "../components/home/testemonials/TestemonialContainer";
import Base from "../components/layout/Base";
import {
  getCarriers,
  getHomeActionButtons,
  getLanding,
  getOfficeLocations,
  getRecentBlogPosts,
  getTestemonials,
} from "../services";
import HomeContainer from "../components/home/v2/HomeContainer";

export default function Home({
  landing = null,
  officeLocations = null,
  carriers = null,
  posts = null,
  testemonials = null,
  homeButtons = null,
}) {
  return (
    <Base template={"home"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col py-2 px-2 space-y-4 lg:space-y-0 lg:gap-4 lg:py-4">
        {/* <div>
          <Landing locations={landing} />
        </div>
        <HeroContainer locations={officeLocations} />
        <CarriersContainer carriers={carriers} />
        <ActionsContainer homeButtons={homeButtons}/>
        <BlogContainer posts={posts} />
        <TestemonialContainer testemonials={testemonials} /> */}
        <HomeContainer
          landing={landing}
          officeLocations={officeLocations}
          carriers={carriers}
          posts={posts}
          testemonials={testemonials}
          homeButtons={homeButtons}
        />
        <HeroContainer locations={officeLocations} />
        <CarriersContainer carriers={carriers} />
        <ActionsContainer homeButtons={homeButtons}/>
        <BlogContainer posts={posts} />
      </div>
    </Base>
  );
}

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const landing = await getLanding();
  const officeLocations = await getOfficeLocations();
  const carriers = await getCarriers();
  const posts = await getRecentBlogPosts();
  const testemonials = await getTestemonials();
  const homeButtons = await getHomeActionButtons();

  return {
    props: {
      landing,
      officeLocations,
      carriers,
      testemonials,
      posts,
      homeButtons,
    },
  };
}
