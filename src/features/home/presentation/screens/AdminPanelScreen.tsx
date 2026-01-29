/**
 * Admin Panel Screen
 * 
 * Main dashboard for ADMIN role users.
 * 
 * Future Features (Sprint 9+):
 * - User management
 * - Vendor approval/verification
 * - Driver approval/verification
 * - System analytics
 * - Platform settings
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

type AdminPanelScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export const AdminPanelScreen = () => {
  const navigation = useNavigation<AdminPanelScreenNavigationProp>();
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
        <Text style={styles.title}>Admin Panel ⚙️</Text>
        <Text style={styles.subtitle}>Welcome, {user?.name}!</Text>
        <Text style={styles.role}>Administrator Account</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👥 User Management</Text>
          <Text style={styles.cardText}>
            Manage customers, vendors, and drivers
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 9</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Vendor Approvals</Text>
          <Text style={styles.cardText}>
            Review and approve vendor applications
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 9</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🚗 Driver Verification</Text>
          <Text style={styles.cardText}>
            Verify driver documents and background checks
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 9</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Platform Analytics</Text>
          <Text style={styles.cardText}>
            View system-wide stats and metrics
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 10</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚙️ System Settings</Text>
          <Text style={styles.cardText}>
            Configure platform settings and policies
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 10</Text>
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
          GLAMGO Admin Portal 🌟
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
    backgroundColor: '#D32F2F',
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
    backgroundColor: '#FFEBEE',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#D32F2F',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D32F2F',
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
    color: '#D32F2F',
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
