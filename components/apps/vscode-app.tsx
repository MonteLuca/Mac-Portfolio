"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const Editor = dynamic(
  () => import("@monaco-editor/react").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[200px] items-center justify-center bg-[#1e1e1e] text-sm text-[#cccccc]">
        Cargando editor…
      </div>
    ),
  }
);

type TreeNode = {
  name: string;
  fullPath: string;
  type: "file" | "folder";
  children?: TreeNode[];
};

type Manifest = { generatedAt?: string; files: Record<string, string> };

function buildTree(files: Record<string, string>): TreeNode {
  const root: TreeNode = {
    name: "portfolio",
    fullPath: "",
    type: "folder",
    children: [],
  };

  const sorted = Object.keys(files).sort((a, b) => a.localeCompare(b));
  for (const filePath of sorted) {
    const parts = filePath.split("/");
    let parent = root;
    let acc = "";
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      acc = acc ? `${acc}/${part}` : part;
      const isLeaf = i === parts.length - 1;
      if (!parent.children) parent.children = [];
      let node = parent.children.find((c) => c.name === part);
      if (!node) {
        node = {
          name: part,
          fullPath: acc,
          type: isLeaf ? "file" : "folder",
          children: isLeaf ? undefined : [],
        };
        parent.children.push(node);
      } else if (isLeaf) {
        node.type = "file";
        node.children = undefined;
      }
      parent = node;
    }
  }

  function sortChildren(n: TreeNode) {
    if (!n.children) return;
    n.children.sort((a, b) => {
      if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    n.children.forEach(sortChildren);
  }
  sortChildren(root);
  return root;
}

function folderPrefixes(paths: string[]): Set<string> {
  const s = new Set<string>();
  for (const p of paths) {
    const parts = p.split("/");
    for (let i = 0; i < parts.length - 1; i++) {
      s.add(parts.slice(0, i + 1).join("/"));
    }
  }
  return s;
}

function languageForPath(filePath: string): string {
  if (filePath.endsWith(".tsx")) return "typescriptreact";
  if (filePath.endsWith(".ts")) return "typescript";
  if (filePath.endsWith(".jsx")) return "javascript";
  if (filePath.endsWith(".js") || filePath.endsWith(".mjs") || filePath.endsWith(".cjs"))
    return "javascript";
  if (filePath.endsWith(".json")) return "json";
  if (filePath.endsWith(".css")) return "css";
  if (filePath.endsWith(".md")) return "markdown";
  if (filePath.endsWith(".html")) return "html";
  return "plaintext";
}

function TreeRows({
  node,
  depth,
  expanded,
  toggle,
  selectedPath,
  onSelectFile,
}: {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  toggle: (path: string) => void;
  selectedPath: string | null;
  onSelectFile: (path: string) => void;
}) {
  if (node.type === "file") {
    const active = selectedPath === node.fullPath;
    return (
      <button
        type="button"
        key={node.fullPath}
        style={{ paddingLeft: 8 + depth * 12 }}
        onClick={() => onSelectFile(node.fullPath)}
        className={cn(
          "flex w-full items-center gap-1.5 py-0.5 pr-2 text-left text-[13px] hover:bg-[#2a2d2e]",
          active && "bg-[#37373d]"
        )}
      >
        <File className="h-4 w-4 shrink-0 text-[#90b8f7]" />
        <span className="truncate text-[#cccccc]">{node.name}</span>
      </button>
    );
  }

  const isOpen = node.fullPath === "" || expanded.has(node.fullPath);
  return (
    <div key={node.fullPath || "root"}>
      {node.fullPath !== "" && (
        <button
          type="button"
          style={{ paddingLeft: 4 + depth * 12 }}
          onClick={() => toggle(node.fullPath)}
          className="flex w-full items-center gap-0.5 py-0.5 pr-2 text-left text-[13px] text-[#cccccc] hover:bg-[#2a2d2e]"
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 text-[#cccccc] transition-transform",
              isOpen && "rotate-90"
            )}
          />
          {isOpen ? (
            <FolderOpen className="h-4 w-4 shrink-0 text-[#dcb67a]" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-[#dcb67a]" />
          )}
          <span className="truncate">{node.name}</span>
        </button>
      )}
      {isOpen && node.children && (
        <div>
          {node.children.map((ch) => (
            <TreeRows
              key={ch.fullPath}
              node={ch}
              depth={node.fullPath === "" ? depth : depth + 1}
              expanded={expanded}
              toggle={toggle}
              selectedPath={selectedPath}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function VsCodeApp() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const editorWrapRef = useRef<HTMLDivElement>(null);
  const [editorHeight, setEditorHeight] = useState(480);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/code-manifest.json", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = (await res.json()) as Manifest;
        if (cancelled) return;
        if (!data.files || typeof data.files !== "object") {
          throw new Error("Manifiesto inválido");
        }
        setManifest(data);
        const paths = Object.keys(data.files).sort();
        setExpanded(folderPrefixes(paths));
        const first = paths.find((p) => p.endsWith("page.tsx")) ?? paths[0] ?? null;
        if (first) {
          setSelectedPath(first);
          setOpenTabs([first]);
        }
      } catch {
        if (!cancelled) {
          setLoadError(
            "No se encontró el código embebido. Ejecutá en la raíz del proyecto: npm run code:manifest"
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const tree = useMemo(() => {
    if (!manifest?.files) return null;
    return buildTree(manifest.files);
  }, [manifest]);

  const toggle = useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const openFile = useCallback((path: string) => {
    setSelectedPath(path);
    setOpenTabs((tabs) => (tabs.includes(path) ? tabs : [...tabs, path]));
  }, []);

  const closeTab = useCallback((path: string) => {
    setOpenTabs((tabs) => {
      const i = tabs.indexOf(path);
      const next = tabs.filter((t) => t !== path);
      setTimeout(() => {
        setSelectedPath((cur) => {
          if (cur !== path) return cur;
          return next[Math.max(0, i - 1)] ?? next[0] ?? null;
        });
      }, 0);
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    const el = editorWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setEditorHeight(Math.max(200, el.clientHeight));
    });
    ro.observe(el);
    setEditorHeight(Math.max(200, el.clientHeight));
    return () => ro.disconnect();
  }, [manifest, selectedPath]);

  const content =
    manifest && selectedPath ? manifest.files[selectedPath] ?? "" : "";
  const lang = selectedPath ? languageForPath(selectedPath) : "plaintext";

  if (loadError) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 bg-[#1e1e1e] p-8 text-center text-sm text-[#cccccc]">
        <p>{loadError}</p>
        <code className="rounded bg-[#252526] px-2 py-1 text-xs text-[#9cdcfe]">
          npm run code:manifest
        </code>
      </div>
    );
  }

  if (!manifest || !tree) {
    return (
      <div className="flex min-h-[320px] items-center justify-center bg-[#1e1e1e] text-sm text-[#cccccc]">
        Cargando árbol de archivos…
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[420px] flex-col bg-[#1e1e1e] text-[#cccccc]">
      {/* Title bar fake */}
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-[#252526] bg-[#3c3c3c] px-3 text-[12px]">
        <span className="opacity-80">File</span>
        <span className="opacity-80">Edit</span>
        <span className="opacity-80">Selection</span>
        <span className="opacity-80">View</span>
        <span className="ml-auto truncate text-[11px] text-[#969696]">
          portfolio — {selectedPath ?? "—"}
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Activity bar */}
        <div className="flex w-12 shrink-0 flex-col items-center gap-4 border-r border-[#252526] bg-[#333333] py-3">
          <div
            className="flex h-10 w-10 items-center justify-center border-l-2 border-[#007fd4] bg-[#252526] text-[#cccccc]"
            title="Explorer"
          >
            <Folder className="h-5 w-5" />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex w-[220px] shrink-0 flex-col border-r border-[#252526] bg-[#252526]">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[#bbbbbb]">
            Explorer
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-2">
            <TreeRows
              node={tree}
              depth={0}
              expanded={expanded}
              toggle={toggle}
              selectedPath={selectedPath}
              onSelectFile={openFile}
            />
          </div>
        </aside>

        {/* Editor area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-9 shrink-0 overflow-x-auto border-b border-[#252526] bg-[#252526]">
            {openTabs.map((tab) => (
              <div
                key={tab}
                className={cn(
                  "flex max-w-[200px] shrink-0 items-stretch border-r border-[#1e1e1e] text-[12px]",
                  selectedPath === tab
                    ? "border-t-2 border-t-[#007fd4] bg-[#1e1e1e] text-[#cccccc]"
                    : "bg-[#2d2d2d] text-[#969696]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPath(tab)}
                  className="min-w-0 flex-1 truncate px-2 py-1.5 text-left hover:bg-[#2a2d2e]"
                >
                  {tab.split("/").pop()}
                </button>
                <button
                  type="button"
                  className="shrink-0 px-2 text-[14px] leading-none hover:bg-[#424242] hover:text-white"
                  aria-label={`Cerrar ${tab}`}
                  onClick={() => closeTab(tab)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div ref={editorWrapRef} className="min-h-0 flex-1">
            {selectedPath ? (
              <Editor
                height={editorHeight}
                path={selectedPath}
                language={lang}
                value={content}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: true },
                  fontSize: 13,
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  padding: { top: 8 },
                  automaticLayout: true,
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#969696]">
                Elegí un archivo en el explorador
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
