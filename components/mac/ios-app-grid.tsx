"use client";

import { iosPortfolioGridApps } from "@/lib/portfolio-apps";
import { cn } from "@/lib/utils";

interface IOSAppGridProps {
  onOpenApp: (appId: string) => void;
  openApps: string[];
}

/** Solo iPhone: tres íconos (Spotify, VS Code, CV); el resto abre desde el dock. */
export function IOSAppGrid({ onOpenApp, openApps }: IOSAppGridProps) {
  return (
    <div className="pointer-events-auto absolute left-0 right-0 top-[52px] bottom-[92px] z-10 flex min-h-0 flex-col items-center px-4 pt-2">
      <p className="mb-1 shrink-0 select-none text-center text-lg font-semibold text-white/90 drop-shadow-md">
        Portfolio
      </p>
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center pb-6">
        <div className="flex flex-wrap items-start justify-center gap-x-7 gap-y-5">
          {iosPortfolioGridApps.map((app) => {
            const Icon = app.icon;
            const isOpen = openApps.includes(app.id);

            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpenApp(app.id)}
                className="flex w-[76px] flex-col items-center gap-1 transition-transform active:scale-95"
              >
                <div
                  className={cn(
                    "flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[22%] bg-gradient-to-br shadow-lg ring-1",
                    app.id === "resume" ? "ring-black/15" : "ring-white/20",
                    app.color
                  )}
                >
                  {app.id === "spotify" ? (
                    <div className="flex h-[30px] w-[30px] items-center justify-center text-white opacity-95">
                      <Icon className="h-full w-full" />
                    </div>
                  ) : app.id === "vscode" ? (
                    <Icon className="h-[30px] w-[30px] shrink-0 text-white" />
                  ) : (
                    <Icon className="h-7 w-7 shrink-0 text-red-500" strokeWidth={1.75} />
                  )}
                </div>
                <span className="flex min-h-[2.25rem] w-full max-w-[74px] items-start justify-center text-center text-[11px] font-medium leading-snug text-white line-clamp-2 drop-shadow-md">
                  {app.name}
                </span>
                <div className="flex h-2 w-full shrink-0 items-center justify-center">
                  {isOpen ? (
                    <span className="block h-1 w-1 rounded-full bg-white/90" />
                  ) : (
                    <span className="block h-1 w-1 shrink-0 opacity-0" aria-hidden />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
