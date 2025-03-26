import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/driver/HomeScreen';
import JobsScreen from '../screens/driver/JobsScreen';
import ProfileScreen from '../screens/driver/ProfileScreen';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DriverHome" 
      component={HomeScreen} 
      options={{ headerTitle: 'Home' }}
    />
    {/* Add other home-related screens here */}
  </Stack.Navigator>
);

const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DriverJobs" 
      component={JobsScreen} 
      options={{ headerTitle: 'My Jobs' }}
    />
    {/* Add other job-related screens here */}
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="DriverProfile" 
      component={ProfileScreen} 
      options={{ headerTitle: 'My Profile' }}
    />
    {/* Add other profile-related screens here */}
  </Stack.Navigator>
);

function DriverNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.driver,
        tabBarInactiveTintColor: colors.medium,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default DriverNavigator;
