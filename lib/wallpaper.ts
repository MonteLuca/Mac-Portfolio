import type { DeviceTier } from "@/hooks/use-device-tier";

/** Gato en el pasto (horizontal) — solo escritorio Mac (≥1024px). */
export const WALLPAPER_DESKTOP_URL = "/wallpaper-cat.png";

/** Foto vertical del gato — iPad y iPhone (<1024px). */
export const WALLPAPER_TOUCH_URL = "/wallpaper-touch.png";

/** @deprecated Usar `wallpaperUrlForTier` o `WALLPAPER_DESKTOP_URL`. */
export const WALLPAPER_URL = WALLPAPER_DESKTOP_URL;

export function wallpaperUrlForTier(tier: DeviceTier): string {
  return tier === "desktop" ? WALLPAPER_DESKTOP_URL : WALLPAPER_TOUCH_URL;
}
