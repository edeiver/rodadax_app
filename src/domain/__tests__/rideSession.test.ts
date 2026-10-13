import { availableActions } from '@/domain/rideSession';
import type { RideSession } from '@/domain/types';

describe('availableActions', () => {
  it('only allows starting when idle', () => {
    const session: RideSession = { status: 'idle' };

    expect(availableActions(session)).toEqual(['start']);
  });

  it('allows pause and stop when tracking', () => {
    const session: RideSession = {
      status: 'tracking',
      rideId: 'ride-1',
      startedAt: 0,
    };
    expect(availableActions(session)).toEqual(['pause', 'stop']);
  });

  it('allows resume and stop when paused', () => {
    const session: RideSession = {
      status: 'paused',
      rideId: 'ride-2',
      startedAt: 1,
      pausedAt: 60_000,
    };
    expect(availableActions(session)).toEqual(['resume', 'stop']);
  });
});
