import React from "react";

function PreLoader({ fullScreen, transparent }) {
  return (
    <div
      className={`loading-overlay${fullScreen ? " fullScreen" : ""}${
        transparent ? " transparent" : ""
      }`}
    >
      <div className="loading-spinner">
        <div className="l-spinner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default PreLoader;
