import { useEffect, useState } from "react";

export function useMobileViewport(mobileBreakpoint: string): boolean {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const handleResize = (): void => {
      setIsMobileViewport(getIsMobileViewport(mobileBreakpoint));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  return isMobileViewport;
}

function getIsMobileViewport(mobileBreakpoint: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const breakpointValue = Number.parseInt(mobileBreakpoint, 10);

  if (Number.isNaN(breakpointValue)) {
    return false;
  }

  return window.innerWidth <= breakpointValue;
}
