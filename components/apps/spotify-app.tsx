"use client";

import { useEffect, useRef, useState } from "react";
import { CirclePlay, ExternalLink } from "lucide-react";
import {
  spotifyPortfolioTracks,
  spotifyTrackPageUrl,
  spotifyTrackUri,
} from "@/lib/spotify-playlist";
import { SpotifyLogoIcon } from "@/components/icons/spotify-logo-icon";
import {
  getSpotifyIFrameApi,
  type SpotifyEmbedController,
} from "@/lib/spotify-iframe-api";
import { cn } from "@/lib/utils";

const embedPlaylistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID?.trim();

export function SpotifyApp() {
  const [previewTrackId, setPreviewTrackId] = useState<string | null>(null);
  const previewMountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);

  useEffect(() => {
    if (!previewTrackId) {
      controllerRef.current?.destroy?.();
      controllerRef.current = null;
      const el = previewMountRef.current;
      if (el) el.innerHTML = "";
      return;
    }

    const mount = previewMountRef.current;
    if (!mount) return;

    let cancelled = false;

    void (async () => {
      try {
        const IFrameAPI = await getSpotifyIFrameApi();
        if (cancelled || !previewMountRef.current) return;

        controllerRef.current?.destroy?.();
        controllerRef.current = null;
        previewMountRef.current.innerHTML = "";

        const width = Math.max(280, previewMountRef.current.offsetWidth || 320);

        IFrameAPI.createController(
          previewMountRef.current,
          {
            uri: spotifyTrackUri(previewTrackId),
            width,
            height: 152,
          },
          (EmbedController) => {
            if (cancelled) {
              EmbedController.destroy();
              return;
            }
            controllerRef.current = EmbedController;
            EmbedController.addListener("ready", () => {
              try {
                EmbedController.resume();
              } catch {
                try {
                  EmbedController.play();
                } catch {
                  /* política de autoplay */
                }
              }
            });
          }
        );
      } catch {
        /* sin red o script bloqueado */
      }
    })();

    return () => {
      cancelled = true;
      controllerRef.current?.destroy?.();
      controllerRef.current = null;
      if (previewMountRef.current) previewMountRef.current.innerHTML = "";
    };
  }, [previewTrackId]);

  return (
    <div className="flex h-full min-h-[320px] flex-col bg-[#121212] text-white">
      <header className="shrink-0 border-b border-white/10 bg-gradient-to-r from-[#1a472a] to-[#121212] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1DB954] shadow-lg shadow-black/40">
            <SpotifyLogoIcon className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold tracking-tight">Spotify</h2>
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {embedPlaylistId ? (
          <div className="border-b border-white/10 p-4">
            <iframe
              title="Playlist en Spotify"
              src={`https://open.spotify.com/embed/playlist/${embedPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg bg-black"
            />
          </div>
        ) : null}

        {previewTrackId ? (
          <div className="sticky top-0 z-10 border-b border-white/10 bg-[#121212] px-3 py-3">
            <div
              ref={previewMountRef}
              className="min-h-[152px] w-full overflow-hidden rounded-lg bg-black"
            />
          </div>
        ) : null}

        <ol className="divide-y divide-white/8 px-2 py-2">
          {spotifyPortfolioTracks.map((track, index) => {
            const trackUrl = spotifyTrackPageUrl(track.spotifyTrackId);
            const isPreview = previewTrackId === track.spotifyTrackId;
            return (
              <li key={track.spotifyTrackId}>
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-2 transition-colors",
                    isPreview ? "bg-white/10" : "hover:bg-white/8"
                  )}
                >
                  <span className="w-5 shrink-0 text-right text-sm tabular-nums text-white/45">
                    {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewTrackId(track.spotifyTrackId)}
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors",
                      "text-[#1DB954] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954]/70"
                    )}
                    aria-label={`Reproducir extracto de ${track.title}`}
                  >
                    <CirclePlay className="h-6 w-6" strokeWidth={1.75} />
                  </button>
                  <a
                    href={trackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 flex-1 rounded-md px-1 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954]/70"
                  >
                    <p className="truncate font-medium text-white">{track.title}</p>
                    <p className="truncate text-sm text-white/55">{track.artist}</p>
                  </a>
                  <a
                    href={trackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#1DB954] hover:bg-white/10"
                    aria-label={`Abrir ${track.title} en Spotify`}
                  >
                    <ExternalLink className="h-4 w-4 opacity-90" />
                  </a>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
