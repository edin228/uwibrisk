import Head from "next/head";
import Base from "../components/layout/Base";
import { getLanding } from "../services";
import { getIcon } from "../utils/utils";
import { motion } from "framer-motion";
import Script from "next/script";

export default function PrivateClient({
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
      <div
        id="splashId"
        data-value="5ccc99bddb83f601b57306fb"
        data-text="Sign Your Waiver Online"
        data-position="right"
        data-backgroundColor="#428bca"
        data-fontColor="#ffffff"
      >
        <Script src="https://www.waiverelectronic.com/js/splashId.js"></Script>
      </div>
    </Base>
  );
}

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const landing = await getLanding();
  return {
    props: {
      landing,
    },
  };
}
