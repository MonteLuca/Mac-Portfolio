/**
 * Lista de temas del portfolio (Spotify track IDs para embed / enlaces).
 */

export interface SpotifyQueueTrack {
  title: string;
  artist: string;
  /** Texto de respaldo para buscar en Spotify. */
  spotifySearch: string;
  /** ID del track en open.spotify.com/track/&lt;id&gt; */
  spotifyTrackId: string;
}

export const spotifyPortfolioTracks: SpotifyQueueTrack[] = [
  {
    title: "The Winner Takes It All",
    artist: "ABBA",
    spotifySearch: "The Winner Takes It All ABBA",
    spotifyTrackId: "3oEkrIfXfSh9zGnE7eBzSV",
  },
  {
    title: "Flaca",
    artist: "Andrés Calamaro",
    spotifySearch: "Flaca Andrés Calamaro",
    spotifyTrackId: "1p7m9H4H8s0Y7SgRm7j3ED",
  },
  {
    title: "Somewhere I Belong",
    artist: "Linkin Park",
    spotifySearch: "Somewhere I Belong Linkin Park",
    spotifyTrackId: "3fjmSxt0PskST13CSdBUFx",
  },
  {
    title: "Tormento",
    artist: "Babasónicos",
    spotifySearch: "Tormento Babasónicos",
    spotifyTrackId: "1RQm3L3dkYbEJDmgJEOG71",
  },
  {
    title: "I Can't Go for That (No Can Do)",
    artist: "Daryl Hall & John Oates",
    spotifySearch: "I Can't Go for That Hall Oates",
    spotifyTrackId: "41dDygR3r7e926oGUXfrLt",
  },
  {
    title: "Rollin'",
    artist: "Limp Bizkit",
    spotifySearch: "Rollin' Limp Bizkit",
    spotifyTrackId: "3IV4swNduIRunHREK80owz",
  },
  {
    title: "Starlight",
    artist: "Muse",
    spotifySearch: "Starlight Muse",
    spotifyTrackId: "3skn2lauGk7Dx6bVIt5DVj",
  },
  {
    title: "Nunca quise",
    artist: "Intoxicados",
    spotifySearch: "Nunca quise Intoxicados",
    spotifyTrackId: "0ZAJ660VP57lLK4U7NlGOy",
  },
  {
    title: "Bad",
    artist: "Michael Jackson",
    spotifySearch: "Bad Michael Jackson",
    spotifyTrackId: "62XEAqAgVueNQJROn5F4kk",
  },
  {
    title: "Fluorescent Adolescent",
    artist: "Arctic Monkeys",
    spotifySearch: "Fluorescent Adolescent Arctic Monkeys",
    spotifyTrackId: "2x8evxqUlF0eRabbW2JBJd",
  },
  {
    title: "This Ain't a Scene, It's an Arms Race",
    artist: "Fall Out Boy",
    spotifySearch: "This Ain't a Scene It's an Arms Race Fall Out Boy",
    spotifyTrackId: "1Aec2rbvd4fEP9iuDIVeOE",
  },
];

export function spotifyOpenSearchUrl(query: string): string {
  return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
}

export function spotifyTrackPageUrl(trackId: string): string {
  return `https://open.spotify.com/track/${trackId}`;
}

export function spotifyTrackUri(trackId: string): string {
  return `spotify:track:${trackId}`;
}
