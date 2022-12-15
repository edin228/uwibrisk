import React from "react";

function ContentBase({ children, template = null }) {
  return template == "Blog" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "Team" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "home" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "Member" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "WebForm" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "SingleColumn" ? (
    <div className="flex flex-col w-full">{children}</div>
  ) : template == "DualColumn" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "TripleColumn" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "DualRow" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "TripleRow" ? (
    <div className="flex w-full">{children}</div>
  ) : (
    <div className="flex w-full">{children}</div>
  );
}

export default ContentBase;
