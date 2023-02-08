import React from "react";
import ContentBase from "../content/ContentBase";
import Footer from "../Footer";
import Header from "../header/Header";

function Base({ children, template = null, data = null, title=null }) {
  return (
    <div className="flex w-full overflow-hidden h-fill text-color">
      <div className="flex flex-col w-full h-full overflow-hidden rounded-b-lg">
        <Header />
        <div className="flex flex-col overflow-y-auto lg:pt-20">
          <ContentBase title={title} data={data} template={template}>{children}</ContentBase>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Base;
