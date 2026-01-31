import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAddress } from '../../../../contexts/AddressContext';

export const AddressListScreen: React.FC = () => {
  const navigation = useNavigation();
  const { addresses, defaultAddress, loading, error, deleteAddress, setDefault } = useAddress();

  const handleDelete = (addressId: string, label: string) => {
    Alert.alert(
      'Delete Address',
      `Are you sure you want to delete "${label}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteAddress(addressId),
        },
      ]
    );
  };

  const handleSetDefault = (addressId: string) => {
    setDefault(addressId);
  };

  const renderAddress = ({ item }: { item: any }) => {
    const isDefault = defaultAddress?.id === item.id;

    return (
      <View style={styles.addressCard}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressLabel}>{item.label}</Text>
          {isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>DEFAULT</Text>
            </View>
          )}
        </View>

        <Text style={styles.addressText}>
          {item.street}
        </Text>
        <Text style={styles.addressText}>
          {item.city}, {item.state} {item.zipCode}
        </Text>

        <View style={styles.actionsRow}>
          {!isDefault && (
            <TouchableOpacity
              style={styles.setDefaultButton}
              onPress={() => handleSetDefault(item.id)}
            >
              <Text style={styles.setDefaultText}>⭐ Set as Default</Text>
            </TouchableOpacity>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => (navigation as any).navigate('EditAddress', { addressId: item.id })}
            >
              <Text style={styles.iconText}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleDelete(item.id, item.label)}
            >
              <Text style={styles.iconText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📍</Text>
      <Text style={styles.emptyTitle}>No Addresses Yet</Text>
      <Text style={styles.emptySubtitle}>
        Add a delivery address to complete your orders
      </Text>
      <TouchableOpacity
        style={styles.addButtonLarge}
        onPress={() => (navigation as any).navigate('AddAddress')}
      >
        <Text style={styles.addButtonLargeText}>Add Your First Address</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading && addresses.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading addresses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {addresses.length > 0 && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => (navigation as any).navigate('AddAddress')}
        >
          <Text style={styles.addButtonIcon}>➕</Text>
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={renderAddress}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={addresses.length === 0 ? styles.emptyContainer : styles.listContent}
        refreshing={loading}
        onRefresh={() => {
          // Addresses auto-refresh via context
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorBanner: {
    backgroundColor: '#FF3B30',
    padding: 12,
    alignItems: 'center',
  },
  errorText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  addButtonLarge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  addButtonLargeText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addressCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  defaultBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  addressText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  setDefaultButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F7FF',
  },
  setDefaultText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  iconText: {
    fontSize: 20,
  },
});
