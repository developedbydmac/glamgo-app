/**
 * Cart Context
 * 
 * Sprint 2 - Phase 2.4: US-010
 * Global cart state management
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem, CartSummary } from '../features/cart/domain/entities/Cart';
import { FirebaseCartRepository } from '../features/cart/data/repositories/FirebaseCartRepository';
import { GetCartUseCase } from '../features/cart/domain/useCases/GetCartUseCase';
import { AddToCartUseCase } from '../features/cart/domain/useCases/AddToCartUseCase';
import { UpdateCartItemUseCase } from '../features/cart/domain/useCases/UpdateCartItemUseCase';
import { RemoveFromCartUseCase } from '../features/cart/domain/useCases/RemoveFromCartUseCase';
import { useAuth } from './AuthContext';
import { Product } from '../features/products/domain/entities/Product';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  summary: CartSummary;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize use cases
  const cartRepository = new FirebaseCartRepository();
  const getCartUseCase = new GetCartUseCase(cartRepository);
  const addToCartUseCase = new AddToCartUseCase(cartRepository);
  const updateCartItemUseCase = new UpdateCartItemUseCase(cartRepository);
  const removeFromCartUseCase = new RemoveFromCartUseCase(cartRepository);

  // Calculate cart summary
  const summary: CartSummary = {
    subtotal: cart?.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0,
    itemCount: cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0,
    uniqueProducts: cart?.items.length || 0,
  };

  // Load cart when user changes
  useEffect(() => {
    if (user) {
      refreshCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const refreshCart = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const userCart = await getCartUseCase.execute(user.uid);
      setCart(userCart);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!user) {
      setError('Please login to add items to cart');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const cartItem: CartItem = {
        id: `${user.uid}_${product.id}_${Date.now()}`,
        productId: product.id,
        product,
        quantity,
        addedAt: new Date(),
      };

      await addToCartUseCase.execute(user.uid, cartItem);
      await refreshCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await updateCartItemUseCase.execute(user.uid, itemId, quantity);
      await refreshCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await removeFromCartUseCase.execute(user.uid, itemId);
      await refreshCart();
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      await cartRepository.clearCart(user.uid);
      await refreshCart();
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        summary,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
