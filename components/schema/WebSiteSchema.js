import JsonLd from "./JsonLd";
import companyInfo from "../../utils/companyInfo";

export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${companyInfo.url}/#website`,
    name: companyInfo.name,
    url: companyInfo.url,
    publisher: { "@id": `${companyInfo.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${companyInfo.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={schema} />;
}
