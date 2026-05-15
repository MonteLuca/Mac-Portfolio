"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import type { DeviceTier } from "@/hooks/use-device-tier";
import { getMenuBarHeight } from "@/lib/window-layout";
import { cn } from "@/lib/utils";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  isActive: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  zIndex: number;
  deviceTier: DeviceTier;
}

export function MacWindow({
  title,
  children,
  onClose,
  onFocus,
  isActive,
  defaultPosition = { x: 100, y: 60 },
  defaultSize = { width: 700, height: 500 },
  zIndex,
  deviceTier,
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const previousState = useRef({ position, size });

  const isPhone = deviceTier === "mobile";
  const isTablet = deviceTier === "tablet";
  const menuH = getMenuBarHeight(deviceTier);

  useEffect(() => {
    setPosition(defaultPosition);
    setSize(defaultSize);
    setIsMaximized(false);
  }, [
    defaultPosition.x,
    defaultPosition.y,
    defaultSize.width,
    defaultSize.height,
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized && !isPhone) {
        const topMin = menuH;
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: Math.max(topMin, e.clientY - dragOffset.current.y),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMaximized, isPhone, menuH]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isPhone) return;
    onFocus();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMaximize = () => {
    if (isPhone) return;
    if (isMaximized) {
      setPosition(previousState.current.position);
      setSize(previousState.current.size);
    } else {
      previousState.current = { position, size };
      const dockReserve = isTablet ? 88 : 80;
      setPosition({ x: 0, y: menuH });
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - menuH - dockReserve,
      });
    }
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 150);
  };

  const titleBarHeight = isPhone ? 44 : isTablet ? 44 : 48;
  const contentHeightCalc = `calc(100% - ${titleBarHeight}px)`;

  return (
    <div
      className={cn(
        "absolute overflow-hidden",
        isPhone
          ? "ios-phone-sheet rounded-t-[1.25rem] shadow-2xl"
          : isTablet
            ? "ios-tablet-window rounded-2xl"
            : cn(
                "rounded-xl border border-white/20 bg-[oklch(0.15_0.012_250/0.97)]",
                "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              ),
        isClosing ? "window-close" : "window-open",
        isPhone || isTablet
          ? isActive
            ? "ring-1 ring-white/25"
            : "ring-0"
          : isActive
            ? "ring-2 ring-white/40"
            : "ring-1 ring-white/15"
      )}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      {isPhone ? (
        <div
          className={cn(
            "ios-phone-title flex h-11 items-center justify-between px-3 select-none",
            isActive ? "opacity-100" : "opacity-90"
          )}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 min-w-9 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white active:bg-white/25"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
          <span className="pointer-events-none flex-1 truncate text-center text-[15px] font-semibold text-white">
            {title}
          </span>
          <span className="w-9" />
        </div>
      ) : (
        <div
          className={cn(
            "flex cursor-move select-none items-center px-4",
            isTablet
              ? cn("ios-ipad-titlebar macos-titlebar h-11", isActive ? "" : "opacity-90")
              : cn(
                  "macos-titlebar h-12 border-b border-white/10 bg-zinc-900/95",
                  isActive ? "" : "opacity-95"
                )
          )}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57] transition-colors hover:bg-[#ff5f57]/80"
            >
              <X className="h-2 w-2 text-[#990000] opacity-0 group-hover:opacity-100" />
            </button>
            <button
              type="button"
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e] transition-colors hover:bg-[#febc2e]/80"
            >
              <Minus className="h-2 w-2 text-[#995700] opacity-0 group-hover:opacity-100" />
            </button>
            <button
              type="button"
              onClick={handleMaximize}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840] transition-colors hover:bg-[#28c840]/80"
            >
              <Maximize2 className="h-1.5 w-1.5 text-[#006500] opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          <div className="flex-1 text-center text-sm font-medium text-foreground/80">
            {title}
          </div>
          <div className="w-14" />
        </div>
      )}

      <div
        className={cn(
          "isolate overflow-auto bg-[oklch(0.11_0.01_250/1)]",
          (isPhone || isTablet) && "touch-pan-y"
        )}
        style={{ height: contentHeightCalc }}
      >
        {children}
      </div>
    </div>
  );
}
