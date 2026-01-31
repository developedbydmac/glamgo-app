/**
 * Order Entity
 * 
 * Represents a customer order with all items, delivery info, and pricing
 */

import { Address } from '../../../address/domain/entities/Address';
import { CartItem } from '../../../cart/domain/entities/Cart';

export enum OrderStatus {
  PENDING = 'pending',           // Order placed, awaiting payment (Sprint 4)
  CONFIRMED = 'confirmed',       // Payment successful
  PREPARING = 'preparing',       // Vendor preparing items
  READY = 'ready',              // Ready for pickup
  OUT_FOR_DELIVERY = 'out_for_delivery', // Driver has order
  DELIVERED = 'delivered',       // Order complete
  CANCELLED = 'cancelled',       // Order cancelled
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
}

export interface OrderPricing {
  subtotal: number;      // Sum of all item prices
  deliveryFee: number;   // $5 flat rate for MVP
  tax: number;           // 8% of subtotal for MVP
  total: number;         // subtotal + deliveryFee + tax
}

export interface Order {
  id: string;
  orderNumber: string;   // Human-readable order number (e.g., "ORD-20260131-0001")
  userId: string;
  userName: string;
  userEmail: string;
  
  // Order items
  items: OrderItem[];
  
  // Delivery information
  deliveryAddress: Address;
  deliveryInstructions?: string;
  
  // Pricing
  pricing: OrderPricing;
  
  // Status and tracking
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: Date;
    note?: string;
  }[];
  
  // Payment (Sprint 4)
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  paymentMethod?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime?: Date;
  deliveredAt?: Date;
  
  // Vendor and driver assignments (future sprints)
  vendorId?: string;
  driverId?: string;
}

export interface CreateOrderInput {
  items: CartItem[];
  deliveryAddress: Address;
  deliveryInstructions?: string;
}
