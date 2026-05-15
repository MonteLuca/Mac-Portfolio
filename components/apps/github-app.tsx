"use client";

import { GitFork, Star, ExternalLink } from "lucide-react";
import Image from "next/image";

const recentActivity = [
  { type: "commit", repo: "Neko-CRM", message: "feat: dashboard y gráficos", time: "hace 2h" },
  { type: "commit", repo: "ExamenesApp", message: "chore: actualización de dependencias", time: "hace 1d" },
  { type: "commit", repo: "ContactPortfolioMicroservice", message: "feat: perfil prod Resend + Docker", time: "hace 2d" },
  { type: "commit", repo: "PokerWithFriends", message: "feat: dev:all, timer 30s y eventos WS de mesa", time: "hace 3d" },
  { type: "star", repo: "spring-boot-starter", message: "Starred repository", time: "hace 1 semana" },
];

const pinnedRepos = [
  {
    name: "ContactPortfolioMicroservice",
    description: "Contacto del portfolio: Spring Boot 3, Resend/SMTP, CORS y Docker (MIT)",
    stars: 0,
    forks: 0,
    language: "Java",
    color: "bg-orange-500",
  },
  {
    name: "PokerWithFriends",
    description: "Texas Hold'em LAN: Angular 19+, Node + ws, ciegas, 4 jugadores y host elige ganadores",
    stars: 15,
    forks: 4,
    language: "TypeScript",
    color: "bg-blue-500",
  },
  {
    name: "Neko-CRM",
    description: "CRM Angular 21 + PrimeNG 21: mock API con JSON Server, dashboard y baja lógica",
    stars: 0,
    forks: 0,
    language: "TypeScript",
    color: "bg-blue-500",
  },
  {
    name: "ExamenesApp",
    description: "Exámenes online: Angular 15 + Spring Boot, JWT, MySQL y paneles admin/usuario",
    stars: 0,
    forks: 0,
    language: "TypeScript",
    color: "bg-blue-500",
  },
];

export function GithubApp() {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/profile.png"
            alt="Luca Monteleone"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">@MonteLuca</h1>
            <a 
              href="https://github.com/MonteLuca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 hover:bg-secondary rounded transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
          <p className="text-muted-foreground">Luca Monteleone</p>
          <p className="text-sm text-muted-foreground">Desarrollador FullStack | Mendoza, Argentina</p>
        </div>
      </div>

      {/* Pinned Repos */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Repositorios destacados</h2>
        <div className="grid grid-cols-2 gap-3">
          {pinnedRepos.map((repo) => (
            <a 
              key={repo.name} 
              href={`https://github.com/MonteLuca/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary/30 rounded-xl p-4 hover:bg-secondary/50 transition-colors cursor-pointer block"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                  {repo.name}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{repo.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${repo.color}`} />
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" /> {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" /> {repo.forks}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Actividad reciente</h2>
        <div className="space-y-2">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center gap-3 text-sm py-2 border-b border-border/50 last:border-0">
              <span className="text-lg">
                {activity.type === "commit" && "💾"}
                {activity.type === "star" && "⭐"}
                {activity.type === "pr" && "🔀"}
                {activity.type === "issue" && "🐛"}
              </span>
              <div className="flex-1">
                <span className="text-primary font-medium">{activity.repo}</span>
                <span className="text-muted-foreground mx-2">·</span>
                <span className="text-foreground/80">{activity.message}</span>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
