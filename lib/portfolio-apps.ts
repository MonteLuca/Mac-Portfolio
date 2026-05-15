import {
  User,
  FolderOpen,
  Code2,
  Mail,
  Briefcase,
  Terminal,
  Github,
  FileText,
} from "lucide-react";
import { VsCodeDockIcon } from "@/components/icons/vscode-dock-icon";
import { SpotifyLogoIcon } from "@/components/icons/spotify-logo-icon";

/** Apps del dock Mac / iPad / iPhone (incluye GitHub). En iPhone, la grilla superior solo lista `iosPortfolioGridApps`. */
export const portfolioApps = [
  { id: "about", name: "Sobre Mí", icon: User, color: "from-blue-500 to-blue-600" },
  { id: "projects", name: "Proyectos", icon: FolderOpen, color: "from-cyan-500 to-teal-600" },
  { id: "skills", name: "Skills", icon: Code2, color: "from-green-500 to-emerald-600" },
  { id: "experience", name: "Experiencia", icon: Briefcase, color: "from-orange-500 to-amber-600" },
  { id: "terminal", name: "Terminal", icon: Terminal, color: "from-gray-700 to-gray-900" },
  { id: "contact", name: "Contacto", icon: Mail, color: "from-red-500 to-rose-600" },
  { id: "github", name: "GitHub", icon: Github, color: "from-gray-600 to-gray-800" },
] as const;

export const vscodeGridApp = {
  id: "vscode",
  name: "VS Code",
  icon: VsCodeDockIcon,
  color: "from-[#0078d4] to-[#005a9e]",
} as const;

export const spotifyGridApp = {
  id: "spotify",
  name: "Spotify",
  icon: SpotifyLogoIcon,
  color: "from-[#1ed760] to-[#117a37]",
} as const;

/** CV en la grilla iPhone (abre la misma ventana `resume` que el escritorio). */
export const resumeGridApp = {
  id: "resume",
  name: "CV (ES)",
  icon: FileText,
  color: "from-white to-slate-200",
} as const;

/** iPhone: solo Spotify, VS Code y CV (el resto está en el dock inferior). */
export const iosPortfolioGridApps = [spotifyGridApp, vscodeGridApp, resumeGridApp] as const;

export type PortfolioAppId =
  | (typeof portfolioApps)[number]["id"]
  | typeof vscodeGridApp["id"]
  | typeof spotifyGridApp["id"]
  | typeof resumeGridApp["id"];
