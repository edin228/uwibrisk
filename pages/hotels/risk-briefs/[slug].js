import Head from "next/head";

import { BRIEFS } from "../../../components/hotels/content";
import { RiskBriefArticle } from "../../../components/hotels/HotelsSupporting";
import companyInfo from "../../../utils/companyInfo";

export default function HotelRiskBrief({ brief }) {
  return (
    <>
      <Head>
        <title>{`${brief.title} | UWIB Risk`}</title>
        <meta name="description" content={brief.description} />
        <link rel="canonical" href={`${companyInfo.url}${brief.path}`} />
      </Head>
      <RiskBriefArticle brief={brief} />
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: Object.keys(BRIEFS).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const brief = BRIEFS[params.slug];
  if (!brief) return { notFound: true };
  return { props: { brief } };
}
