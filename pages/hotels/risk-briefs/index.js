import Head from "next/head";

import { RiskBriefLibraryPage } from "../../../components/hotels/HotelsSupporting";
import companyInfo from "../../../utils/companyInfo";

export default function HotelRiskBriefs() {
  return (
    <>
      <Head>
        <title>California Hospitality Risk Brief | UWIB Risk</title>
        <meta name="description" content="Practical risk-management insights for California boutique hotel owners, general managers and department leaders." />
        <link rel="canonical" href={`${companyInfo.url}/hotels/risk-briefs`} />
      </Head>
      <RiskBriefLibraryPage />
    </>
  );
}
