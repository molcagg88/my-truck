import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import colors from '../../config/colors';

function UserTypeScreen() {
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(false);
  const { completeUserProfile } = useAuth();
  const { showToast } = useToast();

  const userTypes = [
    {
      id: 'customer',
      title: 'Customer',
      description: 'I want to ship goods and find truck owners',
      icon: 'account',
      color: colors.customer,
    },
    {
      id: 'driver',
      title: 'Truck Owner/Driver',
      description: 'I own a truck and want to find shipping jobs',
      icon: 'truck',
      color: colors.driver,
    },
    {
      id: 'affiliate',
      title: 'Affiliate',
      description: 'I want to refer customers and drivers to earn commission',
      icon: 'account-group',
      color: colors.affiliate,
    },
  ];

  const handleContinue = async () => {
    if (!selectedType) {
      showToast('Please select a user type', 'warning');
      return;
    }

    setLoading(true);
    try {
      const success = await completeUserProfile(selectedType, {
        // Basic profile data
        name: '',
        email: '',
        createdAt: new Date(),
      });

      if (success) {
        showToast('Profile created successfully', 'success');
      } else {
        showToast('Failed to create profile', 'error');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select how you want to use the app. You can change this later in settings.
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {userTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.optionCard,
              selectedType === type.id && { borderColor: type.color, borderWidth: 2 },
            ]}
            onPress={() => setSelectedType(type.id)}
          >
            <View style={[styles.iconContainer, { backgroundColor: type.color }]}>
              <MaterialCommunityIcons name={type.icon} size={30} color={colors.white} />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{type.title}</Text>
              <Text style={styles.optionDescription}>{type.description}</Text>
            </View>
            {selectedType === type.id && (
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color={type.color}
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Button
        mode="contained"
        onPress={handleContinue}
        style={[
          styles.button,
          selectedType && { backgroundColor: userTypes.find(t => t.id === selectedType)?.color },
        ]}
        contentStyle={styles.buttonContent}
        loading={loading}
        disabled={!selectedType || loading}
      >
        Continue
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.medium,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.light,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.medium,
  },
  checkIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonContent: {
    height: 50,
  },
});

export default UserTypeScreen;
