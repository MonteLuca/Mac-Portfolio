"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const REPO = (name: string) => `https://github.com/MonteLuca/${name}`;

interface Project {
  id: number;
  name: string;
  summary: string;
  detail: string;
  highlights: string[];
  tech: string[];
  github: string;
  liveUrl?: string;
  icon: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Neko CRM",
    summary:
      "CRM de clientes en Angular 21 con Mock API (JSON Server), login demo y panel con métricas.",
    detail:
      "Frontend standalone que simula un CRM contra JSON Server (`db.json`, recurso `/clients` en el puerto 3000). Incluye login demo (token en localStorage), rutas lazy con guard, dashboard con gráficos por estado, mes y provincia, listado con búsqueda, filtros y paginación, alta/edición con formularios reactivos, detalle con acciones y baja lógica (`DELETED`, `deletedAt`). HttpClient con interceptor de token simulado, PrimeNG 21 con tema Aura, Toast, estados de carga y responsive con nav y menú lateral en móvil. Código por capas: core, layout, features y shared.",
    highlights: [
      "Angular 21 (standalone), Router con lazy loading, Reactive Forms y TypeScript 5.9",
      "PrimeNG 21 + tema Aura; JSON Server como mock-api (`npm run mock-api`)",
      "Baja lógica con PATCH, filtros de estado y exclusión de borrados en el listado",
    ],
    tech: ["Angular 21", "TypeScript 5.9", "PrimeNG 21", "JSON Server", "RxJS"],
    github: REPO("Neko-CRM"),
    icon: "🐱",
  },
  {
    id: 2,
    name: "ExamenesApp",
    summary:
      "Sistema de gestión de exámenes online: backend Spring Boot y SPA Angular con JWT y roles.",
    detail:
      "Arquitectura en dos proyectos (API REST + frontend): administradores crean categorías, exámenes y preguntas de opción múltiple; los usuarios toman exámenes, ven resultados y gestionan perfil. Autenticación JWT, Spring Security en el servidor, guards e interceptores en Angular. UI con Angular Material, Bootstrap, SweetAlert2 y ngx-ui-loader; persistencia con MySQL y Spring Data JPA.",
    highlights: [
      "JWT y RBAC (administrador / usuario normal), CORS y rutas protegidas",
      "CRUD de categorías, exámenes y preguntas; exámenes activos por categoría",
      "Stack Java 8, Spring Boot 2.7, Angular 15, TypeScript 4.9 y MySQL 8",
    ],
    tech: ["Angular 15", "Spring Boot", "Java 8", "MySQL", "JWT", "TypeScript"],
    github: REPO("ExamenesApp"),
    icon: "📚",
  },
  {
    id: 3,
    name: "ContactPortfolioMicroservice",
    summary:
      "API REST para formularios de contacto del portfolio: correo con Resend o SMTP, CORS y Docker.",
    detail:
      "Microservicio Spring Boot 3.x (Java 21) orientado al envío de emails desde portfolios: endpoint POST `/api/contact` con validación (name, email, subject, message), respuestas 204/400/500 y logging con SLF4J. Estrategia intercambiable para mail (Resend en producción vía WebFlux, SMTP en desarrollo con Spring Mail), perfiles Spring, CORS para el frontend (Netlify y localhost), DTOs con Lombok, Docker y despliegue tipo Railway. Licencia MIT.",
    highlights: [
      "Strategy para MailService (Resend API vs SMTP), inyección y perfiles dev/prod",
      "CORS explícito, WebClient y variables de entorno documentadas",
      "Containerizado con Docker; tests con JUnit 5",
    ],
    tech: ["Java 21", "Spring Boot 3", "Spring Web", "WebFlux", "Docker", "Maven"],
    github: REPO("ContactPortfolioMicroservice"),
    icon: "✉️",
  },
  {
    id: 4,
    name: "PokerWithFriends",
    summary:
      "Texas Hold'em en tiempo real para LAN: Angular + servidor Node con WebSocket (`ws`).",
    detail:
      "Pensado para jugar con cartas físicas mientras el sistema lleva apuestas, pozo, ciegas (SB $20 / BB $40), hasta 4 jugadores y rotación de dealer. Comunicación en tiempo real con WebSocket (eventos como PLAYER_JOINED, HAND_STARTED, PLAYER_ACTION, POT_UPDATED); servidor Node con ES Modules y lógica pura en `game-logic.js`. Cliente en Angular 19+, TypeScript, RxJS y Signals, SCSS y UI responsive. `npm run dev:all` levanta WS en `ws://localhost:8081` y el front en `:4200`; timer de 30 s por acción y el host declara ganadores en el showdown. Scripts PowerShell en Windows. Licencia MIT.",
    highlights: [
      "Rondas Pre-Flop → River y showdown; check, call, raise, all-in y fold",
      "Arquitectura por eventos en el server y GameService + estado reactivo en el cliente",
      "Acceso desde otros dispositivos en la red local (IP + puerto 4200)",
    ],
    tech: ["Angular 19", "TypeScript", "RxJS", "Node.js", "WebSocket", "SCSS"],
    github: REPO("PokerWithFriends"),
    icon: "🃏",
  },
];

export function ProjectsApp() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const active = projects.find((p) => p.id === activeId) ?? null;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  if (active) {
    return (
      <div className="flex min-h-0 flex-col p-6">
        <button
          type="button"
          onClick={() => setActiveId(null)}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Volver a proyectos
        </button>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 text-3xl">
              {active.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-foreground">{active.name}</h1>
              <p className="mt-2 text-muted-foreground">{active.detail}</p>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground/90">
              Destacados
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {active.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground/90">
              Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {active.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border/60 pt-4">
            <a
              href={active.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
            >
              <Github className="h-4 w-4" />
              Ver en GitHub
            </a>
            {active.liveUrl ? (
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary/15 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/25"
              >
                <ExternalLink className="h-4 w-4" />
                Sitio en vivo
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Mis proyectos</h1>
        <p className="text-muted-foreground">
          Elegí un proyecto para ver el detalle. Todo se abre aquí mismo; podés volver con el botón o con Escape.
        </p>
      </div>

      <div className="grid gap-3">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setActiveId(project.id)}
            className={cn(
              "w-full rounded-xl border border-transparent bg-secondary/30 p-4 text-left transition-colors",
              "hover:border-primary/25 hover:bg-secondary/50",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 text-2xl">
                {project.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="mb-1 text-lg font-semibold text-foreground">{project.name}</h2>
                <p className="line-clamp-2 text-sm text-muted-foreground">{project.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs font-medium text-primary/80">Ver más información →</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
