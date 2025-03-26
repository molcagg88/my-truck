import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { TextInput, Button, Text, HelperText, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import useAuth from '../../hooks/useAuth';
import colors from '../../config/colors';

function ProfileSetupScreen() {
  const { user, completeUserProfile } = useAuth();
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    
    if (!result.cancelled && result.assets && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // If there's a profile image, we would upload it to Firebase Storage here
      // For now, we'll just save the name
      const success = await completeUserProfile(user.userType, {
        name,
        profileImageUrl: profileImage, // In a real app, this would be the URL after upload
        isProfileComplete: true,
      });

      if (!success) {
        setError('Failed to save profile. Please try again.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Add your details to get started with My Truck
          </Text>
        </View>

        <View style={styles.imageContainer}>
          {profileImage ? (
            <Avatar.Image
              size={120}
              source={{ uri: profileImage }}
              style={styles.avatar}
            />
          ) : (
            <Avatar.Icon
              size={120}
              icon="account"
              style={styles.avatar}
              color={colors.white}
            />
          )}
          <Button
            mode="text"
            onPress={pickImage}
            style={styles.imageButton}
          >
            {profileImage ? 'Change Photo' : 'Add Photo'}
          </Button>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            error={!!error}
          />
          
          {error ? <HelperText type="error">{error}</HelperText> : null}
          
          <Button
            mode="contained"
            onPress={handleSaveProfile}
            style={styles.button}
            contentStyle={styles.buttonContent}
            loading={loading}
            disabled={loading}
          >
            Save Profile
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    backgroundColor: colors.primary,
  },
  imageButton: {
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 15,
    backgroundColor: colors.white,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonContent: {
    height: 50,
  },
});

export default ProfileSetupScreen;
