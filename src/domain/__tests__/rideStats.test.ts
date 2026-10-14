import type { TrackPoint } from '@/domain/types';
import { totalDistanceMeters } from '@/domain/rideStats';
import { distanceInMeters } from '@/domain/geo';

const makePoint = (overrides: Partial<TrackPoint> = {}): TrackPoint => ({
  latitude: 10.96,
  longitude: -74.78,
  altitude: 20,
  accuracy: 5,
  speed: 10,
  timestamp: 0,
  ...overrides,
});

describe('totalDistanceMeters', () => {
  it('returns 0 for an empty list', () => {
    expect(totalDistanceMeters([])).toBe(0);
  });
  it('returns 0 for a single point', () => {
    const points = [makePoint({ latitude: 0 })];
    expect(totalDistanceMeters(points)).toBe(0);
  });
  it('sums the distance between consecutive points', () => {
    const first = makePoint({ latitude: 10.96 });
    const second = makePoint({ latitude: 11.0 });
    const third = makePoint({ latitude: 11.9 });
    const points = [first, second, third];
    const expected = distanceInMeters(first, second) + distanceInMeters(second, third);
    const result = totalDistanceMeters(points);

    expect(result).toBeCloseTo(expected);
  });
});
