import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.getElementById("root").scrollIntoView({ behavior: "smooth" });
  }, [pathname]);

  return null;
}

export default ScrollTop;
