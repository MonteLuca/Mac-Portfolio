"use client";

import { useState, useEffect, useRef } from "react";

const initialLines = [
  { text: "Last login: " + new Date().toLocaleDateString("es-AR") + " on ttys001", type: "system" },
  { text: "", type: "empty" },
];

const commands: Record<string, string[]> = {
  help: [
    "Comandos disponibles:",
    "  about     - Informacion sobre mi",
    "  skills    - Ver mis habilidades",
    "  contact   - Informacion de contacto",
    "  projects  - Lista de proyectos",
    "  exp       - Experiencia laboral",
    "  clear     - Limpiar terminal",
    "  date      - Fecha actual",
    "  whoami    - Quien soy?",
  ],
  about: [
    "╔════════════════════════════════════════╗",
    "║     LUCA IGNACIO MONTELEONE            ║",
    "║     Desarrollador FullStack            ║",
    "║     Mendoza, Argentina                 ║",
    "╚════════════════════════════════════════╝",
    "",
    "Desarrollador Java con experiencia en",
    "aplicaciones backend y microservicios.",
    "",
    "Proactivo | Responsable | Adaptable",
    "Trabajo en equipo | Aprendizaje continuo",
  ],
  skills: [
    "Backend:   ████████████████████░░  Java, Spring Boot",
    "Frontend:  ██████████████████░░░░  Angular, React, TS",
    "Database:  ████████████████░░░░░░  MySQL, MongoDB",
    "Mobile:    ██████████████░░░░░░░░  Ionic, Angular Material",
  ],
  contact: [
    "📧 Email:    lucamonteleone546@gmail.com",
    "📱 Telefono: +54 9 2615120574",
    "🐙 GitHub:   github.com/MonteLuca",
    "💼 LinkedIn: linkedin.com/in/luca-monteleone-dev",
    "📍 Ubicacion: Mendoza, Argentina",
  ],
  projects: [
    "┌─────────────────────────────────────────┐",
    "│ REPOS DESTACADOS (github.com/MonteLuca) │",
    "├─────────────────────────────────────────┤",
    "│ Neko-CRM            Angular 21 + PrimeNG │",
    "│ ExamenesApp            Angular + Spring │",
    "│ ContactPortfolioMicroservice  Spring 3  │",
    "│ PokerWithFriends      Angular + Node ws │",
    "└─────────────────────────────────────────┘",
  ],
  exp: [
    "EXPERIENCIA LABORAL:",
    "",
    "► Benza Value (07/2024 - 11/2025)",
    "  FullStack - Angular, Express.js, MongoDB",
    "",
    "► Amcham (07/2023 - 01/2024)",
    "  Frontend - React, JavaScript",
    "",
    "► Vodafone (02/2023 - 07/2023)",
    "  Backend - Java, Spring Boot",
    "",
    "► Freelance (02/2023 - 07/2023)",
    "  FullStack - Angular, Java, Ionic, WordPress",
  ],
  date: [new Date().toLocaleString("es-AR", { dateStyle: "full", timeStyle: "long" })],
  whoami: ["Luca Monteleone | Desarrollador FullStack | Mendoza, Argentina"],
};

export function TerminalApp() {
  const [lines, setLines] = useState(initialLines);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    const newLines = [
      ...lines,
      { text: `luca@portfolio ~ % ${cmd}`, type: "command" as const },
    ];

    if (trimmedCmd === "clear") {
      setLines(initialLines);
      return;
    }

    if (trimmedCmd === "") {
      setLines(newLines);
      return;
    }

    const output = commands[trimmedCmd];
    if (output) {
      output.forEach((line) => {
        newLines.push({ text: line, type: "output" as const });
      });
    } else {
      newLines.push({ 
        text: `zsh: command not found: ${trimmedCmd}. Escribe 'help' para ver comandos disponibles.`, 
        type: "error" as const 
      });
    }

    setLines(newLines);
    setHistory([...history, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      className="h-full bg-[#1e1e1e] p-4 font-mono text-sm overflow-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          className={`
            ${line.type === "system" ? "text-gray-500" : ""}
            ${line.type === "command" ? "text-green-400" : ""}
            ${line.type === "output" ? "text-gray-300" : ""}
            ${line.type === "error" ? "text-red-400" : ""}
            ${line.type === "empty" ? "h-4" : ""}
          `}
        >
          {line.text}
        </div>
      ))}
      <div className="flex items-center text-green-400">
        <span>luca@portfolio ~ % </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white ml-1 caret-green-400"
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
