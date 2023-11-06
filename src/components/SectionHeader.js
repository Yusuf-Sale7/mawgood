import React from "react";

function SectionHeader({ tag, title, className }) {
  return tag === "h1" ? (
    <h1
      className={
        className ??
        "section-title position-relative text-uppercase mx-xl-5 mb-4"
      }
    >
      <span className="bg-secondary pr-3">{title}</span>
    </h1>
  ) : tag === "h3" ? (
    <h3
      className={
        className ??
        "section-title position-relative text-uppercase mx-xl-5 mb-4"
      }
    >
      <span className="bg-secondary pr-3">{title}</span>
    </h3>
  ) : tag === "h4" ? (
    <h4
      className={
        className ??
        "section-title position-relative text-uppercase mx-xl-5 mb-4"
      }
    >
      <span className="bg-secondary pr-3">{title}</span>
    </h4>
  ) : tag === "h5" ? (
    <h5
      className={
        className ?? "section-title position-relative text-uppercase mb-4"
      }
    >
      <span className="bg-secondary pr-3">{title}</span>
    </h5>
  ) : tag === "h6" ? (
    <h6
      className={
        className ?? "section-title position-relative text-uppercase mb-4"
      }
    >
      <span className="bg-secondary pr-3">{title}</span>
    </h6>
  ) : (
    <h2
      className={
        className ??
        "section-title position-relative text-uppercase mx-xl-5 mb-4"
      }
    >
      <span className="bg-secondary pr-3">{title}</span>
    </h2>
  );
}

export default SectionHeader;
