import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../../config/colors';

function OrdersScreen({ navigation }) {
  // Placeholder data
  const orders = [];

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Orders Yet</Text>
      <Text style={styles.emptyStateDescription}>
        When you create shipments, they will appear here
      </Text>
      <Button
        mode="contained"
        style={styles.createButton}
        onPress={() => navigation.navigate('Home')}
      >
        Create a Shipment
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    flexGrow: 1,
    padding: 20,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: colors.medium,
    textAlign: 'center',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: colors.customer,
  },
});

export default OrdersScreen;
