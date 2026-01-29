/**
 * Vendor Dashboard Screen
 * 
 * Main dashboard for VENDOR role users.
 * 
 * Future Features (Sprint 6+):
 * - Manage product inventory
 * - View orders from customers
 * - Update store information
 * - View sales analytics
 * - Manage delivery settings
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../../contexts/AuthContext';

type HomeStackParamList = {
  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;
};

type VendorDashboardScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export const VendorDashboardScreen = () => {
  const navigation = useNavigation<VendorDashboardScreenNavigationProp>();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vendor Dashboard 💼</Text>
        <Text style={styles.subtitle}>Welcome, {user?.name}!</Text>
        <Text style={styles.role}>Vendor Account</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📦 Product Inventory</Text>
          <Text style={styles.cardText}>
            Add, edit, and manage your products
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 6</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🛒 Incoming Orders</Text>
          <Text style={styles.cardText}>
            View and process customer orders
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 6</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Sales Analytics</Text>
          <Text style={styles.cardText}>
            Track your sales and revenue
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 7</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏪 Store Settings</Text>
          <Text style={styles.cardText}>
            Update store info and business hours
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 6</Text>
        </View>

        <TouchableOpacity 
          style={styles.profileCard}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.cardTitle}>👤 My Profile</Text>
          <Text style={styles.cardText}>
            View and edit your profile information
          </Text>
          <Text style={styles.availableNow}>Available Now →</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          GLAMGO Vendor Portal 🌟
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2E7D32',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#C9A961',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  profileCard: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  comingSoon: {
    fontSize: 14,
    color: '#C9A961',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  availableNow: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  },
});
