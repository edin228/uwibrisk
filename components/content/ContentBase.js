import React from "react";
import GridWithSearch from "./layouts/GridWithSearch";

function ContentBase({ children, template = null, data = null, title = null }) {
  const Content = () => {
    return (
      <div className="flex flex-col w-full h-full">
        {data.content.map((c, i) => (
          <div
            key={Date()}
            strategy="afterInteractive"
            className=""
            dangerouslySetInnerHTML={{ __html: c.html }}
          ></div>
        ))}
        {data.rawHtml.map((card, i) => (
          <div
            key={Date()}
            strategy="afterInteractive"
            className="flex w-full h-full"
            dangerouslySetInnerHTML={{ __html: data.rawHtml[i] }}
          ></div>
        ))}
      </div>
    );
  };

  return template == "Blog" ? (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  ) : template == "Team" ? (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  ) : template == "home" ? (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  ) : template == "Member" ? (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  ) : template == "WebForm" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "SingleColumn" ? (
    <div className="flex flex-col w-full min-h-[89vh]">{children}</div>
  ) : template == "DualColumn" ? (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  ) : template == "TripleColumn" ? (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  ) : template == "DualRow" ? (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  ) : template == "TripleRow" ? (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  ) : template == "GridWithSearch" ? (
    <GridWithSearch data={data} title={title}>{children}</GridWithSearch>
  ) : (
    <div className="flex w-full min-h-[89vh]">{children}</div>
  );
}

export default ContentBase;
