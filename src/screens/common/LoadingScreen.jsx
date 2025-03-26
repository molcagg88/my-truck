import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import colors from '../../config/colors';

function LoadingScreen({ message = 'Loading...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: colors.medium,
  },
});

export default LoadingScreen;
