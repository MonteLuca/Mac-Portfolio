/**
 * Genera public/code-manifest.json con el código fuente del portfolio
 * (app, components, lib, hooks, styles + archivos raíz clave).
 * Excluye binarios, locks y carpetas pesadas.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "code-manifest.json");

const ROOT_FILES = [
  "package.json",
  "next.config.mjs",
  "tsconfig.json",
  "postcss.config.mjs",
  "components.json",
];

const SOURCE_ROOTS = ["app", "components", "lib", "hooks", "styles"];

const ALLOW_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".css",
  ".md",
  ".html",
  ".svg",
]);

const MAX_FILE_BYTES = 180_000;
const MAX_CHARS = 120_000;

function shouldSkipFile(name) {
  if (/^\.env/i.test(name)) return true;
  if (/lock\.(json|yaml|yml)$/i.test(name)) return true;
  if (name === "code-manifest.json") return true;
  return false;
}

function collectFromDir(dir, relPrefix, files) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === "code-manifest.json") continue;
    const abs = path.join(dir, e.name);
    const rel = relPrefix ? `${relPrefix}/${e.name}` : e.name;
    if (e.isDirectory()) {
      collectFromDir(abs, rel, files);
    } else {
      if (shouldSkipFile(e.name)) continue;
      const ext = path.extname(e.name).toLowerCase();
      if (!ALLOW_EXT.has(ext)) continue;
      const st = fs.statSync(abs);
      if (st.size > MAX_FILE_BYTES) continue;
      let text = fs.readFileSync(abs, "utf8");
      if (text.length > MAX_CHARS) {
        text =
          text.slice(0, MAX_CHARS) +
          `\n\n/* …archivo truncado (${e.name}) */\n`;
      }
      files[rel.replace(/\\/g, "/")] = text;
    }
  }
}

const files = {};

for (const root of SOURCE_ROOTS) {
  collectFromDir(path.join(ROOT, root), root, files);
}

for (const name of ROOT_FILES) {
  const abs = path.join(ROOT, name);
  if (!fs.existsSync(abs)) continue;
  if (shouldSkipFile(name)) continue;
  const ext = path.extname(name).toLowerCase();
  if (!ALLOW_EXT.has(ext) && name !== "package.json") continue;
  const st = fs.statSync(abs);
  if (st.size > MAX_FILE_BYTES) continue;
  let text = fs.readFileSync(abs, "utf8");
  if (text.length > MAX_CHARS) {
    text = text.slice(0, MAX_CHARS) + "\n\n/* …truncado */\n";
  }
  files[name.replace(/\\/g, "/")] = text;
}

const manifest = {
  generatedAt: new Date().toISOString(),
  files,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(manifest), "utf8");

console.log(
  `code-manifest: ${Object.keys(files).length} archivos → ${path.relative(ROOT, OUT)}`
);
