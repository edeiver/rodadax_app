import { isAccurateEnough, normalizeSpeed } from '@/domain/trackPoint';
import type { TrackPoint } from '@/domain/types';

const makePoint = (overrides: Partial<TrackPoint> = {}): TrackPoint => ({
  latitude: 10.96,
  longitude: -74.78,
  altitude: 20,
  accuracy: 5,
  speed: 10,
  timestamp: 0,
  ...overrides,
});
describe('normalizeSpeed', () => {
  it('returns null for negative speed', () => {
    expect(normalizeSpeed(-1)).toBeNull();
  });

  it('keeps 0 when the vehicle is stopped', () => {
    expect(normalizeSpeed(0)).toBe(0);
  });

  it('returns null for null', () => {
    expect(normalizeSpeed(null)).toBeNull();
  });
  it('returns the same speed when it is valid', () => {
    expect(normalizeSpeed(12.5)).toBe(12.5);
  });
});

describe('isAccurateEnough', () => {
  it('accepts a point with good accuracy', () => {
    expect(isAccurateEnough(makePoint({ accuracy: 5 }))).toBe(true);
  });
  it('rejects a point with poor accuracy', () => {
    expect(isAccurateEnough(makePoint({ accuracy: 80 }))).toBe(false);
  });
  it('rejects a point without accuracy', () => {
    expect(isAccurateEnough(makePoint({ accuracy: null }))).toBe(false);
  });
  it('accepts a point exactly at the limit', () => {
    expect(isAccurateEnough(makePoint({ accuracy: 20 }))).toBe(true);
  });
});
