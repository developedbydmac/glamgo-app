/**
 * Remove from Cart Use Case
 * 
 * Sprint 2 - Phase 2.4: US-010
 * Removes an item from the shopping cart
 */

import { CartRepository } from '../repositories/CartRepository';

export class RemoveFromCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(userId: string, itemId: string): Promise<void> {
    return this.cartRepository.removeItem(userId, itemId);
  }
}
