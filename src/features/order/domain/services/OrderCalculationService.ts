/**
 * Order Calculation Service
 * 
 * Handles all pricing calculations for orders
 */

import { CartItem } from '../../../cart/domain/entities/Cart';
import { OrderPricing } from '../entities/Order';

export class OrderCalculationService {
  private static readonly DELIVERY_FEE = 5.00;  // $5 flat rate for MVP
  private static readonly TAX_RATE = 0.08;      // 8% tax rate for MVP
  
  /**
   * Calculate subtotal from cart items
   */
  static calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }
  
  /**
   * Get delivery fee (flat rate for MVP)
   */
  static calculateDeliveryFee(): number {
    return this.DELIVERY_FEE;
  }
  
  /**
   * Calculate tax (8% of subtotal for MVP)
   */
  static calculateTax(subtotal: number): number {
    return subtotal * this.TAX_RATE;
  }
  
  /**
   * Calculate total order price
   */
  static calculateTotal(subtotal: number, deliveryFee: number, tax: number): number {
    return subtotal + deliveryFee + tax;
  }
  
  /**
   * Calculate complete order pricing
   */
  static calculateOrderPricing(items: CartItem[]): OrderPricing {
    const subtotal = this.calculateSubtotal(items);
    const deliveryFee = this.calculateDeliveryFee();
    const tax = this.calculateTax(subtotal);
    const total = this.calculateTotal(subtotal, deliveryFee, tax);
    
    return {
      subtotal: Math.round(subtotal * 100) / 100,  // Round to 2 decimals
      deliveryFee: Math.round(deliveryFee * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }
}
