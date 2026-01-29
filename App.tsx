/**
 * Main App Entry Point
 * 
 * Sets up the app with:
 * - AuthProvider for global authentication state
 * - AppNavigator for navigation based on auth state
 * - Role-based routing (Customer/Vendor/Driver/Admin)
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
