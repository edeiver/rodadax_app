import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import React from 'react';
import TabNavigator from './TabNavigator';
import ActiveRideScreen from '../screens/ActiveRideScreen';
import RideDetailScreen from '../screens/RideDetailScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PermissionsScreen from '../screens/PermissionsScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- requerido para registrar el RootNavigator
  interface RootNavigator extends RootStackType {}
}

const AppNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Tabs" component={TabNavigator} />
      <RootStack.Screen
        name="ActiveRide"
        options={{
          presentation: 'fullScreenModal',
        }}
        component={ActiveRideScreen}
      />
      <RootStack.Screen name="RideDetail" component={RideDetailScreen} />
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
      <RootStack.Screen name="Permissions" component={PermissionsScreen} />
    </RootStack.Navigator>
  );
};

export default AppNavigator;
