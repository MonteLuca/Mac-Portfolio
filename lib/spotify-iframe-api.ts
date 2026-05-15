/**
 * Spotify iFrame API (https://open.spotify.com/embed/iframe-api/v1)
 * Permite llamar a `play()` tras `ready`, evitando el segundo clic en el widget en muchos navegadores.
 */

export type SpotifyEmbedController = {
  play: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  loadUri: (uri: string, preferVideo?: boolean, startAt?: number, theme?: string) => void;
  destroy: () => void;
  addListener: (event: "ready" | string, handler: (e?: unknown) => void) => void;
};

export type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: number | string; height?: number | string },
    callback: (controller: SpotifyEmbedController) => void
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
  }
}

const SCRIPT_SELECTOR = 'script[data-spotify-iframe-api="1"]';

let cachedApi: SpotifyIFrameAPI | null = null;
let apiPromise: Promise<SpotifyIFrameAPI> | null = null;

export function getSpotifyIFrameApi(): Promise<SpotifyIFrameAPI> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Spotify iFrame API solo en cliente"));
  }
  if (cachedApi) return Promise.resolve(cachedApi);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
      if (typeof previous === "function") {
        try {
          previous(IFrameAPI);
        } catch {
          /* noop */
        }
      }
      cachedApi = IFrameAPI;
      resolve(IFrameAPI);
    };

    if (!document.querySelector(SCRIPT_SELECTOR)) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.dataset.spotifyIframeApi = "1";
      document.body.appendChild(script);
    }
  });

  return apiPromise;
}
