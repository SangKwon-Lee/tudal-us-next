//const CDN_URL = "https://innofin.cdn.ntruss.com/";

import { CSSProperties } from "@emotion/serialize";
import Image from "next/image";

interface Props {
  style?: CSSProperties | undefined;
  className?: string;
  src: string;
  width: number;
  height: number;
  onClick?: any;
  id?: string;
}
export default function Icon({
  src,
  style,
  width,
  height,
  className,
  id,
  onClick,
  ...other
}: Props) {
  const imageLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  return (
    <Image
      id={id}
      unoptimized={true}
      priority={true}
      loader={imageLoader}
      // loading="lazy"
      src={`${src}`}
      //@ts-ignore
      style={{ ...style }}
      width={width}
      onClick={onClick}
      className={className}
      height={height}
      {...other}
      alt={src}
    />
  );
}
