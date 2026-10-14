import type { PausedSession, RideAction, RideSession, TrackingSession, IdleSession } from './types';

export const availableActions = (session: RideSession): RideAction[] => {
  switch (session.status) {
    case 'idle':
      return ['start'];
    case 'tracking':
      return ['pause', 'stop'];
    case 'paused':
      return ['resume', 'stop'];
    default: {
      const unhandledState: never = session;
      return unhandledState;
    }
  }
};

export const startRide = (rideId: string, now: number): TrackingSession => {
  return {
    status: 'tracking',
    rideId,
    startedAt: now,
  };
};

export const pauseRide = (session: TrackingSession, now: number): PausedSession => {
  return {
    status: 'paused',
    rideId: session.rideId,
    startedAt: session.startedAt,
    pausedAt: now,
  };
};
export const resumeRide = (session: PausedSession): TrackingSession => {
  return {
    status: 'tracking',
    rideId: session.rideId,
    startedAt: session.startedAt,
  };
};
export const stopRide = (_session: TrackingSession | PausedSession): IdleSession => {
  return {
    status: 'idle',
  };
};
