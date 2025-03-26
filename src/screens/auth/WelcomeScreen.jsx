import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../../config/colors';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          style={styles.logo} 
          source={require('../../../assets/icon.png')} 
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Your Logistics Solution</Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button 
          mode="contained" 
          style={styles.button}
          contentStyle={styles.buttonContent}
          onPress={() => navigation.navigate('Login')}
        >
          Get Started
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  tagline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: colors.primary,
  },
  buttonsContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonContent: {
    height: 50,
  },
});

export default WelcomeScreen;
