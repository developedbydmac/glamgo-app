/**
 * Get Products Use Case
 * 
 * This is the BUSINESS LOGIC layer for fetching products.
 * It sits between the presentation layer (UI) and the data layer (repository).
 * 
 * This use case handles:
 * - Fetching all products
 * - Filtering by category (optional)
 * - Limiting results (optional)
 * - Error handling and validation
 */

import { Product } from '../entities/Product';
import { ProductCategory } from '../entities/ProductCategory';
import { ProductRepository } from '../repositories/ProductRepository';

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  /**
   * Execute the use case to get products
   * 
   * @param options - Optional parameters for filtering and limiting
   * @returns Promise with array of products
   * @throws Error if fetching fails
   */
  async execute(options?: {
    limit?: number;
    category?: ProductCategory;
  }): Promise<Product[]> {
    try {
      // Validate limit if provided
      if (options?.limit !== undefined && options.limit < 1) {
        throw new Error('Limit must be at least 1');
      }

      // Fetch products from repository
      const products = await this.productRepository.getProducts(
        options?.limit,
        options?.category
      );

      // Sort by name for consistent display (optional)
      // Repository already sorts by createdAt desc, but we can add more sorting here
      return products;
    } catch (error) {
      console.error('GetProductsUseCase error:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Failed to get products. Please try again.');
    }
  }

  /**
   * Helper method to get products with default limit
   */
  async getAll(): Promise<Product[]> {
    return this.execute();
  }

  /**
   * Helper method to get products by category
   */
  async getByCategory(category: ProductCategory, limit?: number): Promise<Product[]> {
    return this.execute({ category, limit });
  }

  /**
   * Helper method to get limited number of products
   */
  async getWithLimit(limit: number): Promise<Product[]> {
    return this.execute({ limit });
  }
}
