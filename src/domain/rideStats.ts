import { distanceInMeters } from './geo';
import { isAccurateEnough, isPlausibleMovement } from './trackPoint';
import type { TrackPoint } from './types';

export const totalDistanceMeters = (points: TrackPoint[]): number => {
  let totalMeters = 0;
  for (let index = 1; index < points.length; index++) {
    const current = points[index];
    const previous = points[index - 1];
    if (current !== undefined && previous !== undefined) {
      totalMeters += distanceInMeters(previous, current);
    }
  }
  return totalMeters;
};

export const filterValidPoints = (points: TrackPoint[]): TrackPoint[] => {
  const result: TrackPoint[] = [];

  for (const point of points) {
    if (isAccurateEnough(point)) {
      const lastAccepted = result[result.length - 1];
      if (lastAccepted === undefined || isPlausibleMovement(lastAccepted, point)) {
        result.push(point);
      }
    }
  }
  return result;
};
