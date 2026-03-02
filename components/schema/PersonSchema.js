import JsonLd from "./JsonLd";
import companyInfo from "../../utils/companyInfo";

export default function PersonSchema({ data }) {
  if (!data) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    ...(data.position && { jobTitle: data.position }),
    url: `${companyInfo.url}/${data.slug}`,
    ...(data.email && { email: data.email }),
    ...(data.phone && { telephone: data.phone }),
    ...(data.photo?.url && { image: data.photo.url }),
    worksFor: {
      "@type": "Organization",
      "@id": `${companyInfo.url}/#organization`,
      name: companyInfo.name,
    },
  };

  return <JsonLd data={schema} />;
}
