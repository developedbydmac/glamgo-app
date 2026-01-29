/**
 * Firebase Product Repository Implementation
 * 
 * This is the DATA LAYER implementation of the ProductRepository interface.
 * It handles all Firebase Firestore operations for products.
 * 
 * This class translates between Firebase documents and our Product domain entities.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../../../../config/firebase.config';
import { Product, CreateProductData, UpdateProductData } from '../../domain/entities/Product';
import { ProductCategory } from '../../domain/entities/ProductCategory';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class FirebaseProductRepository implements ProductRepository {
  private readonly collectionName = 'products';

  /**
   * Convert Firestore document to Product entity
   */
  private documentToProduct(id: string, data: any): Product {
    return {
      id,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrls: data.imageUrls || [],
      category: data.category as ProductCategory,
      vendorId: data.vendorId,
      vendorName: data.vendorName,
      stockQuantity: data.stockQuantity || 0,
      averageRating: data.averageRating || 0,
      reviewCount: data.reviewCount || 0,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      brand: data.brand,
      sku: data.sku,
      weight: data.weight,
      isFeatured: data.isFeatured || false,
      salePrice: data.salePrice,
    };
  }

  /**
   * Convert Product entity to Firestore document data
   */
  private productToDocument(product: Partial<Product>): any {
    const doc: any = {};

    if (product.name !== undefined) doc.name = product.name;
    if (product.description !== undefined) doc.description = product.description;
    if (product.price !== undefined) doc.price = product.price;
    if (product.imageUrls !== undefined) doc.imageUrls = product.imageUrls;
    if (product.category !== undefined) doc.category = product.category;
    if (product.vendorId !== undefined) doc.vendorId = product.vendorId;
    if (product.vendorName !== undefined) doc.vendorName = product.vendorName;
    if (product.stockQuantity !== undefined) doc.stockQuantity = product.stockQuantity;
    if (product.averageRating !== undefined) doc.averageRating = product.averageRating;
    if (product.reviewCount !== undefined) doc.reviewCount = product.reviewCount;
    if (product.brand !== undefined) doc.brand = product.brand;
    if (product.sku !== undefined) doc.sku = product.sku;
    if (product.weight !== undefined) doc.weight = product.weight;
    if (product.isFeatured !== undefined) doc.isFeatured = product.isFeatured;
    if (product.salePrice !== undefined) doc.salePrice = product.salePrice;

    return doc;
  }

  /**
   * Get all products or filter by category
   */
  async getProducts(limit?: number, category?: ProductCategory): Promise<Product[]> {
    try {
      const productsRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

      if (category) {
        constraints.unshift(where('category', '==', category));
      }

      if (limit) {
        constraints.push(firestoreLimit(limit));
      }

      const q = query(productsRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => this.documentToProduct(doc.id, doc.data()));
    } catch (error) {
      console.error('Error getting products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Get a single product by ID
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      const productRef = doc(db, this.collectionName, productId);
      const productDoc = await getDoc(productRef);

      if (!productDoc.exists()) {
        return null;
      }

      return this.documentToProduct(productDoc.id, productDoc.data());
    } catch (error) {
      console.error('Error getting product by ID:', error);
      throw new Error('Failed to fetch product');
    }
  }

  /**
   * Search for products by name
   * 
   * Note: Firestore doesn't support full-text search natively.
   * This is a simple implementation that searches for products whose names
   * start with the query. For production, consider using Algolia or Elasticsearch.
   */
  async searchProducts(searchQuery: string, limit?: number): Promise<Product[]> {
    try {
      const productsRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [orderBy('name')];

      if (limit) {
        constraints.push(firestoreLimit(limit));
      }

      const q = query(productsRef, ...constraints);
      const querySnapshot = await getDocs(q);

      // Filter results client-side for case-insensitive search
      const products = querySnapshot.docs.map(doc => this.documentToProduct(doc.id, doc.data()));
      const lowercaseQuery = searchQuery.toLowerCase();

      return products.filter(product =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.brand?.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: ProductCategory, limit?: number): Promise<Product[]> {
    return this.getProducts(limit, category);
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    try {
      const productsRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [
        where('isFeatured', '==', true),
        orderBy('createdAt', 'desc'),
      ];

      if (limit) {
        constraints.push(firestoreLimit(limit));
      }

      const q = query(productsRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => this.documentToProduct(doc.id, doc.data()));
    } catch (error) {
      console.error('Error getting featured products:', error);
      throw new Error('Failed to fetch featured products');
    }
  }

  /**
   * Create a new product
   */
  async createProduct(productData: CreateProductData): Promise<Product> {
    try {
      const productsRef = collection(db, this.collectionName);
      const now = Timestamp.now();

      const docData = {
        ...this.productToDocument(productData),
        averageRating: 0,
        reviewCount: 0,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(productsRef, docData);
      const newProduct = await this.getProductById(docRef.id);

      if (!newProduct) {
        throw new Error('Failed to retrieve created product');
      }

      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  /**
   * Update an existing product
   */
  async updateProduct(productId: string, productData: UpdateProductData): Promise<Product> {
    try {
      const productRef = doc(db, this.collectionName, productId);
      const updateData = {
        ...this.productToDocument(productData),
        updatedAt: Timestamp.now(),
      };

      await updateDoc(productRef, updateData);

      const updatedProduct = await this.getProductById(productId);
      if (!updatedProduct) {
        throw new Error('Failed to retrieve updated product');
      }

      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  /**
   * Delete a product
   */
  async deleteProduct(productId: string): Promise<void> {
    try {
      const productRef = doc(db, this.collectionName, productId);
      await deleteDoc(productRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }

  /**
   * Get products by vendor
   */
  async getProductsByVendor(vendorId: string, limit?: number): Promise<Product[]> {
    try {
      const productsRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [
        where('vendorId', '==', vendorId),
        orderBy('createdAt', 'desc'),
      ];

      if (limit) {
        constraints.push(firestoreLimit(limit));
      }

      const q = query(productsRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => this.documentToProduct(doc.id, doc.data()));
    } catch (error) {
      console.error('Error getting products by vendor:', error);
      throw new Error('Failed to fetch vendor products');
    }
  }

  /**
   * Update product stock quantity
   */
  async updateStock(productId: string, quantity: number): Promise<void> {
    try {
      const productRef = doc(db, this.collectionName, productId);
      await updateDoc(productRef, {
        stockQuantity: quantity,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      throw new Error('Failed to update product stock');
    }
  }
}
