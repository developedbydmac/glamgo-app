/**
 * Order Confirmation Screen
 * 
 * Shows order success and details after placing an order
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useOrder } from '../../../../contexts/OrderContext';
import { Order } from '../../domain/entities/Order';

interface RouteParams {
  orderId: string;
}

export const OrderConfirmationScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { orderId } = route.params as RouteParams;
  const { loadOrder, loading } = useOrder();
  const [order, setOrder] = useState<Order | null>(null);

  // Load order on mount
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await loadOrder(orderId);
      } catch (error) {
        console.error('Error loading order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Get order from context
  useEffect(() => {
    if (!loading) {
      // Try to get from context
      const { currentOrder } = require('../../../../contexts/OrderContext');
      if (currentOrder && currentOrder.id === orderId) {
        setOrder(currentOrder);
      }
    }
  }, [loading, orderId]);

  if (loading || !order) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <Text style={styles.successEmoji}>✅</Text>
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Order Placed Successfully!</Text>
        <Text style={styles.successSubtitle}>
          Thank you for your order. We'll get started right away.
        </Text>

        {/* Order Number */}
        <View style={styles.orderNumberCard}>
          <Text style={styles.orderNumberLabel}>Order Number</Text>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 Order Details</Text>

          {order.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.productName}
                </Text>
                <Text style={styles.itemVendor}>{item.vendorName}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Delivery Address</Text>
          <Text style={styles.addressLabel}>{order.deliveryAddress.label}</Text>
          <Text style={styles.addressText}>{order.deliveryAddress.street}</Text>
          <Text style={styles.addressText}>
            {order.deliveryAddress.city}, {order.deliveryAddress.state}{' '}
            {order.deliveryAddress.zipCode}
          </Text>
        </View>

        {/* Delivery Instructions */}
        {order.deliveryInstructions && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💬 Delivery Instructions</Text>
            <Text style={styles.instructionsText}>{order.deliveryInstructions}</Text>
          </View>
        )}

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Price Summary</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>${order.pricing.subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>${order.pricing.deliveryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax</Text>
            <Text style={styles.priceValue}>${order.pricing.tax.toFixed(2)}</Text>
          </View>

          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${order.pricing.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Estimated Delivery */}
        <View style={styles.estimatedDelivery}>
          <Text style={styles.estimatedLabel}>⏱️ Estimated Delivery Time</Text>
          <Text style={styles.estimatedTime}>30-45 minutes</Text>
          <Text style={styles.estimatedNote}>We'll notify you when your order is ready</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {/* Track Order Button (Placeholder for Sprint 5) */}
          <TouchableOpacity
            style={styles.trackButton}
            onPress={() => {
              // TODO: Navigate to order tracking (Sprint 5)
              alert('Order tracking coming in Sprint 5!');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.trackButtonText}>📍 Track Order</Text>
          </TouchableOpacity>

          {/* Continue Shopping Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              // Navigate to product list
              (navigation as any).navigate('ProductList');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },

  // Success section
  successIcon: {
    alignItems: 'center',
    marginTop: 24,
  },
  successEmoji: {
    fontSize: 80,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 16,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 32,
  },

  // Order number card
  orderNumberCard: {
    backgroundColor: '#8b5cf6',
    padding: 20,
    borderRadius: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  orderNumberLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },

  // Section styles
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },

  // Order item styles
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  itemVendor: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginLeft: 12,
  },

  // Address styles
  addressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },

  // Instructions
  instructionsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },

  // Price styles
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#8b5cf6',
  },

  // Estimated delivery
  estimatedDelivery: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  estimatedLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  estimatedTime: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8b5cf6',
    marginBottom: 8,
  },
  estimatedNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },

  // Buttons
  buttonContainer: {
    marginTop: 16,
  },
  trackButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  continueButtonText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '700',
  },
});
