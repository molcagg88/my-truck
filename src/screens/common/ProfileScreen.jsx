import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Avatar, Divider, List } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import LogoutButton from '../../components/common/LogoutButton';
import colors from '../../config/colors';

function ProfileScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        {user.profileImageUrl ? (
          <Avatar.Image 
            size={100} 
            source={{ uri: user.profileImageUrl }} 
            style={styles.avatar}
          />
        ) : (
          <Avatar.Icon 
            size={100} 
            icon="account" 
            style={styles.avatar}
            color={colors.white}
          />
        )}
        <Text style={styles.name}>{user.name || 'User'}</Text>
        <Text style={styles.phone}>{user.phoneNumber}</Text>
        <Text style={styles.userType}>
          {user.userType === 'customer' ? 'Customer' : 
           user.userType === 'driver' ? 'Truck Owner/Driver' : 'Affiliate'}
        </Text>
      </View>

      <Divider />

      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Edit Profile"
          left={props => <List.Icon {...props} icon="account-edit" />}
          onPress={() => {/* Navigate to edit profile */}}
        />
        <List.Item
          title="Notifications"
          left={props => <List.Icon {...props} icon="bell" />}
          onPress={() => {/* Navigate to notifications */}}
        />
        <List.Item
          title="Privacy & Security"
          left={props => <List.Icon {...props} icon="shield-account" />}
          onPress={() => {/* Navigate to privacy settings */}}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Support</List.Subheader>
        <List.Item
          title="Help Center"
          left={props => <List.Icon {...props} icon="help-circle" />}
          onPress={() => {/* Navigate to help center */}}
        />
        <List.Item
          title="Contact Us"
          left={props => <List.Icon {...props} icon="email" />}
          onPress={() => {/* Navigate to contact us */}}
        />
        <List.Item
          title="About"
          left={props => <List.Icon {...props} icon="information" />}
          onPress={() => {/* Navigate to about */}}
        />
      </List.Section>

      <View style={styles.logoutContainer}>
        <LogoutButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  phone: {
    fontSize: 16,
    color: colors.medium,
    marginVertical: 5,
  },
  userType: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  logoutContainer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default ProfileScreen;
