"use client";

import type { DeviceTier } from "@/hooks/use-device-tier";
import { MacMenuBar } from "@/components/mac/menu-bar";
import { useState, useEffect } from "react";
import { Wifi, Battery } from "lucide-react";

function IPadStatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = currentTime.toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-9 ios-ipad-bar flex items-center justify-between px-4 text-[13px] font-medium text-white/95 tracking-tight">
      <span className="tabular-nums">{time}</span>
      <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold text-white/90">
        Portfolio
      </span>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-white/70 hidden sm:inline">{date}</span>
        <Wifi className="w-4 h-4" />
        <span className="text-[11px]">100%</span>
        <Battery className="w-5 h-5 rotate-90" />
      </div>
    </div>
  );
}

function IPhoneStatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 ios-safe-top pt-2 pb-1 px-5 flex items-center justify-between text-[15px] font-semibold text-white tracking-tight">
      <span className="tabular-nums">{time}</span>
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[28%] max-w-[120px] h-7 rounded-full bg-black/50 border border-white/10 backdrop-blur-md" />
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5 items-end h-3">
          <span className="w-0.5 h-2 bg-white rounded-sm" />
          <span className="w-0.5 h-2.5 bg-white rounded-sm" />
          <span className="w-0.5 h-3 bg-white rounded-sm" />
          <span className="w-0.5 h-3.5 bg-white rounded-sm" />
        </div>
        <Battery className="w-6 h-3.5 text-white" strokeWidth={2.5} />
      </div>
    </div>
  );
}

export function SystemTopBar({ tier }: { tier: DeviceTier }) {
  if (tier === "mobile") return <IPhoneStatusBar />;
  if (tier === "tablet") return <IPadStatusBar />;
  return <MacMenuBar />;
}
