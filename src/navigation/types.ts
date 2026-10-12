import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamsList>;
  ActiveRide: undefined;
  RideDetail: { rideId: string };
  Welcome: undefined;
  Permissions: undefined;
};
export type TabParamsList = {
  Ride: undefined;
  History: undefined;
  Community: undefined;
  Settings: undefined;
};
