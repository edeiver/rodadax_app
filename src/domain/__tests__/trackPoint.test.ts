import { normalizeSpeed } from '@/domain/trackPoint';

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
