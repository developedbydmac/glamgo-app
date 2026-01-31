/**
 * Customer Home Screen
 * 
 * Main landing screen for CUSTOMER role users.
 * 
 * Future Features (Sprint 2+):
 * - Browse products by category
 * - Search for products/vendors
 * - View deals and promotions
 * - Quick reorder from history
 * - Track active orders
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../../contexts/AuthContext';
import { useCart } from '../../../../contexts/CartContext';

type HomeStackParamList = {
  Home: undefined;
  Profile: undefined;
  EditProfile: undefined;
  ProductList: undefined;
  Cart: undefined;
  AddressList: undefined;
};

type CustomerHomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export const CustomerHomeScreen = () => {
  const navigation = useNavigation<CustomerHomeScreenNavigationProp>();
  const { user, logout } = useAuth();
  const { summary } = useCart();

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
        <View>
          <Text style={styles.title}>Welcome to GLAMGO! 👑</Text>
          <Text style={styles.subtitle}>Hello, {user?.name}!</Text>
          <Text style={styles.role}>Customer Account</Text>
        </View>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {summary.itemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{summary.itemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.primaryCard}
          onPress={() => navigation.navigate('ProductList')}
        >
          <Text style={styles.cardTitle}>🛍️ Browse Products</Text>
          <Text style={styles.cardText}>
            Discover beauty products from local vendors
          </Text>
          <Text style={styles.availableNow}>View Catalog →</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📦 Your Orders</Text>
          <Text style={styles.cardText}>
            Track your active and past orders
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 3</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>❤️ Favorites</Text>
          <Text style={styles.cardText}>
            Save your favorite products and vendors
          </Text>
          <Text style={styles.comingSoon}>Coming in Sprint 4</Text>
        </View>

        <TouchableOpacity 
          style={styles.primaryCard}
          onPress={() => navigation.navigate('AddressList')}
        >
          <Text style={styles.cardTitle}>📍 Delivery Addresses</Text>
          <Text style={styles.cardText}>
            Manage your delivery locations
          </Text>
          <Text style={styles.availableNow}>Manage Addresses →</Text>
        </TouchableOpacity>

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
          GLAMGO - From Roots to Doorstep 🌟
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
    backgroundColor: '#4A2663',
    padding: 30,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartIcon: {
    fontSize: 32,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
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
  primaryCard: {
    backgroundColor: '#F3E5F5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4A2663',
  },
  profileCard: {
    backgroundColor: '#F3E5F5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4A2663',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A2663',
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
    color: '#4A2663',
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
