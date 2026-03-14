"use client";

import { useEffect, useState } from "react";
import FloatingProducts from "@/components/FloatingProducts";

const FloatingProductsDeferred = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return <FloatingProducts />;
};

export default FloatingProductsDeferred;
