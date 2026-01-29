/**
 * Product Card Component
 * 
 * Reusable card component for displaying product information
 * in the product list. Shows:
 * - Product image
 * - Product name
 * - Price
 * - Rating and review count
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../../domain/entities/Product';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  // Format price to 2 decimal places
  const formattedPrice = `$${product.price.toFixed(2)}`;
  
  // Get first image or placeholder
  const imageUrl = product.imageUrls[0] || 'https://via.placeholder.com/150';
  
  // Render star rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.averageRating);
    const hasHalfStar = product.averageRating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Product Image */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      
      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        
        {/* Price and Rating Row */}
        <View style={styles.priceRatingRow}>
          <Text style={styles.price}>{formattedPrice}</Text>
          <View style={styles.rating}>
            <Text style={styles.stars}>{renderStars()}</Text>
            <Text style={styles.ratingText}>
              {product.averageRating.toFixed(1)}
            </Text>
          </View>
        </View>
        
        {/* Review Count and Stock */}
        <View style={styles.metaRow}>
          <Text style={styles.reviews}>
            {product.reviewCount} {product.reviewCount === 1 ? 'review' : 'reviews'}
          </Text>
          {product.stockQuantity < 20 && (
            <Text style={styles.lowStock}>
              Only {product.stockQuantity} left!
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#F5F5F5',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    minHeight: 40, // Reserve space for 2 lines
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A2663', // GLAMGO purple
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviews: {
    fontSize: 12,
    color: '#999',
  },
  lowStock: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
