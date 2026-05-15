"use client";

import * as React from "react";

/** Viewport < 768px: layout tipo iPhone */
export const MOBILE_MAX = 767;
/** 768px–1023px: layout tipo iPad */
export const TABLET_MAX = 1023;
/** >= 1024px: layout tipo Mac */

export type DeviceTier = "desktop" | "tablet" | "mobile";

function resolveTier(width: number): DeviceTier {
  if (width <= MOBILE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = React.useState<DeviceTier>("desktop");

  React.useEffect(() => {
    const update = () => setTier(resolveTier(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return tier;
}
