import Head from "next/head";

import { WhyUwibPage } from "../../components/hotels/HotelsSupporting";
import companyInfo from "../../utils/companyInfo";

export default function WhyUwib() {
  return (
    <>
      <Head>
        <title>Why UWIB for Boutique Hotels | UWIB Risk</title>
        <meta name="description" content="A hospitality-focused insurance relationship built around your property, operations and long-term risk decisions." />
        <link rel="canonical" href={`${companyInfo.url}/hotels/why-uwib`} />
      </Head>
      <WhyUwibPage />
    </>
  );
}
