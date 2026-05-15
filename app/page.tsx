"use client";

import { useState, useCallback } from "react";
import { BootScreen } from "@/components/mac/boot-screen";
import { LoginScreen } from "@/components/mac/login-screen";
import { SystemTopBar } from "@/components/mac/system-top-bar";
import { MacDock } from "@/components/mac/dock";
import { MacWindow } from "@/components/mac/window";
import { DesktopIcons } from "@/components/mac/desktop-icons";
import { IOSAppGrid } from "@/components/mac/ios-app-grid";
import { AboutApp } from "@/components/apps/about-app";
import { ProjectsApp } from "@/components/apps/projects-app";
import { SkillsApp } from "@/components/apps/skills-app";
import { ExperienceApp } from "@/components/apps/experience-app";
import { TerminalApp } from "@/components/apps/terminal-app";
import { ContactApp } from "@/components/apps/contact-app";
import { GithubApp } from "@/components/apps/github-app";
import { VsCodeApp } from "@/components/apps/vscode-app";
import { SpotifyApp } from "@/components/apps/spotify-app";
import { ResumePdfApp } from "@/components/apps/resume-pdf-app";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { getLaunchLayout } from "@/lib/window-layout";
import { wallpaperUrlForTier } from "@/lib/wallpaper";
import { cn } from "@/lib/utils";

type BootStage = "off" | "login" | "desktop";

interface WindowState {
  id: string;
  title: string;
  component: React.ComponentType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

const appConfig: Record<
  string,
  { title: string; component: React.ComponentType; size: { width: number; height: number } }
> = {
  about: { title: "Sobre Mí", component: AboutApp, size: { width: 650, height: 550 } },
  projects: { title: "Proyectos", component: ProjectsApp, size: { width: 700, height: 550 } },
  skills: { title: "Skills", component: SkillsApp, size: { width: 750, height: 550 } },
  experience: { title: "Experiencia", component: ExperienceApp, size: { width: 700, height: 600 } },
  terminal: { title: "Terminal — zsh", component: TerminalApp, size: { width: 650, height: 400 } },
  spotify: {
    title: "Spotify",
    component: SpotifyApp,
    size: { width: 440, height: 640 },
  },
  vscode: {
    title: "Visual Studio Code",
    component: VsCodeApp,
    size: { width: 920, height: 640 },
  },
  contact: { title: "Contacto", component: ContactApp, size: { width: 700, height: 500 } },
  github: { title: "GitHub Profile", component: GithubApp, size: { width: 700, height: 600 } },
  resume: {
    title: "CV — Luca Monteleone (ES)",
    component: ResumePdfApp,
    size: { width: 720, height: 820 },
  },
};

function topZIndex(windows: WindowState[]): number {
  if (windows.length === 0) return 100;
  return Math.max(...windows.map((w) => w.zIndex));
}

export default function MacPortfolio() {
  const deviceTier = useDeviceTier();
  const [bootStage, setBootStage] = useState<BootStage>("off");
  const [showDesktop, setShowDesktop] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);

  const handleBoot = useCallback(() => {
    setBootStage("login");
  }, []);

  const handleLogin = useCallback(() => {
    setBootStage("desktop");
    setTimeout(() => setShowDesktop(true), 100);
  }, []);

  const openApp = useCallback(
    (appId: string) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === appId);
        const baseZ = topZIndex(prev);
        const nextZ = baseZ + 1;

        if (existing) {
          return prev.map((w) =>
            w.id === appId ? { ...w, zIndex: nextZ } : w
          );
        }

        const config = appConfig[appId];
        if (!config) return prev;

        const layout = getLaunchLayout(deviceTier, config.size);
        return [
          ...prev,
          {
            id: appId,
            title: config.title,
            component: config.component,
            position: layout.position,
            size: layout.size,
            zIndex: nextZ,
          },
        ];
      });
    },
    [deviceTier]
  );

  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const focusWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const baseZ = topZIndex(prev);
      const nextZ = baseZ + 1;
      return prev.map((w) =>
        w.id === windowId ? { ...w, zIndex: nextZ } : w
      );
    });
  }, []);

  const openApps = windows.map((w) => w.id);
  const isDesktopShell = deviceTier === "desktop";
  const isTabletShell = deviceTier === "tablet";
  const wallpaperUrl = wallpaperUrlForTier(deviceTier);

  if (bootStage === "off") {
    return <BootScreen onBoot={handleBoot} />;
  }

  if (bootStage === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-no-repeat opacity-[0.72]",
          deviceTier === "mobile" ? "bg-top" : "bg-center"
        )}
        style={{ backgroundImage: `url('${wallpaperUrl}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />

      <div
        className={cn(
          "relative h-full w-full transition-opacity duration-1000",
          showDesktop ? "opacity-100" : "opacity-0"
        )}
      >
        <SystemTopBar tier={deviceTier} />

        {isDesktopShell && <DesktopIcons onOpenApp={openApp} variant="mac" />}
        {isTabletShell && <DesktopIcons onOpenApp={openApp} variant="ipad" />}

        {deviceTier === "mobile" && (
          <IOSAppGrid onOpenApp={openApp} openApps={openApps} />
        )}

        {windows.map((window) => (
          <MacWindow
            key={window.id}
            id={window.id}
            title={window.title}
            deviceTier={deviceTier}
            onClose={() => closeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            isActive={
              window.zIndex === Math.max(...windows.map((w) => w.zIndex), 0)
            }
            defaultPosition={window.position}
            defaultSize={window.size}
            zIndex={window.zIndex}
          >
            <window.component />
          </MacWindow>
        ))}

        <MacDock onOpenApp={openApp} openApps={openApps} tier={deviceTier} />

        {windows.length === 0 && isDesktopShell && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 select-none text-center">
            <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-2xl md:text-5xl">
              Bienvenido a mi Portfolio
            </h1>
            <p className="text-lg text-white/85 drop-shadow-lg md:text-xl">
              Hacé clic en el Dock o en los íconos del escritorio (CV, VS Code, Spotify…) para explorar
            </p>
          </div>
        )}

        {windows.length === 0 && isTabletShell && (
          <div className="pointer-events-none absolute bottom-[100px] left-1/2 z-10 w-[90%] max-w-lg -translate-x-1/2 select-none text-center md:bottom-[110px]">
            <p className="text-base text-white/90 drop-shadow-lg">
              Tocá un ícono del dock o del escritorio (derecha) para abrir apps
            </p>
          </div>
        )}

        {windows.length === 0 && deviceTier === "mobile" && (
          <div className="pointer-events-none absolute bottom-[100px] left-1/2 z-10 w-[88%] -translate-x-1/2 select-none text-center">
            <p className="text-sm text-white/90 drop-shadow-md">
              Tocá un ícono para abrir. Deslizá hacia abajo desde arriba para el gesto de “cerrar”.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
