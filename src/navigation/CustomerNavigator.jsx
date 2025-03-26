import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/customer/HomeScreen';
import OrdersScreen from '../screens/customer/OrdersScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CustomerHome" 
      component={HomeScreen} 
      options={{ headerTitle: 'Home' }}
    />
    {/* Add other home-related screens here */}
  </Stack.Navigator>
);

const OrdersStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CustomerOrders" 
      component={OrdersScreen} 
      options={{ headerTitle: 'My Orders' }}
    />
    {/* Add other order-related screens here */}
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CustomerProfile" 
      component={ProfileScreen} 
      options={{ headerTitle: 'My Profile' }}
    />
    {/* Add other profile-related screens here */}
  </Stack.Navigator>
);

function CustomerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.customer,
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
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="truck-delivery" color={color} size={size} />
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

export default CustomerNavigator;
