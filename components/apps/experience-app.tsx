"use client";

import { Briefcase, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

type EmploymentTag = "contractor" | "freelance";

interface WorkExperience {
  type: "work";
  title: string;
  company: string;
  employmentDetail?: string;
  location: string;
  period: string;
  employmentTag: EmploymentTag;
  description: string;
  responsibilities: string[];
  skills?: string[];
}

const experiences: WorkExperience[] = [
  {
    type: "work",
    title: "Desarrollador full stack",
    company: "Benza",
    employmentDetail: "Autónomo",
    location: "Mendoza, Argentina · En remoto",
    period: "jul. 2024 – nov. 2025",
    employmentTag: "contractor",
    description:
      "Benza Value es una plataforma SaaS enfocada en la optimización de tiendas online, integrando inteligencia artificial para mejorar la conversión y automatizar estrategias de venta. Como Desarrollador Full Stack, participo activamente en el mantenimiento y evolución del producto, colaborando con el equipo técnico para garantizar calidad y escalabilidad.",
    responsibilities: [
      "Desarrollo y mantenimiento de módulos frontend con Angular, siguiendo buenas prácticas y arquitectura modular.",
      "Creación de vistas dinámicas y componentes reutilizables integrados con servicios REST.",
      "Implementación y consumo de servicios HTTP para comunicación con microservicios backend.",
      "Diseño de formularios reactivos avanzados con validaciones personalizadas y lógica condicional.",
      "Soporte y mejora continua del código para optimizar rendimiento y usabilidad.",
    ],
    skills: ["Angular", "Express.js"],
  },
  {
    type: "work",
    title: "Desarrollador de WordPress",
    company: "Supova",
    location: "Mendoza, Argentina · En remoto",
    period: "jul. 2025 – nov. 2025",
    employmentTag: "freelance",
    description:
      "Participé en la página institucional de SUPOVA, el Sindicato Unido de Personal de Obras Viales de Mendoza. El proyecto buscó dar mayor visibilidad a la organización y ofrecer información clara a sus afiliados y al público en general. El sitio fue desarrollado en WordPress, con un diseño adaptable a distintos dispositivos y pensado para facilitar la actualización de contenidos por parte del cliente. Actualmente el proyecto sigue en desarrollo, con nuevas secciones y funcionalidades planificadas para ampliarse en el corto plazo. Fue un proyecto que permitió trasladar la identidad del sindicato al entorno digital y dejar una base sólida para futuras mejoras.",
    responsibilities: [
      "Información gremial y de afiliación.",
      "Datos de contacto y denuncias.",
      "Representantes y actividades del sindicato.",
      "Noticias y novedades del sector.",
    ],
    skills: ["WordPress"],
  },
  {
    type: "work",
    title: "Desarrollador de front-end",
    company: "CAMARCO Mendoza",
    location: "Mendoza, Argentina",
    period: "sept. 2023 – ago. 2024",
    employmentTag: "freelance",
    description:
      "CAMARCO Mendoza (Cámara Argentina de la Construcción – Delegación Mendoza) es una institución que promueve el desarrollo del sector constructivo en la provincia, brindando servicios e información a empresas y profesionales. Como Desarrollador Web, participé en la modernización de su presencia digital.",
    responsibilities: [
      "Mantuve y actualicé el sitio web institucional existente.",
      "Diseñé y desarrollé una nueva página web con estructura moderna y adaptable.",
      "Optimicé la base de datos, mejorando el rendimiento y la organización de la información.",
      "Aseguré la compatibilidad y usabilidad en distintos dispositivos y navegadores.",
    ],
    skills: ["WordPress", "PHP"],
  },
  {
    type: "work",
    title: "Desarrollador full stack",
    company: "Chokiss Mendoza",
    location: "Argentina",
    period: "nov. 2023 – may. 2024",
    employmentTag: "freelance",
    description:
      "Chokiss Mendoza fue una empresa dedicada a la venta y distribución de insumos para mascotas en todo el país, ofreciendo productos como colchones, buzos, collares y accesorios. Como Desarrollador Full Stack, participé en el desarrollo de herramientas internas para optimizar la gestión comercial y operativa.",
    responsibilities: [
      "Desarrollé una aplicación móvil para ventas, stock y control de usuarios.",
      "Implementé una API RESTful para la comunicación entre el frontend y el backend.",
      "Diseñé y desarrollé vistas enfocadas en la eficiencia y facilidad de uso.",
      "Redacté documentación técnica para el mantenimiento del sistema y futuras mejoras.",
    ],
    skills: ["Java", "Angular"],
  },
  {
    type: "work",
    title: "Desarrollador de front-end",
    company: "AmCham Argentina",
    employmentDetail: "Jornada parcial",
    location: "Mendoza, Argentina · En remoto",
    period: "jul. 2023 – ene. 2024",
    employmentTag: "contractor",
    description:
      "AmCham Argentina (Cámara de Comercio de Estados Unidos en Argentina) es una organización que promueve la colaboración empresarial y el desarrollo de vínculos entre ambos países. Como Desarrollador Frontend, formé parte de un equipo multidisciplinario bajo la metodología SCRUM, participando activamente en reuniones diarias y coordinaciones de sprint.",
    responsibilities: [
      "Desarrollé componentes y vistas para la página web, garantizando coherencia visual y rendimiento.",
      "Optimicé secciones existentes, mejorando tiempos de carga y experiencia del usuario.",
      "Colaboré en la planificación y puesta en común de nuevas vistas junto al equipo de diseño y desarrollo.",
      "Participé en dailys, reviews y retrospectives, asegurando una comunicación fluida y cumplimiento de objetivos.",
    ],
    skills: ["React.js", "Diseño de front-end"],
  },
  {
    type: "work",
    title: "Desarrollador de back-end",
    company: "Vodafone",
    employmentDetail: "Jornada completa",
    location: "Valencia/València, Comunidad Valenciana, España · En remoto",
    period: "feb. 2023 – jul. 2023",
    employmentTag: "contractor",
    description:
      "Vodafone es una de las principales compañías de telecomunicaciones a nivel mundial, enfocada en ofrecer soluciones móviles, de internet y servicios empresariales. Como Desarrollador Backend, formé parte de un equipo internacional que trabajaba bajo metodología SCRUM, colaborando en la creación y mantenimiento de servicios escalables.",
    responsibilities: [
      "Mantuve y optimicé endpoints existentes para mejorar rendimiento y estabilidad.",
      "Desarrollé APIs RESTful asegurando consistencia y buenas prácticas de integración.",
      "Implementé y gestioné microservicios, garantizando modularidad y escalabilidad.",
      "Elaboré documentación técnica para soporte y mantenimiento de los servicios desarrollados.",
    ],
    skills: ["Java", "Spring Framework"],
  },
];

const education = [
  {
    title: "Ingles escrito y conversacional",
    institution: "Instituto Cultural Mendoza",
    period: "03/2025 - En curso",
  },
  {
    title: "Desarrollador Full Stack",
    institution: "Egg Corporation",
    period: "Completado",
  },
];

const certifications = [
  "De cero a Experto en Angular - Udemy",
  "Python de Cero a Profesional - Udemy",
  "Desarrollador Full Stack - Egg Corporation",
];

function EmploymentTagBadge({ tag }: { tag: EmploymentTag }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        tag === "contractor"
          ? "border-sky-500/40 bg-sky-500/15 text-sky-300"
          : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
      )}
    >
      {tag === "contractor" ? "Contractor" : "Freelance"}
    </span>
  );
}

