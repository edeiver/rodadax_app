import { distanceInMeters } from '@/domain/geo';

describe('distanceInMeters', () => {
  it('returns 0 for the same point', () => {
    // 1. Preparar
    const barranquilla = { latitude: 10.96, longitude: -74.78 };

    // 2. Ejecutar
    const distance = distanceInMeters(barranquilla, barranquilla);

    // 3. Comprobar
    expect(distance).toBe(0);
  });
  it('returns about 111 km for one degree of latitude', () => {
    // 1. Preparar
    const pointA = { latitude: 10, longitude: -74 };
    const pointB = { latitude: 11, longitude: -74 };

    // 2. Ejecutar
    const distance = distanceInMeters(pointA, pointB);

    // 3. Comprobar
    expect(distance).toBeCloseTo(111_195, -1);
  });
  it('returns about 111 km for one degree of longitude at the equator', () => {
    // 1. Preparar
    const pointA = { latitude: 0, longitude: 0 };
    const pointB = { latitude: 0, longitude: 1 };

    // 2. Ejecutar
    const distance = distanceInMeters(pointA, pointB);

    // 3. Comprobar
    expect(distance).toBeCloseTo(111_195, -1);
  });
  it('is symmetric', () => {
    // 1. Preparar
    const pointA = { latitude: 0, longitude: 0 };
    const pointB = { latitude: 0, longitude: 1 };

    // 2. Ejecutar
    const distanceAB = distanceInMeters(pointA, pointB);
    const distanceBA = distanceInMeters(pointB, pointA);

    // 3. Comprobar
    expect(distanceAB).toBe(distanceBA);
  });
});
