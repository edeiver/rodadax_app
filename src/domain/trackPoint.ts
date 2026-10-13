export const normalizeSpeed = (speed: number | null): number | null => {
  if (speed === null || speed < 0) {
    return null;
  }
  return speed;
};
