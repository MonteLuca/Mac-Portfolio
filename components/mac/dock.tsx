"use client";

import { portfolioApps } from "@/lib/portfolio-apps";
import type { DeviceTier } from "@/hooks/use-device-tier";
import { cn } from "@/lib/utils";

interface DockProps {
  onOpenApp: (appId: string) => void;
  openApps: string[];
  tier: DeviceTier;
}

/** Zoom solo en el tile (no en el botón entero): evita que el hover “rompa” el dock y recorte tooltips. */
const dockTileHover =
  "transition-[transform] duration-200 ease-out will-change-transform group-hover:scale-[1.12] group-hover:-translate-y-1.5 motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-105";

const dockTileHoverTouch =
  "transition-[transform] duration-200 ease-out will-change-transform group-hover:scale-[1.07] group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100";

export function MacDock({ onOpenApp, openApps, tier }: DockProps) {
  if (tier === "mobile") {
    return (
      <div className="fixed bottom-2 left-0 right-0 z-40 flex justify-center px-3 pb-safe">
        <div className="ios-dock-pill flex max-w-full items-end gap-1.5 overflow-x-auto px-2.5 pt-7 pb-2">
          {portfolioApps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onOpenApp(app.id)}
              className="group relative flex shrink-0 flex-col items-center touch-manipulation"
            >
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-[22%] bg-gradient-to-br shadow-md ring-1 ring-white/15",
                  app.color,
                  dockTileHoverTouch
                )}
              >
                <app.icon className="block h-6 w-6 shrink-0 text-white" strokeWidth={1.75} />
              </div>
              {openApps.includes(app.id) && (
                <div className="absolute -bottom-0.5 h-0.5 w-0.5 rounded-full bg-white/90" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (tier === "tablet") {
    return (
      <div className="fixed bottom-3 left-1/2 z-40 w-[min(92vw,720px)] -translate-x-1/2">
        <div className="ios-dock-pill flex items-end justify-center gap-3 overflow-x-auto px-4 pt-9 pb-2.5">
          {portfolioApps.map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onOpenApp(app.id)}
              className="group relative flex shrink-0 flex-col items-center touch-manipulation"
            >
              <div className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-black/70 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity group-hover:opacity-100">
                {app.name}
              </div>
              <div
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-[22%] bg-gradient-to-br shadow-lg ring-1 ring-white/20",
                  app.color,
                  dockTileHoverTouch
                )}
              >
                <app.icon className="block h-8 w-8 shrink-0 text-white" strokeWidth={1.75} />
              </div>
              <div className="mt-1 flex h-2 w-full items-center justify-center">
                {openApps.includes(app.id) ? (
                  <span className="block h-1 w-1 rounded-full bg-white/80" />
                ) : (
                  <span className="block h-1 w-1 shrink-0 opacity-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-1/2 z-40 w-full max-w-[100vw] -translate-x-1/2 pb-safe">
      <div className="pointer-events-auto flex justify-center px-3">
        <div className="max-w-[min(100vw-1.5rem,960px)] overflow-x-auto overflow-y-visible py-2">
          <div className="macos-dock mx-auto flex min-w-min items-end gap-2 rounded-2xl bg-[var(--macos-dock)] px-3 pt-10 pb-3">
            {portfolioApps.map((app) => (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpenApp(app.id)}
                className="group relative flex shrink-0 flex-col items-center px-0.5 pb-0.5"
              >
                <div className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-background/90 px-3 py-1 text-xs font-medium whitespace-nowrap text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  {app.name}
                </div>
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                    app.color,
                    dockTileHover
                  )}
                >
                  <app.icon className="block h-7 w-7 shrink-0 text-white" strokeWidth={1.75} />
                </div>
                <div className="mt-1 flex h-2 w-full items-center justify-center">
                  {openApps.includes(app.id) ? (
                    <span className="block h-1 w-1 shrink-0 rounded-full bg-white/70" />
                  ) : (
                    <span className="block h-1 w-1 shrink-0 opacity-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
