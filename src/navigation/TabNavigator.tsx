import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { TabParamsList } from './types';
import React from 'react';
import RideScreen from '../screens/RideScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CommunityScreen from '../screens/CommunityScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator<TabParamsList>();

const TabNavigator: React.FC = () => {
   return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <Tab.Screen name="Ride" component={RideScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
export default TabNavigator;