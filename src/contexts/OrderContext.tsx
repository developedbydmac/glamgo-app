/**
 * Order Context
 * 
 * Manages order state globally across the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, CreateOrderInput } from '../features/order/domain/entities/Order';
import { FirebaseOrderRepository } from '../features/order/data/repositories/FirebaseOrderRepository';
import { PlaceOrderUseCase } from '../features/order/domain/useCases/PlaceOrderUseCase';
import { useAuth } from './AuthContext';

interface OrderContextType {
  currentOrder: Order | null;
  orders: Order[];
  loading: boolean;
  error: string | null;
  placeOrder: (input: CreateOrderInput) => Promise<Order>;
  loadOrders: () => Promise<void>;
  loadOrder: (orderId: string) => Promise<void>;
  clearError: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Initialize repository and use cases
const orderRepository = new FirebaseOrderRepository();
const placeOrderUseCase = new PlaceOrderUseCase(orderRepository);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load all orders for the current user
   */
  const loadOrders = async () => {
    if (!user) {
      setOrders([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userOrders = await orderRepository.getUserOrders(user.uid);
      setOrders(userOrders);
    } catch (err) {
      console.error('Error loading orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load a single order by ID
   */
  const loadOrder = async (orderId: string) => {
    try {
      setLoading(true);
      setError(null);
      const order = await orderRepository.getOrder(orderId);
      if (order) {
        setCurrentOrder(order);
      } else {
        setError('Order not found');
      }
    } catch (err) {
      console.error('Error loading order:', err);
      setError('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Place a new order
   */
  const placeOrder = async (input: CreateOrderInput): Promise<Order> => {
    if (!user) {
      throw new Error('You must be logged in to place an order');
    }

    try {
      setLoading(true);
      setError(null);

      // Get user name and email
      const userName = user.name || 'Customer';
      const userEmail = user.email || '';

      // Place order using use case
      const order = await placeOrderUseCase.execute(
        user.uid,
        userName,
        userEmail,
        input
      );

      // Set as current order
      setCurrentOrder(order);

      // Reload orders list
      await loadOrders();

      return order;
    } catch (err: any) {
      console.error('Error placing order:', err);
      const errorMessage = err.message || 'Failed to place order';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear error state
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Auto-load orders when user logs in
   */
  useEffect(() => {
    if (user) {
      loadOrders();
    } else {
      // Clear orders when user logs out
      setOrders([]);
      setCurrentOrder(null);
    }
  }, [user]);

  const value: OrderContextType = {
    currentOrder,
    orders,
    loading,
    error,
    placeOrder,
    loadOrders,
    loadOrder,
    clearError,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

/**
 * Hook to use order context
 */
export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};
