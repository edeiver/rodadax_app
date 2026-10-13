import * as Location from 'expo-location';

// Qué datos recibe la tarea: un arreglo de ubicaciones.
export type LocationObj = {
  locations: Location.LocationObject[];
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

type moreCoordinates = {
  altitude: number | null;
  accuracy: number | null;
  speed: number | null;
  timestamp: number;
};

export type fullCoordinates = Coordinates & moreCoordinates;
