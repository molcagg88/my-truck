import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuth from '../hooks/useAuth';
import LoginScreen from '../screens/auth/LoginScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import UserTypeScreen from '../screens/auth/UserTypeScreen';
import CustomerNavigator from './CustomerNavigator';
import DriverNavigator from './DriverNavigator';
import AffiliateNavigator from './AffiliateNavigator';
import LoadingScreen from '../screens/common/LoadingScreen';

import colors from '../config/colors';

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          user.isNewUser ? (
            // New user flow
            <Stack.Screen name="UserType" component={UserTypeScreen} />
          ) : (
            // Logged in user flow based on user type
            user.userType === 'customer' ? (
              <Stack.Screen name="CustomerApp" component={CustomerNavigator} />
            ) : user.userType === 'driver' ? (
              <Stack.Screen name="DriverApp" component={DriverNavigator} />
            ) : (
              <Stack.Screen name="AffiliateApp" component={AffiliateNavigator} />
            )
          )
        ) : (
          // Auth flow
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
