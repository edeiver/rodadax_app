import type { TrackPoint } from '@/domain/types';
import { distanceInMeters } from '@/domain/geo';
import { filterValidPoints, totalDistanceMeters } from '@/domain/rideStats';

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

describe('filterValidPoints', () => {
  it('returns an empty list when there are no points', () => {
    expect(filterValidPoints([])).toEqual([]);
  });

  it('drops points with poor accuracy', () => {
    const first = makePoint({ latitude: 10.96, timestamp: 0 });
    const inaccurate = makePoint({ latitude: 10.9601, accuracy: 80, timestamp: 1000 });
    const third = makePoint({ latitude: 10.9602, timestamp: 2000 });

    expect(filterValidPoints([first, inaccurate, third])).toEqual([first, third]);
  });

  it('drops an impossible jump', () => {
    const first = makePoint({ latitude: 10.96, timestamp: 0 });
    const jump = makePoint({ latitude: 10.5, timestamp: 1000 });

    expect(filterValidPoints([first, jump])).toEqual([first]);
  });

  it('keeps a valid point that comes after a jump', () => {
    const first = makePoint({ latitude: 10.96, timestamp: 0 });
    const jump = makePoint({ latitude: 10.5, timestamp: 1000 });
    const third = makePoint({ latitude: 10.9601, timestamp: 2000 });

    expect(filterValidPoints([first, jump, third])).toEqual([first, third]);
  });
});
