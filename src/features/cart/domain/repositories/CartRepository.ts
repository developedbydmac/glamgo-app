/**
 * Cart Repository Interface
 * 
 * Sprint 2 - Phase 2.4: US-010
 * Defines operations for cart persistence
 */

import { Cart, CartItem } from '../entities/Cart';

export interface CartRepository {
  /**
   * Get cart for a specific user
   * Creates a new cart if one doesn't exist
   */
  getCart(userId: string): Promise<Cart>;

  /**
   * Add item to cart
   * If item already exists, increment quantity
   */
  addItem(userId: string, item: CartItem): Promise<void>;

  /**
   * Update item quantity in cart
   */
  updateItemQuantity(userId: string, itemId: string, quantity: number): Promise<void>;

  /**
   * Remove item from cart
   */
  removeItem(userId: string, itemId: string): Promise<void>;

  /**
   * Clear entire cart
   */
  clearCart(userId: string): Promise<void>;

  /**
   * Get number of items in cart (for badge)
   */
  getCartItemCount(userId: string): Promise<number>;
}
