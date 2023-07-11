import React from "react";
import ContentBase from "../content/ContentBase";
import Footer from "../Footer";
import Header from "../header/Header";

function Base({ children, template = null, data = null, title=null }) {
  return (
    <div className="relative flex w-full h-full overflow-hidden text-color">
      <div className="relative flex flex-col w-full h-full overflow-hidden rounded-b-lg">
        <Header />
        <div className="relative flex flex-col h-full overflow-x-hidden overflow-y-auto lg:pt-20">
          <ContentBase title={title} data={data} template={template}>{children}</ContentBase>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Base;
