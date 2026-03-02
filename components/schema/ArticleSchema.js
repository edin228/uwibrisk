import JsonLd from "./JsonLd";
import companyInfo from "../../utils/companyInfo";

export default function ArticleSchema({ data }) {
  if (!data) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.excerpt,
    image: data.featuredImage?.url,
    datePublished: data.publishedAt,
    url: `${companyInfo.url}/blog/${data.slug}`,
    publisher: {
      "@type": "Organization",
      "@id": `${companyInfo.url}/#organization`,
      name: companyInfo.name,
      logo: {
        "@type": "ImageObject",
        url: companyInfo.logo,
      },
    },
    author: data.teamMember
      ? {
          "@type": "Person",
          name: data.teamMember.name,
          ...(data.teamMember.slug && {
            url: `${companyInfo.url}/${data.teamMember.slug}`,
          }),
          ...(data.teamMember.photo?.url && {
            image: data.teamMember.photo.url,
          }),
          ...(data.teamMember.position && {
            jobTitle: data.teamMember.position,
          }),
        }
      : {
          "@type": "Organization",
          name: companyInfo.name,
        },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${companyInfo.url}/blog/${data.slug}`,
    },
  };

  return <JsonLd data={schema} />;
}
