import Head from "next/head";

import BreadcrumbSchema from "../../components/schema/BreadcrumbSchema";
import OrganizationSchema from "../../components/schema/OrganizationSchema";
import HotelsLanding from "../../components/hotels/HotelsLanding";
import { getPage } from "../../services";
import companyInfo from "../../utils/companyInfo";

export default function Hotels({ formId, initialEmail }) {
  return (
    <>
      <Head>
        <title>California Boutique Hotel Insurance | UWIB Risk</title>
        <meta
          name="description"
          content="Insurance and practical risk guidance for independent and boutique hotels throughout California."
        />
        <link rel="canonical" href={`${companyInfo.url}/hotels`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrganizationSchema />
      <BreadcrumbSchema items={[{ name: "Home", url: companyInfo.url }, { name: "Hotels", url: `${companyInfo.url}/hotels` }]} />
      <HotelsLanding formId={formId} initialEmail={initialEmail} />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const initialEmail = typeof query.email === "string" ? query.email : "";

  try {
    const contactPage = await getPage("contact");
    return { props: { formId: contactPage?.forms?.[0]?.id || null, initialEmail } };
  } catch (error) {
    return { props: { formId: null, initialEmail } };
  }
}
