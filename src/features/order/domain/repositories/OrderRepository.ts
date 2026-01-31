/**
 * Order Repository Interface
 * 
 * Defines contract for order data operations
 */

import { Order, CreateOrderInput } from '../entities/Order';

export interface OrderRepository {
  /**
   * Create a new order
   */
  createOrder(
    userId: string,
    userName: string,
    userEmail: string,
    input: CreateOrderInput,
    orderNumber: string
  ): Promise<Order>;
  
  /**
   * Get a single order by ID
   */
  getOrder(orderId: string): Promise<Order | null>;
  
  /**
   * Get all orders for a user
   */
  getUserOrders(userId: string): Promise<Order[]>;
  
  /**
   * Update order status
   */
  updateOrderStatus(
    orderId: string,
    status: string,
    note?: string
  ): Promise<void>;
}
