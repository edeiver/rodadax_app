import { Coordinates } from './types';

const EARTH_RADIUS_METERS = 6_371_000;
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
export const distanceInMeters = (from: Coordinates, to: Coordinates): number => {
  const fromLatitudeRad = toRadians(from.latitude);
  const toLatitudeRad = toRadians(to.latitude);
  const fromLongitudeRad = toRadians(from.longitude);
  const toLongitudeRad = toRadians(to.longitude);

  const deltaLatitudeRad = toLatitudeRad - fromLatitudeRad;
  const deltaLongitudeRad = toLongitudeRad - fromLongitudeRad;

  //math form Haversine a = sin²(Δlatitud / 2) + cos(latitud de from) × cos(latitud de to) × sin²(Δlongitud / 2)

  const a =
    Math.sin(deltaLatitudeRad / 2) ** 2 +
    Math.cos(fromLatitudeRad) * Math.cos(toLatitudeRad) * Math.sin(deltaLongitudeRad / 2) ** 2;

  const centralAngleRad = 2 * Math.asin(Math.sqrt(a));
  const distance = centralAngleRad * EARTH_RADIUS_METERS;
  return distance;
};
