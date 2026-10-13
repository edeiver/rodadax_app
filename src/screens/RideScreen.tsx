import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import { RIDE_TRACKING_TASK } from '@/location/trackingTask';
import { useEffect } from 'react';

const RideScreen: React.FC = () => {
  const requestLocations = async () => {
    try {
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus === 'granted') {
        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus === 'granted') {
          await Location.startLocationUpdatesAsync(RIDE_TRACKING_TASK, {
            accuracy: Location.Accuracy.BestForNavigation,
            //ios no pausa en los semaforos
            pausesUpdatesAutomatically: false,
            activityType: Location.ActivityType.AutomotiveNavigation,
            timeInterval: 2000,
            distanceInterval: 5,
            foregroundService: {
              notificationTitle: 'Rastreo Activo',
              notificationBody: 'Tu ubicación se está optimizando en segundo plano.',
              notificationColor: '#1F5BFF',
            },
          });
        }
      }
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
    }
  };

  useEffect(() => {
    requestLocations();
  }, []);

  return (
    <View>
      <Text>Ride Screen</Text>
    </View>
  );
};

export default RideScreen;
