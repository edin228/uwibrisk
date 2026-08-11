import Head from "next/head";

import { CoveragePage } from "../../components/hotels/HotelsSupporting";
import companyInfo from "../../utils/companyInfo";

export default function HotelCoverage() {
  return (
    <>
      <Head>
        <title>Boutique Hotel Insurance Coverage | UWIB Risk</title>
        <meta name="description" content="Connected property, liability, workers’ compensation, cyber and management-risk coverage for California boutique hotels." />
        <link rel="canonical" href={`${companyInfo.url}/hotels/coverage`} />
      </Head>
      <CoveragePage />
    </>
  );
}
