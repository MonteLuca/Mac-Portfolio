"use client";

import type { KeyboardEvent } from "react";
import { FileText, HardDrive, Folder } from "lucide-react";
import { VsCodeDockIcon } from "@/components/icons/vscode-dock-icon";
import { SpotifyLogoIcon } from "@/components/icons/spotify-logo-icon";
import { cn } from "@/lib/utils";

export type DesktopIconsVariant = "mac" | "ipad";

interface DesktopIconsProps {
  onOpenApp: (appId: string) => void;
  variant?: DesktopIconsVariant;
}

type DesktopItemId =
  | "resume"
  | "vscode-desktop"
  | "spotify-desktop"
  | "projects-folder"
  | "macintosh";

const topRowItems: { id: DesktopItemId; name: string }[] = [
  { id: "resume", name: "CV (ES)" },
  { id: "vscode-desktop", name: "Visual Studio Code" },
  { id: "spotify-desktop", name: "Spotify" },
];

const columnItems: { id: DesktopItemId; name: string }[] = [
  { id: "projects-folder", name: "Proyectos" },
  { id: "macintosh", name: "Macintosh HD" },
];

function ariaLabel(itemId: DesktopItemId, isIpad: boolean): string {
  if (itemId === "resume") {
    return isIpad ? "CV en español, tocar para abrir" : "CV en español, doble clic para abrir";
  }
  if (itemId === "vscode-desktop") {
    return isIpad
      ? "Visual Studio Code, tocar para abrir"
      : "Visual Studio Code, doble clic para abrir";
  }
  if (itemId === "spotify-desktop") {
    return isIpad ? "Spotify, tocar para abrir" : "Spotify, doble clic para abrir";
  }
  if (itemId === "projects-folder") {
    return isIpad
      ? "Carpeta Proyectos, tocar para abrir"
      : "Carpeta Proyectos, doble clic para abrir";
  }
  return "Macintosh HD";
}

function runDesktopAction(
  itemId: DesktopItemId,
  onOpenApp: (appId: string) => void
) {
  if (itemId === "resume") onOpenApp("resume");
  else if (itemId === "projects-folder") onOpenApp("projects");
  else if (itemId === "vscode-desktop") onOpenApp("vscode");
  else if (itemId === "spotify-desktop") onOpenApp("spotify");
}

function DesktopIconArt({
  itemId,
  isIpad,
}: {
  itemId: DesktopItemId;
  isIpad: boolean;
}) {
  if (itemId === "macintosh") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-[20%] bg-gradient-to-b from-slate-200 to-slate-400 shadow-lg ring-1 ring-white/30",
          isIpad ? "h-14 w-14" : "h-12 w-12"
        )}
      >
        <div
          className={cn(
            "rounded-sm bg-slate-800",
            isIpad ? "mb-1 h-8 w-10" : "mb-1 h-7 w-9"
          )}
        />
        <div className="h-1 w-4 rounded-full bg-slate-500" />
      </div>
    );
  }

  if (itemId === "projects-folder") {
    return (
      <div className="relative">
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 rounded-t-md bg-blue-400",
            isIpad ? "-top-1.5 h-3.5 w-7" : "-top-1 h-3 w-6"
          )}
        />
        <Folder
          className={cn(
            "text-blue-400 fill-blue-500",
            isIpad ? "h-14 w-14" : "h-12 w-12"
          )}
        />
      </div>
    );
  }

  if (itemId === "vscode-desktop") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-[18%] bg-gradient-to-br from-[#0078d4] to-[#005a9e] shadow-lg ring-1 ring-white/25",
          isIpad ? "h-14 w-14" : "h-12 w-12"
        )}
      >
        <VsCodeDockIcon
          className={cn("text-white", isIpad ? "h-8 w-8" : "h-6 w-6")}
        />
      </div>
    );
  }

  if (itemId === "spotify-desktop") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-[18%] bg-gradient-to-br from-[#1ed760] to-[#117a37] shadow-lg ring-1 ring-white/25",
          isIpad ? "h-14 w-14" : "h-12 w-12"
        )}
      >
        {/* opacity-90: “modificador” visual para que el verde no compita tanto con el wallpaper */}
        <div className={cn("text-white opacity-90", isIpad ? "h-9 w-9" : "h-7 w-7")}>
          <SpotifyLogoIcon className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-[18%] bg-white shadow-lg ring-1 ring-black/10",
        isIpad ? "h-14 w-14" : "h-12 w-12"
      )}
    >
      <div
        className="absolute top-0 right-0 h-3 w-3 bg-gray-200"
        style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
      />
      <FileText
        className={cn("text-red-500", isIpad ? "h-8 w-8" : "h-6 w-6")}
      />
    </div>
  );
}

function DesktopIconTile({
  item,
  isIpad,
  onOpenApp,
}: {
  item: { id: DesktopItemId; name: string };
  isIpad: boolean;
  onOpenApp: (appId: string) => void;
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (item.id === "macintosh") return;
    runDesktopAction(item.id, onOpenApp);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel(item.id, isIpad)}
      onClick={() => {
        if (!isIpad) return;
        if (item.id === "macintosh") return;
        runDesktopAction(item.id, onOpenApp);
      }}
      onDoubleClick={() => {
        if (isIpad) return;
        if (item.id === "macintosh") return;
        runDesktopAction(item.id, onOpenApp);
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        "desktop-icon-hit group flex w-[5.75rem] cursor-default flex-col items-center gap-1.5 rounded-2xl p-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isIpad ? "active:bg-white/15" : "hover:bg-white/10"
      )}
    >
      <div
        className={cn(
          "pointer-events-none flex items-center justify-center",
          isIpad ? "h-16 w-16" : "h-14 w-14"
        )}
      >
        <DesktopIconArt itemId={item.id} isIpad={isIpad} />
      </div>
      <p
        className={cn(
          "desktop-icon-label pointer-events-none w-full cursor-default select-none text-center font-medium leading-snug text-white shadow-sm",
          isIpad
            ? "rounded-md bg-black/45 px-1.5 py-1 text-[11px] ring-1 ring-white/15 backdrop-blur-sm"
            : "rounded-md bg-black/55 px-1.5 py-1 text-[11px] ring-1 ring-white/15"
        )}
      >
        {item.name}
      </p>
    </div>
  );
}

export function DesktopIcons({ onOpenApp, variant = "mac" }: DesktopIconsProps) {
  const isIpad = variant === "ipad";

  return (
    <div
      className={cn(
        "absolute right-4 top-10 z-20 flex max-w-[min(100vw-2rem,20rem)] select-none flex-col items-end gap-4 sm:right-6 sm:max-w-none"
      )}
    >
      <div className="flex flex-row flex-wrap items-start justify-end gap-2 sm:gap-3">
        {topRowItems.map((item) => (
          <DesktopIconTile
            key={item.id}
            item={item}
            isIpad={isIpad}
            onOpenApp={onOpenApp}
          />
        ))}
      </div>

      {columnItems.map((item) => (
        <DesktopIconTile
          key={item.id}
          item={item}
          isIpad={isIpad}
          onOpenApp={onOpenApp}
        />
      ))}

      {isIpad && (
        <p className="mt-2 max-w-[160px] text-right text-[10px] leading-snug text-white/60">
          Tocá un ícono para abrir (CV, código, Spotify o Proyectos)
        </p>
      )}
    </div>
  );
}