export function ExperienceApp() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Experiencia Laboral</h2>
        </div>
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.period}-${index}`}
              className="relative border-l-2 border-primary/30 pb-6 pl-6 last:pb-0"
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
              <div className="rounded-xl bg-secondary/30 p-5">
                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <EmploymentTagBadge tag={exp.employmentTag} />
                    </div>
                    <p className="font-medium text-primary">{exp.company}</p>
                    {exp.employmentDetail ? (
                      <p className="text-xs text-muted-foreground">{exp.employmentDetail}</p>
                    ) : null}
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                {exp.responsibilities.length > 0 ? (
                  <div className="mb-3">
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-foreground/80">
                      Responsabilidades principales
                    </p>
                    <ul className="list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                      {exp.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {exp.skills && exp.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-accent/20 px-2 py-1 text-xs text-accent"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-bold text-foreground">Educacion</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {education.map((edu, index) => (
            <div key={index} className="rounded-xl bg-secondary/30 p-4">
              <h3 className="font-semibold text-foreground">{edu.title}</h3>
              <p className="text-sm text-primary">{edu.institution}</p>
              <p className="mt-1 text-xs text-muted-foreground">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <h2 className="text-xl font-bold text-foreground">Certificaciones</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert, index) => (
            <span
              key={index}
              className="rounded-lg border border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2 text-sm font-medium text-foreground"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
