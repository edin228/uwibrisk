import React from "react";

function ContentBase({ children, template = null }) {
  return template == "blog" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "team" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "home" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "member" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "form" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "articleform" ? (
    <div className="flex w-full">{children}</div>
  ) : template == "grid" ? (
    <div className="flex w-full">{children}</div>
  ) : (
    <div className="flex w-full">{children}</div>
  );
}

export default ContentBase;
