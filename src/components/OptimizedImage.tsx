"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type OptimizedImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
};

export default function OptimizedImage({
  src,
  alt,
  onError,
  unoptimized = true,
  ...props
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return null;
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      unoptimized={unoptimized}
      onError={(event) => {
        setHasError(true);
        onError?.(event);
      }}
    />
  );
}
