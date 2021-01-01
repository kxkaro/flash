import React, { Suspense } from "react";
import { Img, useImage } from "react-image";

// Create image component for suspensed image
const ImageComponent = ({
  alt,
  img,
  className,
}: {
  alt: string;
  img: any;
  className: any;
}) => {
  const { src } = useImage({
    srcList: img,
  });

  return <img src={src} alt={alt} className={className} />;
};

// Define main component
interface ImgType {
  img: any;
  className?: any;
  style?: any;
}

interface Props {
  alt: string;
  img: ImgType;
  fallback: ImgType;
}

export const SuspenseImg = ({ alt, img, fallback }: Props) => (
  <Suspense
    fallback={
      <Img alt={alt} src={fallback.img} className={fallback.className} />
    }
  >
    <ImageComponent alt={alt} img={img.img} className={img.className} />
  </Suspense>
);
