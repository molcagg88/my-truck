import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';

function LogoutButton({ style }) {
  const [visible, setVisible] = React.useState(false);
  const { logout } = useAuth();

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLogout = async () => {
    hideDialog();
    await logout();
  };

  return (
    <>
      <Button 
        mode="outlined" 
        onPress={showDialog} 
        style={[styles.button, style]}
      >
        Logout
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to logout?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleLogout}>Logout</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
});

export default LogoutButton;
