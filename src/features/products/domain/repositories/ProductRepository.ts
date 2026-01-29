/**
 * Product Repository Interface
 * 
 * This is the DOMAIN LAYER interface that defines how to interact with products.
 * It's abstract and doesn't care about Firebase, REST API, or any specific implementation.
 * 
 * The actual implementation (FirebaseProductRepository) will be in the DATA LAYER.
 * 
 * This follows the Repository Pattern and Dependency Inversion Principle.
 */

import { Product, CreateProductData, UpdateProductData } from '../entities/Product';
import { ProductCategory } from '../entities/ProductCategory';

export interface ProductRepository {
  /**
   * Get all products from the catalog
   * 
   * @param limit - Optional limit on number of products to return
   * @param category - Optional filter by category
   * @returns Promise with array of products
   */
  getProducts(limit?: number, category?: ProductCategory): Promise<Product[]>;

  /**
   * Get a single product by ID
   * 
   * @param productId - The unique product identifier
   * @returns Promise with the product or null if not found
   */
  getProductById(productId: string): Promise<Product | null>;

  /**
   * Search for products by name
   * 
   * @param query - Search query string
   * @param limit - Optional limit on number of results
   * @returns Promise with array of matching products
   */
  searchProducts(query: string, limit?: number): Promise<Product[]>;

  /**
   * Get products by category
   * 
   * @param category - The product category to filter by
   * @param limit - Optional limit on number of products
   * @returns Promise with array of products in that category
   */
  getProductsByCategory(category: ProductCategory, limit?: number): Promise<Product[]>;

  /**
   * Get featured products for homepage display
   * 
   * @param limit - Optional limit on number of featured products
   * @returns Promise with array of featured products
   */
  getFeaturedProducts(limit?: number): Promise<Product[]>;

  /**
   * Create a new product
   * 
   * @param productData - The product data to create
   * @returns Promise with the created product
   */
  createProduct(productData: CreateProductData): Promise<Product>;

  /**
   * Update an existing product
   * 
   * @param productId - The ID of the product to update
   * @param productData - The fields to update
   * @returns Promise with the updated product
   */
  updateProduct(productId: string, productData: UpdateProductData): Promise<Product>;

  /**
   * Delete a product
   * 
   * @param productId - The ID of the product to delete
   * @returns Promise that resolves when deletion is complete
   */
  deleteProduct(productId: string): Promise<void>;

  /**
   * Get products by vendor
   * 
   * @param vendorId - The vendor's unique identifier
   * @param limit - Optional limit on number of products
   * @returns Promise with array of products from that vendor
   */
  getProductsByVendor(vendorId: string, limit?: number): Promise<Product[]>;

  /**
   * Update product stock quantity
   * 
   * @param productId - The ID of the product
   * @param quantity - The new stock quantity
   * @returns Promise that resolves when update is complete
   */
  updateStock(productId: string, quantity: number): Promise<void>;
}
