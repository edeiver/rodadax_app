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
export type RideAction = 'start' | 'pause' | 'resume' | 'stop';

export type IdleSession = { status: 'idle' };

export type TrackingSession = {
  status: 'tracking';
  /** Identificador único de la rodada en curso. */
  rideId: string;
  /** Momento en que empezó la rodada, en milisegundos desde 1970 (como Date.now()). */
  startedAt: number;
};

export type PausedSession = {
  status: 'paused';
  /** Identificador único de la rodada en curso. */
  rideId: string;
  /** Momento en que empezó la rodada, en milisegundos desde 1970 (como Date.now()). */
  startedAt: number;
  /** Momento en que se pausó, en milisegundos desde 1970 (como Date.now()). */
  pausedAt: number;
};
export type RideSession = IdleSession | TrackingSession | PausedSession;
