import type { RideAction, RideSession } from './types';

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
