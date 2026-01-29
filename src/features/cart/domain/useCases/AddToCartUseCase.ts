/**
 * Add to Cart Use Case
 * 
 * Sprint 2 - Phase 2.4: US-010
 * Adds a product to the shopping cart
 */

import { CartItem } from '../entities/Cart';
import { CartRepository } from '../repositories/CartRepository';

export class AddToCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(userId: string, item: CartItem): Promise<void> {
    return this.cartRepository.addItem(userId, item);
  }
}
