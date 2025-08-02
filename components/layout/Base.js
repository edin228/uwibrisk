import React from "react";
import ContentBase from "../content/ContentBase";
import Footer from "../Footer";
import Header from "../header/Header";

function Base({ children, template = null, data = null, title=null }) {
  return (
    <div className="relative flex w-full h-full overflow-hidden text-color">
      
      <div className="absolute top-[20%] right-[0%] z-[-10] w-[600px] h-[100px] bg-yellow-500 skew-y-[-12deg] opacity-30 bg-accent-blur"></div>
      <div className="absolute top-[8%] right-[0%] z-[-10] w-[300px] h-[60px] bg-yellow-500 skew-y-[-12deg] opacity-30 bg-accent-blur"></div>
      <div className="absolute top-[16%] right-[0%] z-[-10] w-[400px] h-[20px] bg-black skew-y-[-12deg] opacity-30 bg-accent-blur"></div>
      <div className="relative flex flex-col w-full h-full overflow-hidden">
        <Header />
        <div className="relative flex flex-col h-full overflow-x-hidden lg:pt-20 pb-10">
          <ContentBase title={title} data={data} template={template}>{children}</ContentBase>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Base;
