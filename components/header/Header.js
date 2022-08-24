import React, { useEffect, useRef, useState } from "react";
import { getNavMenuItems } from "../../services";
import DesktopHeader from "./desktop/DesktopHeader";
import MobileHeader from "./mobile/MobileHeader";

function Header() {
  const [navMenuItems, setNavMenuItems] = useState([]);
  const runOnce = useRef(true);
  
  useEffect(() => {
    if (runOnce.current) {
      runOnce.current = false;
      getNav();
    }
    return () => {};
  }, []);

  const getNav = async () => {
    const req = await getNavMenuItems();
    setNavMenuItems(req);
  };

  return (
    <>
      <DesktopHeader navItems={navMenuItems} />
      <MobileHeader navItems={navMenuItems}  />
    </>
  );
}

export default Header;
