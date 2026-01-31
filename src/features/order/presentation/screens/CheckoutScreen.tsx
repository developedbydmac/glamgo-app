/**
 * Checkout Screen
 * 
 * Allows customers to review their order and place it
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useCart } from '../../../../contexts/CartContext';
import { useAddress } from '../../../../contexts/AddressContext';
import { useOrder } from '../../../../contexts/OrderContext';
import { OrderCalculationService } from '../../domain/services/OrderCalculationService';
import { Address } from '../../../address/domain/entities/Address';

export const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { cart } = useCart();
  const { defaultAddress, addresses } = useAddress();
  const { placeOrder, loading } = useOrder();
  
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Auto-select default address or first address
  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddress(defaultAddress);
    } else if (addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  }, [defaultAddress, addresses]);

  // Calculate pricing
  const pricing = cart && cart.items.length > 0
    ? OrderCalculationService.calculateOrderPricing(cart.items)
    : { subtotal: 0, deliveryFee: 0, tax: 0, total: 0 };

  /**
   * Handle place order
   */
  const handlePlaceOrder = async () => {
    // Validation
    if (!cart || cart.items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add items before checking out.');
      return;
    }

    if (!selectedAddress) {
      Alert.alert('No Address', 'Please select a delivery address.', [
        { text: 'Add Address', onPress: () => (navigation as any).navigate('AddAddress') },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return;
    }

    try {
      setIsPlacingOrder(true);

      // Place order
      const order = await placeOrder({
        items: cart.items,
        deliveryAddress: selectedAddress,
        deliveryInstructions: deliveryInstructions.trim() || undefined,
      });

      // Navigate to confirmation
      (navigation as any).replace('OrderConfirmation', { orderId: order.id });
      
    } catch (error: any) {
      Alert.alert('Order Failed', error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  /**
   * Navigate to address selection
   */
  const handleSelectAddress = () => {
    (navigation as any).navigate('AddressList');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📍 Delivery Address</Text>
          
          {selectedAddress ? (
            <TouchableOpacity
              style={styles.addressCard}
              onPress={handleSelectAddress}
              activeOpacity={0.7}
            >
              <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>{selectedAddress.label}</Text>
                <Text style={styles.addressText}>
                  {selectedAddress.street}
                </Text>
                <Text style={styles.addressText}>
                  {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                </Text>
              </View>
              <Text style={styles.changeButton}>Change →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addAddressButton}
              onPress={handleSelectAddress}
              activeOpacity={0.7}
            >
              <Text style={styles.addAddressText}>+ Add Delivery Address</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛍️ Order Summary</Text>
          
          {cart && cart.items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image
                source={{ uri: item.product.imageUrls[0] }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.product.name}
                </Text>
                <Text style={styles.productVendor}>{item.product.vendorName}</Text>
                <Text style={styles.productQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.productPrice}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Instructions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💬 Delivery Instructions (Optional)</Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder="E.g., Leave at front door, Ring doorbell..."
            value={deliveryInstructions}
            onChangeText={setDeliveryInstructions}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
          <Text style={styles.charCount}>{deliveryInstructions.length}/200</Text>
        </View>

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💰 Price Details</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>${pricing.subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>${pricing.deliveryFee.toFixed(2)}</Text>
          </View>
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax (8%)</Text>
            <Text style={styles.priceValue}>${pricing.tax.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${pricing.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Place Order Button (Fixed at bottom) */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.placeOrderButton,
            (isPlacingOrder || loading || !cart || cart.items.length === 0) && styles.placeOrderButtonDisabled,
          ]}
          onPress={handlePlaceOrder}
          disabled={isPlacingOrder || loading || !cart || cart.items.length === 0}
          activeOpacity={0.8}
        >
          {isPlacingOrder || loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
              <Text style={styles.placeOrderButtonAmount}>${pricing.total.toFixed(2)}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  
  // Address styles
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  addressContent: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  changeButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8b5cf6',
  },
  addAddressButton: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  addAddressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8b5cf6',
  },
  
  // Order item styles
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productVendor: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: 12,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  
  // Instructions styles
  instructionsInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#1a1a1a',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  
  // Pricing styles
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
  
  // Bottom button
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  placeOrderButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonDisabled: {
    backgroundColor: '#ccc',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  placeOrderButtonAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
