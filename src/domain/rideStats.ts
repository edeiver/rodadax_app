import { distanceInMeters } from './geo';
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
