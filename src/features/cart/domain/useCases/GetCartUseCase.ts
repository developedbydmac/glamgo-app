/**
 * Get Cart Use Case
 * 
 * Sprint 2 - Phase 2.4: US-010
 * Retrieves user's shopping cart
 */

import { Cart } from '../entities/Cart';
import { CartRepository } from '../repositories/CartRepository';

export class GetCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(userId: string): Promise<Cart> {
    return this.cartRepository.getCart(userId);
  }
}
