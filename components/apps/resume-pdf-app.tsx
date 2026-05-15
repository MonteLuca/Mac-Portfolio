"use client";

import { ExternalLink } from "lucide-react";

/** Archivo en `public/` (copia del CV en español). */
const PDF_SRC = "/luca-monteleone-cv-es.pdf";

export function ResumePdfApp() {
  return (
    <div className="flex h-full min-h-[360px] flex-col bg-background">
      <div className="flex shrink-0 items-center justify-end gap-2 border-b border-border/60 px-3 py-2">
        <a
          href={PDF_SRC}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          Abrir en pestaña nueva
        </a>
      </div>
      <iframe
        title="Curriculum vitae — español (PDF)"
        src={PDF_SRC}
        className="min-h-0 w-full flex-1 border-0 bg-muted"
      />
    </div>
  );
}
