import type { TrackPoint } from './types';

const DEFAULT_MAX_ACCURACY_METERS = 20;

export const normalizeSpeed = (speed: number | null): number | null => {
  if (speed === null || speed < 0) {
    return null;
  }
  return speed;
};

export const isAccurateEnough = (
  point: TrackPoint,
  maxAccuracyMeters = DEFAULT_MAX_ACCURACY_METERS,
): boolean => {
  if (point.accuracy === null) {
    return false;
  }
  return point.accuracy <= maxAccuracyMeters;
};
