export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type TrackPoint = Coordinates & {
  /** Altitud en metros sobre el nivel del mar; null si el GPS no la conoce. */
  altitude: number | null;
  /** Radio de error horizontal en metros (menor = más preciso); null si el GPS no lo reporta. */
  accuracy: number | null;
  /** Velocidad en metros por segundo; null si el GPS no la conoce. */
  speed: number | null;
  /** Momento de la lectura en milisegundos desde 1970 (como Date.now()). */
  timestamp: number;
};
