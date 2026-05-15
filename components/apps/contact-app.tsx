"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Phone } from "lucide-react";

/** Solo dígitos, sin + ni espacios (Argentina). Cambiar si usás otro número. */
const WHATSAPP_PHONE_DIGITS = "5492615120574";

const DEFAULT_WA_MESSAGE = "Hola vengo de tu Portfolio.";

function whatsappUrl(text: string): string {
  const safe =
    text.length > 3500 ? `${text.slice(0, 3500)}\n\n…(mensaje acortado)` : text;
  return `https://wa.me/${WHATSAPP_PHONE_DIGITS}?text=${encodeURIComponent(safe)}`;
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/MonteLuca",
    className: "bg-zinc-800 hover:bg-zinc-700",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/luca-monteleone-dev/",
    className: "bg-blue-900/80 hover:bg-blue-800",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:lucamonteleone546@gmail.com",
    className: "bg-rose-900/70 hover:bg-rose-800",
  },
  {
    name: "WhatsApp",
    icon: WhatsAppGlyph,
    url: whatsappUrl(DEFAULT_WA_MESSAGE),
    className: "bg-emerald-700 hover:bg-emerald-600",
  },
];

function buildFormWhatsAppBody(
  name: string,
  email: string,
  message: string
): string {
  return [
    DEFAULT_WA_MESSAGE,
    "",
    `Nombre: ${name.trim()}`,
    `Email: ${email.trim()}`,
    "",
    "Mensaje:",
    message.trim(),
  ].join("\n");
}

export function ContactApp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const url = whatsappUrl(buildFormWhatsAppBody(name, email, message));
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const fieldClass =
    "w-full rounded-xl border border-white/12 bg-zinc-950/90 px-4 py-3 text-foreground shadow-inner outline-none transition-colors placeholder:text-zinc-500 focus:border-primary/60 focus:ring-2 focus:ring-primary/25";

  const cardClass =
    "flex items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/95 p-4 shadow-sm";

  return (
    <div className="relative isolate min-h-full bg-[oklch(0.11_0.01_250/1)] p-5 sm:p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold text-foreground">Contacto</h1>
        <p className="text-muted-foreground">
          ¿Tenés un proyecto en mente? Hablemos.
        </p>
      </div>

      <div className="grid max-w-3xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 lg:gap-10">
        <div className="space-y-5">
          <div className="space-y-3">
            <div className={cardClass}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/25">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Email
                </p>
                <a
                  href="mailto:lucamonteleone546@gmail.com"
                  className="break-all font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                >
                  lucamonteleone546@gmail.com
                </a>
              </div>
            </div>
            <div className={cardClass}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-900/40">
                <MapPin className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Ubicación
                </p>
                <p className="font-medium text-foreground">Mendoza, Argentina</p>
              </div>
            </div>
            <div className={cardClass}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-900/40">
                <Phone className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Teléfono
                </p>
                <a
                  href="tel:+5492615120574"
                  className="font-medium text-foreground underline-offset-2 hover:text-primary hover:underline"
                >
                  +54 9 261 512-0574
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Encontrame en
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-white transition-colors ${social.className}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/35 bg-emerald-950/50 p-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium text-emerald-400">
                Disponible para trabajar
              </span>
            </div>
            <p className="mt-1.5 text-sm text-zinc-400">
              Modalidad remota preferida
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900/90 p-5 shadow-sm sm:p-6"
        >
          <p className="text-sm text-zinc-400">
            Completá los tres campos y te llevamos a WhatsApp con tu mensaje
            listo para enviar.
          </p>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={fieldClass}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={fieldClass}
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Mensaje
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className={`${fieldClass} h-32 resize-none`}
              placeholder="Contame sobre tu proyecto…"
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-medium text-white transition-colors hover:bg-emerald-500"
          >
            {sent ? (
              "Se abrió WhatsApp — revisá la pestaña"
            ) : (
              <>
                <WhatsAppGlyph className="h-5 w-5" />
                Enviar por WhatsApp
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
