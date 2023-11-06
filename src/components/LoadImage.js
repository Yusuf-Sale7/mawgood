import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderImg from "../assets/imgs/placeholder-img.png";

function LoadImage({ style, className, src, alt, width, height }) {
  return (
    <LazyLoadImage
      style={style}
      className={className}
      src={src}
      placeholderSrc={placeholderImg}
      alt={alt ?? "Image"}
      width={width}
      height={height}
      effect="blur"
    />
  );
}

export default LoadImage;
