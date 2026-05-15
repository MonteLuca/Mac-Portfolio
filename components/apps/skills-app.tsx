"use client";

/** Íconos oficiales (Simple Icons CDN). `slug` = nombre en simpleicons.org */
const skillCards = [
  { name: "Angular", years: "+4 años", slug: "angular", color: "DD0031" },
  { name: "React", years: "+4 años", slug: "react", color: "61DAFB" },
  { name: "Java", years: "+4 años", slug: "openjdk", color: "437291" },
  { name: "Spring Boot", years: "+4 años", slug: "springboot", color: "6DB33F" },
  { name: "WordPress", years: "+4 años", slug: "wordpress", color: "21759B" },
  { name: "PHP", years: "+4 años", slug: "php", color: "777BB4" },
  { name: "Python", years: "+2 años", slug: "python", color: "3776AB" },
] as const;

const otherSkills = [
  "Git",
  "GitHub",
  "Docker",
  "Express.js",
  "TypeScript",
  "JavaScript",
  "WebSockets",
  "REST APIs",
  "Agile/Scrum",
  "Railway",
  "Responsive Design",
  "HTML/CSS",
  "MySQL",
  "MongoDB",
  "PostgreSQL",
  "Ionic",
  "PrimeNG",
  "Angular Material",
  "Elementor",
];

function TechIcon({ slug, color }: { slug: string; color: string }) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${color}`}
      alt=""
      width={56}
      height={56}
      className="h-14 w-14 shrink-0"
      loading="lazy"
      decoding="async"
    />
  );
}

export function SkillsApp() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">Skills & Tecnologías</h1>
        <p className="text-muted-foreground">
          Stack principal y años de experiencia aproximados
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {skillCards.map((skill) => (
          <div
            key={skill.name}
            role="group"
            aria-label={`${skill.name}, ${skill.years}`}
            className="flex flex-col items-center rounded-xl border border-border/60 bg-secondary/30 p-4 text-center shadow-sm transition-colors hover:bg-secondary/45"
          >
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-background/50 ring-1 ring-border/50">
              <TechIcon slug={skill.slug} color={skill.color} />
            </div>
            <h2 className="text-base font-semibold text-foreground">{skill.name}</h2>
            <p className="mt-1 text-sm font-medium text-primary">{skill.years}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-secondary/30 p-5">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Otras habilidades</h2>
        <div className="flex flex-wrap gap-2">
          {otherSkills.map((skill) => (
            <span
              key={skill}
              className="cursor-default rounded-lg bg-primary/15 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/25"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-secondary/30 p-5">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Idiomas</h2>
        <div className="flex flex-wrap gap-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🇪🇸
            </span>
            <div>
              <p className="font-medium text-foreground">Español</p>
              <p className="text-sm text-muted-foreground">Nativo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🇬🇧
            </span>
            <div>
              <p className="font-medium text-foreground">Inglés</p>
              <p className="text-sm text-muted-foreground">A2 (En curso)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
