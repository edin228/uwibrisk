import JsonLd from "./JsonLd";
import companyInfo from "../../utils/companyInfo";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${companyInfo.url}/#organization`,
    name: companyInfo.name,
    legalName: companyInfo.legalName,
    url: companyInfo.url,
    logo: companyInfo.logo,
    description: companyInfo.description,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address.streetAddress,
      addressLocality: companyInfo.address.city,
      addressRegion: companyInfo.address.state,
      postalCode: companyInfo.address.zipCode,
      addressCountry: companyInfo.address.country,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    ...(companyInfo.sameAs.length > 0 && { sameAs: companyInfo.sameAs }),
  };

  return <JsonLd data={schema} />;
}
