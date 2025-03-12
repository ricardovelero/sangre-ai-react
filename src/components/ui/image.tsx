import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading='lazy' // ✅ Adds lazy loading
      style={{
        objectFit: "cover",
        maxWidth: "100%",
        height: "auto",
      }}
      {...props}
    />
  );
};

export default Image;
