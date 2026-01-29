/**
 * Product Details Screen
 * 
 * Sprint 2 - Phase 2.3: US-009
 * - Display full product information
 * - Show large product image
 * - Display price, rating, reviews
 * - Show description and details
 * - Display vendor information
 * - Add to Cart button (placeholder for now)
 * - Back navigation
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from '../../domain/entities/Product';
import { FirebaseProductRepository } from '../../data/repositories/FirebaseProductRepository';
import { GetProductsUseCase } from '../../domain/useCases/GetProductsUseCase';

type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: string };
};

type ProductDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;

interface ProductDetailsScreenProps {
  navigation: ProductDetailsScreenNavigationProp;
  route: ProductDetailsScreenRouteProp;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const productRepository = new FirebaseProductRepository();
  const getProductsUseCase = new GetProductsUseCase(productRepository);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all products and find the one we need
      const products = await getProductsUseCase.execute();
      const foundProduct = products.find((p) => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement in Sprint 2 Phase 2.4 (US-010: Shopping Cart)
    alert('Add to Cart feature coming soon! 🛒');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  // Loading State
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A2663" />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {error || 'Product not found'}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render Product Details
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUrls[0] }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.backButtonOverlay}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          {/* Product Name */}
          <Text style={styles.productName}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          {/* Rating & Reviews */}
          <View style={styles.ratingContainer}>
            <Text style={styles.stars}>{renderStars(product.averageRating)}</Text>
            <Text style={styles.ratingText}>
              {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
            </Text>
          </View>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            {product.stockQuantity > 0 ? (
              <>
                {product.stockQuantity < 20 ? (
                  <Text style={styles.lowStockText}>
                    ⚠️ Only {product.stockQuantity} left in stock
                  </Text>
                ) : (
                  <Text style={styles.inStockText}>
                    ✓ In Stock ({product.stockQuantity} available)
                  </Text>
                )}
              </>
            ) : (
              <Text style={styles.outOfStockText}>✗ Out of Stock</Text>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Vendor Info Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vendor Information</Text>
            <Text style={styles.vendorText}>Vendor ID: {product.vendorId}</Text>
            <Text style={styles.infoText}>
              All products are sourced from trusted local vendors
            </Text>
          </View>

          {/* Spacer for Add to Cart Button */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            product.stockQuantity === 0 && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={product.stockQuantity === 0}
        >
          <Text style={styles.addToCartText}>
            {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 16,
    color: '#4A2663',
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 400,
    backgroundColor: '#FFF',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  backButtonOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A2663',
    fontWeight: '600',
  },
  infoContainer: {
    padding: 20,
  },
  categoryBadge: {
    backgroundColor: '#E8D5F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#4A2663',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A2663',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    fontSize: 18,
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  stockContainer: {
    marginBottom: 16,
  },
  inStockText: {
    fontSize: 16,
    color: '#27AE60',
    fontWeight: '500',
  },
  lowStockText: {
    fontSize: 16,
    color: '#F39C12',
    fontWeight: '500',
  },
  outOfStockText: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  vendorText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  addToCartButton: {
    backgroundColor: '#4A2663',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
