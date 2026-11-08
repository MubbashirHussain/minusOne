"use client";

import { useCallback, useEffect, useState } from "react";
import Preloader from "@/components/animations/Preloader";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const finish = useCallback(() => setIsLoaded(true), []);

  useEffect(() => {
    if (isLoaded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [isLoaded]);

  return isLoaded ? children : <Preloader onFinish={finish} />;
}
