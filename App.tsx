/**
 * Main App Entry Point
 * 
 * Sets up the app with:
 * - AuthProvider for global authentication state
 * - AddressProvider for global delivery addresses state
 * - CartProvider for global shopping cart state
 * - OrderProvider for global order state
 * - AppNavigator for navigation based on auth state
 * - Role-based routing (Customer/Vendor/Driver/Admin)
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { AddressProvider } from './src/contexts/AddressContext';
import { CartProvider } from './src/contexts/CartContext';
import { OrderProvider } from './src/contexts/OrderContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AddressProvider>
          <CartProvider>
            <OrderProvider>
              <AppNavigator />
            </OrderProvider>
          </CartProvider>
        </AddressProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
