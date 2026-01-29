/**
 * Update Cart Item Use Case
 * 
 * Sprint 2 - Phase 2.4: US-010
 * Updates quantity of an item in the cart
 */

import { CartRepository } from '../repositories/CartRepository';

export class UpdateCartItemUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(userId: string, itemId: string, quantity: number): Promise<void> {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    return this.cartRepository.updateItemQuantity(userId, itemId, quantity);
  }
}
