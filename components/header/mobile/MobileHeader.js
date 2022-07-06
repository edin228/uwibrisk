import React from "react";

function MobileHeader() {
  return (
    <div className="flex md:hidden w-full h-20 bg-white">
      <div className="flex w-full justify-between items-center">
        <div>LOGO</div>
        <div>MENU</div>
      </div>
    </div>
  );
}

export default MobileHeader;
