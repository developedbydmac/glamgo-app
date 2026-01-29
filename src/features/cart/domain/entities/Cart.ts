/**
 * Cart Domain Entity
 * 
 * Sprint 2 - Phase 2.4: US-010
 * Represents a shopping cart with items
 */

import { Product } from '../../../products/domain/entities/Product';

/**
 * Cart Item
 * Represents a single product in the cart with quantity
 */
export interface CartItem {
  id: string;           // Unique cart item ID
  productId: string;    // Reference to Product
  product: Product;     // Full product details
  quantity: number;     // Number of items
  addedAt: Date;        // When item was added
}

/**
 * Cart
 * Represents a user's shopping cart
 */
export interface Cart {
  id: string;           // Unique cart ID (usually userId)
  userId: string;       // User who owns this cart
  items: CartItem[];    // Array of cart items
  createdAt: Date;      // When cart was created
  updatedAt: Date;      // Last modification time
}

/**
 * Cart Summary
 * Calculated values for the cart
 */
export interface CartSummary {
  subtotal: number;      // Sum of all items (price * quantity)
  itemCount: number;     // Total number of items
  uniqueProducts: number; // Number of unique products
}
