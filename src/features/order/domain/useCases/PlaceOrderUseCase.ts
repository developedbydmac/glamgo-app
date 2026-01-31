/**
 * Place Order Use Case
 * 
 * Handles business logic for creating a new order
 */

import { OrderRepository } from '../repositories/OrderRepository';
import { CreateOrderInput, Order } from '../entities/Order';
import { OrderCalculationService } from '../services/OrderCalculationService';

export class PlaceOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}
  
  /**
   * Generate a unique order number
   * Format: ORD-YYYYMMDD-XXXX (e.g., ORD-20260131-0001)
   */
  private generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    
    return `ORD-${year}${month}${day}-${random}`;
  }
  
  async execute(
    userId: string,
    userName: string,
    userEmail: string,
    input: CreateOrderInput
  ): Promise<Order> {
    // Validate cart not empty
    if (!input.items || input.items.length === 0) {
      throw new Error('Cannot place order with empty cart');
    }
    
    // Validate delivery address selected
    if (!input.deliveryAddress) {
      throw new Error('Please select a delivery address');
    }
    
    // Validate all items have stock
    for (const item of input.items) {
      if (item.product.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for ${item.product.name}`);
      }
    }
    
    // Generate order number
    const orderNumber = this.generateOrderNumber();
    
    // Create order via repository
    const order = await this.orderRepository.createOrder(
      userId,
      userName,
      userEmail,
      input,
      orderNumber
    );
    
    return order;
  }
}
