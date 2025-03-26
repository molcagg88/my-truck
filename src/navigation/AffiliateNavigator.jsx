import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/affiliate/HomeScreen';
import ReferralsScreen from '../screens/affiliate/ReferralsScreen';
import ProfileScreen from '../screens/affiliate/ProfileScreen';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="AffiliateHome" 
      component={HomeScreen} 
      options={{ headerTitle: 'Home' }}
    />
    {/* Add other home-related screens here */}
  </Stack.Navigator>
);

const ReferralsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="AffiliateReferrals" 
      component={ReferralsScreen} 
      options={{ headerTitle: 'My Referrals' }}
    />
    {/* Add other referral-related screens here */}
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="AffiliateProfile" 
      component={ProfileScreen} 
      options={{ headerTitle: 'My Profile' }}
    />
    {/* Add other profile-related screens here */}
  </Stack.Navigator>
);

function AffiliateNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.affiliate,
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
        name="Referrals"
        component={ReferralsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={size} />
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

export default AffiliateNavigator;
