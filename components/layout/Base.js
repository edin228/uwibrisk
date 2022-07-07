import React from "react";
import ContentBase from "../content/ContentBase";
import Footer from "../Footer";
import Header from "../header/Header";

function Base({ children, template = null }) {
  return (
    <div className="flex w-full h-fill overflow-hidden">
      <div className="bg-white rounded-b-lg flex flex-col h-full w-full lg:mx-auto lg:w-3/4 overflow-hidden">
        <Header />
        <div className="flex flex-col overflow-y-auto lg:pt-20">
          <ContentBase template={template}>{children}</ContentBase>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Base;
