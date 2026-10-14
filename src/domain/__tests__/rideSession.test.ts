import { availableActions, pauseRide, resumeRide, startRide, stopRide } from '@/domain/rideSession';
import type { PausedSession, RideSession, TrackingSession } from '@/domain/types';

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

describe('startRide', () => {
  it('creates a tracking session with the rideId and start time', () => {
    const result = startRide('ride-1', 1000);

    expect(result).toEqual({
      status: 'tracking',
      rideId: 'ride-1',
      startedAt: 1000,
    });
  });
});

describe('pauseRide', () => {
  it('moves from tracking to paused and records the pause time', () => {
    // Arrange: input session
    const tracking: TrackingSession = {
      status: 'tracking',
      rideId: 'ride-1',
      startedAt: 0,
    };

    // Act
    const result = pauseRide(tracking, 60_000);

    // Assert: expected session
    expect(result).toEqual({
      status: 'paused',
      rideId: 'ride-1',
      startedAt: 0,
      pausedAt: 60_000,
    });
  });

  it('does not accept an idle session (type check)', () => {
    const idle: RideSession = { status: 'idle' };
    // @ts-expect-error pauseRide only accepts a TrackingSession
    pauseRide(idle, 1000);
  });
});

describe('resumeRide', () => {
  it('goes back to tracking keeping rideId and startedAt, without pausedAt', () => {
    const paused: PausedSession = {
      status: 'paused',
      rideId: 'ride-1',
      startedAt: 0,
      pausedAt: 60_000,
    };

    const result = resumeRide(paused);

    expect(result).toEqual({
      status: 'tracking',
      rideId: 'ride-1',
      startedAt: 0,
    });
  });
});

describe('stopRide', () => {
  it('stops a ride that is tracking', () => {
    const tracking: TrackingSession = {
      status: 'tracking',
      rideId: 'ride-1',
      startedAt: 0,
    };

    expect(stopRide(tracking)).toEqual({ status: 'idle' });
  });

  it('stops a ride that is paused', () => {
    const paused: PausedSession = {
      status: 'paused',
      rideId: 'ride-1',
      startedAt: 0,
      pausedAt: 60_000,
    };

    expect(stopRide(paused)).toEqual({ status: 'idle' });
  });
});
