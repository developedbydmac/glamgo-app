/**
 * Product List Screen
 * 
 * Main screen for browsing products (US-007)
 * Features:
 * - Grid layout showing all products
 * - Pull to refresh
 * - Loading states
 * - Error handling
 * - Navigation const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  centerContainer: {duct details
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../../domain/entities/Product';
import { FirebaseProductRepository } from '../../data/repositories/FirebaseProductRepository';
import { GetProductsUseCase } from '../../domain/useCases/GetProductsUseCase';
import { ProductCard } from '../components/ProductCard';

type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { productId: string };
  Login: undefined;
  Register: undefined;
};

type ProductListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductList'
>;

interface ProductListScreenProps {
  navigation: ProductListScreenNavigationProp;
}

export const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize use case
  const productRepository = new FirebaseProductRepository();
  const getProductsUseCase = new GetProductsUseCase(productRepository);

  // Fetch products
  const fetchProducts = async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const fetchedProducts = await getProductsUseCase.execute();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  // Handle pull to refresh
  const handleRefresh = () => {
    fetchProducts(true);
  };

  // Handle search clear
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle product press
  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A2663" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>😞 {error}</Text>
        <Text style={styles.retryText} onPress={() => fetchProducts()}>
          Tap to retry
        </Text>
      </View>
    );
  }

  // Render empty state
  if (products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>🛍️ No products available yet</Text>
        <Text style={styles.emptySubtext}>
          Check back soon for new arrivals!
        </Text>
      </View>
    );
  }

  // Render product list
  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSearch}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          {searchQuery ? ` found for "${searchQuery}"` : ' available'}
        </Text>
      </View>

      {/* No Results State */}
      {filteredProducts.length === 0 && searchQuery.length > 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>🔍 No results found</Text>
          <Text style={styles.emptySubtext}>
            Try adjusting your search terms
          </Text>
        </View>
      ) : (
        /* Product Grid */
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              product={item}
              onPress={() => handleProductPress(item)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
          <View style={styles.headerInline}>
            <Text style={styles.subtitle}>
              {products.length} {products.length === 1 ? 'item' : 'items'} available
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#4A2663']}
            tintColor="#4A2663"
          />
        }
        showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 32,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerInline: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A2663',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 24,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  cardWrapper: {
    width: '48%',
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
  retryText: {
    fontSize: 16,
    color: '#4A2663',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  emptyText: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
