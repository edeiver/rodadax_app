import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export const RIDE_TRACKING_TASK = 'ride-tracking';

// Qué datos recibe la tarea: un arreglo de ubicaciones.
type LocationObj = {
  locations: Location.LocationObject[];
};

// "Cuando lleguen ubicaciones a 'ride-tracking', ejecuta esta función"
TaskManager.defineTask<LocationObj>(RIDE_TRACKING_TASK, async ({ data, error }) => {
  // TODO 1: si hay error, haz console.log del error y sal con return
  if (error) {
    console.log('Error', error);
    return;
  }
  data.locations.forEach((element) => {
    console.log(element.coords.latitude);
    console.log(element.coords.longitude);
    console.log(element.coords.speed);
  });
  // TODO 2: recorre data.locations y haz console.log de cada punto:
  //         su latitud, longitud y velocidad (están dentro de location.coords)
});
