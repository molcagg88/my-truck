import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../config/colors';

const TOAST_DURATION = 3000; // 3 seconds

function Toast({ visible, message, type = 'info', onDismiss }) {
  const [animation] = useState(new Animated.Value(0));
  
  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Auto dismiss after duration
      const timer = setTimeout(() => {
        handleDismiss();
      }, TOAST_DURATION);
      
      return () => clearTimeout(timer);
    } else {
      // Animate out
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);
  
  const handleDismiss = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onDismiss) onDismiss();
    });
  };
  
  // Get icon and background color based on type
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.success,
          icon: 'check-circle',
        };
      case 'error':
        return {
          backgroundColor: colors.danger,
          icon: 'alert-circle',
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          icon: 'alert',
        };
      default:
        return {
          backgroundColor: colors.info,
          icon: 'information',
        };
    }
  };
  
  const toastStyles = getToastStyles();
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: toastStyles.backgroundColor,
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons
          name={toastStyles.icon}
          size={24}
          color={colors.white}
          style={styles.icon}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
      <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
        <MaterialCommunityIcons name="close" size={20} color={colors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  message: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  closeButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default Toast;
