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
        <title>UWIB Risk</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center w-full h-[600px] font-bold text-center">This page is a demonstration of the waiver tab once installed on your website</div>
      <div
        id="splashId"
        data-value="5ccc99bddb83f601b57306fb"
        data-text="Sign Your Waiver Online"
        data-position="right"
        data-backgroundColor="#ad8574"
        data-fontColor="#000000"
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
