/**
 * Silueta reconocible estilo logo VS Code (paneles angulares).
 * Se pinta con `currentColor` (blanco sobre el tile del dock).
 */
import type { SVGProps } from "react";

export function VsCodeDockIcon({
  className,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...rest}
    >
      <path
        fill="currentColor"
        fillOpacity={0.45}
        d="M17.2 2 23 5.4v13.2L17.2 22l-9.2-5.4V7.4L17.2 2Z"
      />
      <path
        fill="currentColor"
        d="M17.2 2 6.5 8.2v7.6L17.2 22V2Z"
      />
      <path
        fill="currentColor"
        fillOpacity={0.85}
        d="M6.5 8.2 1 5.2v13.6l5.5-3V8.2Z"
      />
      <path fill="currentColor" d="m14.5 9-4.5 3 4.5 3V9Z" />
    </svg>
  );
}
