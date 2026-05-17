import type { DeviceTier } from "@/hooks/use-device-tier";

/** Eat / sleep / code / repeat — Mac (≥1024px) e iPad (768–1023px). */
export const WALLPAPER_DESKTOP_URL = "/wallpaper-desktop.png";

/** Icono </> — iPhone (≤767px). */
export const WALLPAPER_MOBILE_URL = "/wallpaper-mobile.png";

/** @deprecated Usar `wallpaperUrlForTier` o `WALLPAPER_DESKTOP_URL`. */
export const WALLPAPER_URL = WALLPAPER_DESKTOP_URL;

export function wallpaperUrlForTier(tier: DeviceTier): string {
  return tier === "mobile" ? WALLPAPER_MOBILE_URL : WALLPAPER_DESKTOP_URL;
}
