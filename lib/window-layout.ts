import type { DeviceTier } from "@/hooks/use-device-tier";

const MAC_MENU = 28;
const IPAD_BAR = 36;
const PHONE_STATUS = 52;
const PHONE_DOCK = 88;
const IPAD_DOCK = 88;
const MAC_DOCK_RESERVE = 80;

export function getLaunchLayout(
  tier: DeviceTier,
  configSize: { width: number; height: number }
): { position: { x: number; y: number }; size: { width: number; height: number } } {
  if (typeof window === "undefined") {
    return { position: { x: 100, y: 80 }, size: configSize };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (tier === "mobile") {
    return {
      position: { x: 0, y: PHONE_STATUS },
      size: {
        width: vw,
        height: Math.max(200, vh - PHONE_STATUS - PHONE_DOCK),
      },
    };
  }

  if (tier === "tablet") {
    const w = Math.min(configSize.width, vw - 32);
    const h = Math.min(configSize.height, vh - IPAD_BAR - IPAD_DOCK - 32);
    return {
      position: {
        x: Math.max(8, (vw - w) / 2),
        y: IPAD_BAR + Math.max(8, (vh - h - IPAD_BAR - IPAD_DOCK) / 2),
      },
      size: { width: w, height: h },
    };
  }

  const marginX = 24;
  const marginY = MAC_MENU + 24;
  const maxX = Math.max(marginX, vw - configSize.width - marginX);
  const maxY = Math.max(marginY, vh - configSize.height - MAC_DOCK_RESERVE);
  return {
    position: {
      x: marginX + Math.random() * Math.max(0, maxX - marginX),
      y: marginY + Math.random() * Math.max(0, maxY - marginY),
    },
    size: configSize,
  };
}

export function getMenuBarHeight(tier: DeviceTier): number {
  if (tier === "mobile") return PHONE_STATUS;
  if (tier === "tablet") return IPAD_BAR;
  return MAC_MENU;
}
