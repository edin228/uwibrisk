import Head from "next/head";

export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data).replace(/</g, "\\u003c"),
        }}
        key={`jsonld-${data["@type"] || "schema"}-${data["@id"] || ""}`}
      />
    </Head>
  );
}
