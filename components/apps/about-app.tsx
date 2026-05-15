"use client";

import { MapPin, Calendar, Coffee, Heart, Code } from "lucide-react";
import Image from "next/image";

export function AboutApp() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start gap-6">
        <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/10">
          <Image
            src="/profile.png"
            alt="Luca Monteleone"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-1">
            Luca Ignacio Monteleone
          </h1>
          <p className="text-xl text-primary font-medium mb-2">Desarrollador FullStack</p>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span>Mendoza, Argentina</span>
          </div>
          <p className="text-foreground/80 leading-relaxed">
            Desarrollador Java con experiencia en aplicaciones backend y arquitecturas 
            basadas en microservicios. En constante formacion, profundizando en 
            tecnologias del ecosistema Java.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-secondary/50 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Coffee className="w-5 h-5 text-accent" />
          Sobre Mi
        </h2>
        <div className="text-foreground/80 space-y-4 leading-relaxed">
          <p>
            Me considero una persona proactiva, responsable y con buena capacidad 
            de adaptacion, con predisposicion para aprender, colaborar en equipo 
            y asumir nuevos desafios.
          </p>
          <p>
            Mi objetivo es seguir creciendo a nivel personal y profesional dentro 
            del desarrollo de software, consolidando una base solida en Java, 
            Spring Boot, Spring Security y servicios backend.
          </p>
          <p>
            Disfruto tanto del desarrollo frontend como backend, desde disenar 
            interfaces con Angular y React hasta arquitectar APIs robustas con 
            Spring Boot.
          </p>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Experiencia</span>
          </div>
          <p className="text-2xl font-bold text-foreground">4+ años</p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Empresas</span>
          </div>
          <p className="text-2xl font-bold text-foreground">4+</p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Especialidad</span>
          </div>
          <p className="text-lg font-bold text-foreground">Java & Angular</p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Modalidad</span>
          </div>
          <p className="text-base font-bold leading-snug text-foreground sm:text-lg">
            Remoto, Presencial e Híbrido
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Mis Valores</h3>
        <div className="flex flex-wrap gap-2">
          {["Codigo Limpio", "Aprendizaje Continuo", "Trabajo en Equipo", "Proactividad", "Adaptabilidad", "Responsabilidad"].map((value) => (
            <span
              key={value}
              className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium"
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
