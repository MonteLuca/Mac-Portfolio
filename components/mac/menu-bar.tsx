"use client";

import { useState, useEffect } from "react";
import { Apple, Wifi, Battery, Search, Volume2 } from "lucide-react";

export function MacMenuBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-AR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-[var(--macos-menubar)] macos-menubar z-50 flex items-center justify-between px-4 text-sm text-foreground/90">
      <div className="flex items-center gap-5">
        <Apple className="w-4 h-4 fill-current" />
        <span className="font-semibold">Finder</span>
        <span className="text-foreground/70">Archivo</span>
        <span className="text-foreground/70">Editar</span>
        <span className="text-foreground/70">Ver</span>
        <span className="text-foreground/70">Ir</span>
        <span className="text-foreground/70">Ventana</span>
        <span className="text-foreground/70">Ayuda</span>
      </div>
      <div className="flex items-center gap-4">
        <Battery className="w-5 h-5" />
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Search className="w-4 h-4" />
        <span className="text-foreground/80">
          {formatDate(currentTime)} {formatTime(currentTime)}
        </span>
      </div>
    </div>
  );
}
