/**
 * Firebase Order Repository Implementation
 * 
 * Implements order persistence using Firestore
 */

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc,
  query, 
  where, 
  orderBy,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from '../../../../shared/config/firebase';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { Order, CreateOrderInput, OrderStatus, OrderItem } from '../../domain/entities/Order';
import { OrderCalculationService } from '../../domain/services/OrderCalculationService';

export class FirebaseOrderRepository implements OrderRepository {
  private ordersCollection = collection(db, 'orders');
  
  /**
   * Create a new order
   */
  async createOrder(
    userId: string,
    userName: string,
    userEmail: string,
    input: CreateOrderInput,
    orderNumber: string
  ): Promise<Order> {
    try {
      const batch = writeBatch(db);
      
      // Generate new order ID
      const orderRef = doc(this.ordersCollection);
      const orderId = orderRef.id;
      
      // Calculate pricing
      const pricing = OrderCalculationService.calculateOrderPricing(input.items);
      
      // Convert cart items to order items
      const orderItems: OrderItem[] = input.items.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.imageUrls[0] || '',
        price: item.product.price,
        quantity: item.quantity,
        vendorId: item.product.vendorId,
        vendorName: item.product.vendorName,
      }));
      
      const now = new Date();
      
      // Create order data
      const orderData: Omit<Order, 'id'> = {
        orderNumber,
        userId,
        userName,
        userEmail,
        items: orderItems,
        deliveryAddress: input.deliveryAddress,
        deliveryInstructions: input.deliveryInstructions,
        pricing,
        status: OrderStatus.PENDING,
        statusHistory: [
          {
            status: OrderStatus.PENDING,
            timestamp: now,
            note: 'Order placed',
          },
        ],
        paymentStatus: 'pending',
        createdAt: now,
        updatedAt: now,
      };
      
      // Save order
      batch.set(orderRef, {
        ...orderData,
        createdAt: Timestamp.fromDate(orderData.createdAt),
        updatedAt: Timestamp.fromDate(orderData.updatedAt),
        statusHistory: orderData.statusHistory.map(h => ({
          ...h,
          timestamp: Timestamp.fromDate(h.timestamp),
        })),
      });
      
      // Update product stock quantities
      for (const item of input.items) {
        const productRef = doc(db, 'products', item.productId);
        const productDoc = await getDoc(productRef);
        
        if (productDoc.exists()) {
          const currentStock = productDoc.data().stockQuantity || 0;
          const newStock = Math.max(0, currentStock - item.quantity);
          
          batch.update(productRef, {
            stockQuantity: newStock,
            updatedAt: Timestamp.fromDate(now),
          });
        }
      }
      
      // Clear user's cart
      const cartRef = doc(db, 'carts', userId);
      batch.set(cartRef, {
        userId,
        items: [],
        updatedAt: Timestamp.fromDate(now),
      });
      
      // Commit all changes atomically
      await batch.commit();
      
      return {
        id: orderId,
        ...orderData,
      };
      
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order. Please try again.');
    }
  }
  
  /**
   * Get a single order by ID
   */
  async getOrder(orderId: string): Promise<Order | null> {
    try {
      const orderRef = doc(this.ordersCollection, orderId);
      const orderDoc = await getDoc(orderRef);
      
      if (!orderDoc.exists()) {
        return null;
      }
      
      const data = orderDoc.data();
      
      return {
        id: orderDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        estimatedDeliveryTime: data.estimatedDeliveryTime?.toDate(),
        deliveredAt: data.deliveredAt?.toDate(),
        statusHistory: data.statusHistory?.map((h: any) => ({
          ...h,
          timestamp: h.timestamp?.toDate() || new Date(),
        })) || [],
      } as Order;
      
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  }
  
  /**
   * Get all orders for a user
   */
  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const ordersQuery = query(
        this.ordersCollection,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(ordersQuery);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          estimatedDeliveryTime: data.estimatedDeliveryTime?.toDate(),
          deliveredAt: data.deliveredAt?.toDate(),
          statusHistory: data.statusHistory?.map((h: any) => ({
            ...h,
            timestamp: h.timestamp?.toDate() || new Date(),
          })) || [],
        } as Order;
      });
      
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }
  
  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: string,
    status: string,
    note?: string
  ): Promise<void> {
    try {
      const orderRef = doc(this.ordersCollection, orderId);
      const orderDoc = await getDoc(orderRef);
      
      if (!orderDoc.exists()) {
        throw new Error('Order not found');
      }
      
      const currentOrder = orderDoc.data();
      const now = new Date();
      
      const newStatusEntry = {
        status: status as OrderStatus,
        timestamp: Timestamp.fromDate(now),
        ...(note && { note }),
      };
      
      await updateDoc(orderRef, {
        status,
        statusHistory: [...(currentOrder.statusHistory || []), newStatusEntry],
        updatedAt: Timestamp.fromDate(now),
        ...(status === OrderStatus.DELIVERED && { deliveredAt: Timestamp.fromDate(now) }),
      });
      
    } catch (error) {
      console.error('Error updating order status:', error);
      throw new Error('Failed to update order status');
    }
  }
}
