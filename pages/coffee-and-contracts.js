import Head from "next/head";

import BreadcrumbSchema from "../components/schema/BreadcrumbSchema";
import OrganizationSchema from "../components/schema/OrganizationSchema";
import CoffeeLanding from "../components/coffee/CoffeeLanding";
import { getPage } from "../services";
import companyInfo from "../utils/companyInfo";

export default function CoffeeAndContracts({ formId, initialEmail }) {
  return (
    <>
      <Head>
        <title>Coffee &amp; Contracts | Specialty Coffee Insurance | UWIB Risk</title>
        <meta
          name="description"
          content="Insurance, labor and risk guidance for specialty coffee importers, roasters, wholesalers and cafés from Coffee & Contracts, a division of UWIB."
        />
        <link rel="canonical" href={`${companyInfo.url}/coffee-and-contracts`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrganizationSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: companyInfo.url },
          { name: "Coffee & Contracts", url: `${companyInfo.url}/coffee-and-contracts` },
        ]}
      />
      <CoffeeLanding formId={formId} initialEmail={initialEmail} />
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
