/**
 * Firebase Cart Repository
 * 
 * Sprint 2 - Phase 2.4: US-010
 * Implements cart persistence using Firestore
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  collection,
} from 'firebase/firestore';
import { db } from '../../../../shared/config/firebase';
import { Cart, CartItem } from '../../domain/entities/Cart';
import { CartRepository } from '../../domain/repositories/CartRepository';
import { FirebaseProductRepository } from '../../../products/data/repositories/FirebaseProductRepository';

export class FirebaseCartRepository implements CartRepository {
  private collectionName = 'carts';
  private productRepository = new FirebaseProductRepository();

  /**
   * Get cart for user
   * Creates new cart if doesn't exist
   */
  async getCart(userId: string): Promise<Cart> {
    try {
      const cartRef = doc(db, this.collectionName, userId);
      const cartSnap = await getDoc(cartRef);

      if (!cartSnap.exists()) {
        // Create new empty cart
        const newCart: Cart = {
          id: userId,
          userId,
          items: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        await setDoc(cartRef, {
          userId,
          items: [],
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        return newCart;
      }

      const data = cartSnap.data();
      
      // Convert Firestore items to CartItems with full product data
      const items: CartItem[] = await Promise.all(
        (data.items || []).map(async (item: any) => {
          const products = await this.productRepository.getProducts();
          const product = products.find(p => p.id === item.productId);
          
          if (!product) {
            throw new Error(`Product ${item.productId} not found`);
          }

          return {
            id: item.id,
            productId: item.productId,
            product,
            quantity: item.quantity,
            addedAt: item.addedAt?.toDate() || new Date(),
          };
        })
      );

      return {
        id: cartSnap.id,
        userId: data.userId,
        items,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  }

  /**
   * Add item to cart
   * If item exists, increment quantity
   */
  async addItem(userId: string, item: CartItem): Promise<void> {
    try {
      const cartRef = doc(db, this.collectionName, userId);
      const cart = await this.getCart(userId);

      // Check if item already exists
      const existingItemIndex = cart.items.findIndex(
        (i) => i.productId === item.productId
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = cart.items.map((i, index) =>
          index === existingItemIndex
            ? {
                id: i.id,
                productId: i.productId,
                quantity: i.quantity + item.quantity,
                addedAt: Timestamp.fromDate(i.addedAt),
              }
            : {
                id: i.id,
                productId: i.productId,
                quantity: i.quantity,
                addedAt: Timestamp.fromDate(i.addedAt),
              }
        );

        await updateDoc(cartRef, {
          items: updatedItems,
          updatedAt: Timestamp.now(),
        });
      } else {
        // Add new item
        const newItem = {
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          addedAt: Timestamp.fromDate(item.addedAt),
        };

        await updateDoc(cartRef, {
          items: arrayUnion(newItem),
          updatedAt: Timestamp.now(),
        });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }

  /**
   * Update item quantity
   */
  async updateItemQuantity(
    userId: string,
    itemId: string,
    quantity: number
  ): Promise<void> {
    try {
      const cart = await this.getCart(userId);
      const cartRef = doc(db, this.collectionName, userId);

      const updatedItems = cart.items.map((item) =>
        item.id === itemId
          ? {
              id: item.id,
              productId: item.productId,
              quantity,
              addedAt: Timestamp.fromDate(item.addedAt),
            }
          : {
              id: item.id,
              productId: item.productId,
              quantity: item.quantity,
              addedAt: Timestamp.fromDate(item.addedAt),
            }
      );

      await updateDoc(cartRef, {
        items: updatedItems,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  }

  /**
   * Remove item from cart
   */
  async removeItem(userId: string, itemId: string): Promise<void> {
    try {
      const cart = await this.getCart(userId);
      const cartRef = doc(db, this.collectionName, userId);

      const updatedItems = cart.items
        .filter((item) => item.id !== itemId)
        .map((item) => ({
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          addedAt: Timestamp.fromDate(item.addedAt),
        }));

      await updateDoc(cartRef, {
        items: updatedItems,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  }

  /**
   * Clear cart
   */
  async clearCart(userId: string): Promise<void> {
    try {
      const cartRef = doc(db, this.collectionName, userId);
      await updateDoc(cartRef, {
        items: [],
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }

  /**
   * Get cart item count
   */
  async getCartItemCount(userId: string): Promise<number> {
    try {
      const cart = await this.getCart(userId);
      return cart.items.reduce((sum, item) => sum + item.quantity, 0);
    } catch (error) {
      console.error('Error getting cart item count:', error);
      return 0;
    }
  }
}
