import { distanceInMeters } from './geo';
import type { TrackPoint } from './types';

const DEFAULT_MAX_ACCURACY_METERS = 20;
const DEFAULT_MAX_SPEED_METERS_PER_SECOND = 70;

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

export const isPlausibleMovement = (
  previous: TrackPoint,
  current: TrackPoint,
  maxSpeed = DEFAULT_MAX_SPEED_METERS_PER_SECOND,
): boolean => {
  const timeInSeconds = (current.timestamp - previous.timestamp) / 1000;
  if (timeInSeconds <= 0) {
    return false;
  }
  const distance = distanceInMeters(previous, current);
  const impliedSpeed = distance / timeInSeconds;

  return impliedSpeed <= maxSpeed;
};
