/**
 * App Navigator
 * 
 * Main navigation component that decides whether to show:
 * - Loading screen (while checking auth state)
 * - Auth screens (login/register) for unauthenticated users
 * - Home screens (role-based) for authenticated users
 * 
 * This implements the authentication flow and role-based routing.
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../features/auth/domain/entities/User';

// Import screens
import { LoginScreen } from '../features/auth/presentation/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/presentation/screens/RegisterScreen';
import { CustomerHomeScreen } from '../features/home/presentation/screens/CustomerHomeScreen';
import { VendorDashboardScreen } from '../features/home/presentation/screens/VendorDashboardScreen';
import { DriverDashboardScreen } from '../features/home/presentation/screens/DriverDashboardScreen';
import { AdminPanelScreen } from '../features/home/presentation/screens/AdminPanelScreen';
import { ProfileScreen } from '../features/profile/presentation/screens/ProfileScreen';
import { EditProfileScreen } from '../features/profile/presentation/screens/EditProfileScreen';
import { ProductListScreen } from '../features/products/presentation/screens/ProductListScreen';
import ProductDetailsScreen from '../features/products/presentation/screens/ProductDetailsScreen';
import { WelcomeScreen } from '../features/welcome/presentation/screens/WelcomeScreen';
import { CartScreen } from '../features/cart/presentation/screens/CartScreen';

const Stack = createNativeStackNavigator();

/**
 * Loading Screen Component
 * Shown while Firebase checks authentication state
 */
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#4A2663" />
  </View>
);

/**
 * Auth Stack
 * Navigation for unauthenticated users
 * Includes Product browsing (public access)
 */
const AuthStack = () => (
  <Stack.Navigator 
    screenOptions={{ headerShown: false }}
    initialRouteName="Welcome"
  >
    <Stack.Screen 
      name="Welcome" 
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="ProductList" 
      component={ProductListScreen}
      options={{ headerShown: true, title: 'Browse Products' }}
    />
    <Stack.Screen 
      name="ProductDetails" 
      component={ProductDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

/**
 * Main Stack
 * Navigation for authenticated users (role-based)
 */
const MainStack = () => {
  const { user } = useAuth();

  // Determine home screen based on user role
  const getHomeScreen = () => {
    switch (user?.role) {
      case UserRole.CUSTOMER:
        return CustomerHomeScreen;
      case UserRole.VENDOR:
        return VendorDashboardScreen;
      case UserRole.DRIVER:
        return DriverDashboardScreen;
      case UserRole.ADMIN:
        return AdminPanelScreen;
      default:
        return CustomerHomeScreen; // Fallback to customer
    }
  };

  const HomeScreen = getHomeScreen();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen 
        name="ProductList" 
        component={ProductListScreen}
        options={{
          headerShown: true,
          title: 'Products',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          headerShown: true,
          title: 'Shopping Cart',
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * App Navigator
 * Main navigation component
 */
export const AppNavigator = () => {
  const { user, loading } = useAuth();

  // Show loading screen while checking auth state
  // Explicitly convert to boolean to avoid type issues
  if (Boolean(loading) === true) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
