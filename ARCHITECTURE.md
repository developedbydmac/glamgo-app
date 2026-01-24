# GLAMGO - Clean Architecture Guide

## Overview

This document describes the clean architecture implementation for GLAMGO, a multi-user marketplace app with React Native Expo and Firebase backend.

## Architecture Principles

### Core Concepts

1. **Separation of Concerns** - Each layer has a specific responsibility
2. **Dependency Rule** - Dependencies point inward (outer layers depend on inner layers)
3. **Testability** - Business logic is independent of frameworks and UI
4. **Scalability** - Easy to add new features without affecting existing code
5. **Maintainability** - Clear structure makes code easy to understand and modify

### Architecture Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│   (UI, Components, Screens, State)      │
├─────────────────────────────────────────┤
│         Domain Layer                    │
│   (Entities, Use Cases, Repositories)   │
├─────────────────────────────────────────┤
│         Data Layer                      │
│   (Repository Impl, Data Sources)       │
├─────────────────────────────────────────┤
│         External Layer                  │
│   (Firebase, APIs, Storage)             │
└─────────────────────────────────────────┘
```

---

## Project Structure

```
glamgo-app/
├── src/
│   ├── features/                    # Feature modules (vertical slices)
│   │   ├── auth/                    # Authentication feature
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── User.ts
│   │   │   │   ├── repositories/
│   │   │   │   │   └── AuthRepository.ts
│   │   │   │   └── usecases/
│   │   │   │       ├── LoginUseCase.ts
│   │   │   │       ├── RegisterUseCase.ts
│   │   │   │       └── LogoutUseCase.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   │   └── AuthRepositoryImpl.ts
│   │   │   │   ├── datasources/
│   │   │   │   │   └── AuthRemoteDataSource.ts
│   │   │   │   └── models/
│   │   │   │       └── UserModel.ts
│   │   │   └── presentation/
│   │   │       ├── screens/
│   │   │       │   ├── LoginScreen.tsx
│   │   │       │   ├── RegisterScreen.tsx
│   │   │       │   └── ProfileScreen.tsx
│   │   │       ├── components/
│   │   │       │   ├── LoginForm.tsx
│   │   │       │   └── SocialLoginButton.tsx
│   │   │       ├── hooks/
│   │   │       │   └── useAuth.ts
│   │   │       └── state/
│   │   │           └── authSlice.ts
│   │   │
│   │   ├── customer/                # Customer feature
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Cart.ts
│   │   │   │   │   └── Address.ts
│   │   │   │   ├── repositories/
│   │   │   │   │   └── CustomerRepository.ts
│   │   │   │   └── usecases/
│   │   │   │       ├── AddToCartUseCase.ts
│   │   │   │       ├── PlaceOrderUseCase.ts
│   │   │   │       └── TrackOrderUseCase.ts
│   │   │   ├── data/
│   │   │   │   ├── repositories/
│   │   │   │   ├── datasources/
│   │   │   │   └── models/
│   │   │   └── presentation/
│   │   │       ├── screens/
│   │   │       │   ├── HomeScreen.tsx
│   │   │       │   ├── CartScreen.tsx
│   │   │       │   ├── CheckoutScreen.tsx
│   │   │       │   └── OrderTrackingScreen.tsx
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       └── state/
│   │   │
│   │   ├── vendor/                  # Vendor feature
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Store.ts
│   │   │   │   │   └── Inventory.ts
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │       ├── AddProductUseCase.ts
│   │   │   │       ├── ManageOrderUseCase.ts
│   │   │   │       └── ViewAnalyticsUseCase.ts
│   │   │   ├── data/
│   │   │   └── presentation/
│   │   │       ├── screens/
│   │   │       │   ├── VendorDashboardScreen.tsx
│   │   │       │   ├── ProductManagementScreen.tsx
│   │   │       │   ├── OrderManagementScreen.tsx
│   │   │       │   └── AnalyticsScreen.tsx
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       └── state/
│   │   │
│   │   ├── driver/                  # Driver feature
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Delivery.ts
│   │   │   │   │   └── Route.ts
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │       ├── AcceptDeliveryUseCase.ts
│   │   │   │       ├── CompleteDeliveryUseCase.ts
│   │   │   │       └── UpdateLocationUseCase.ts
│   │   │   ├── data/
│   │   │   └── presentation/
│   │   │       ├── screens/
│   │   │       │   ├── DriverDashboardScreen.tsx
│   │   │       │   ├── DeliveryMapScreen.tsx
│   │   │       │   └── EarningsScreen.tsx
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       └── state/
│   │   │
│   │   ├── admin/                   # Admin feature
│   │   │   ├── domain/
│   │   │   ├── data/
│   │   │   └── presentation/
│   │   │       ├── screens/
│   │   │       │   ├── AdminDashboardScreen.tsx
│   │   │       │   ├── UserManagementScreen.tsx
│   │   │       │   └── AnalyticsScreen.tsx
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       └── state/
│   │   │
│   │   ├── products/                # Products feature
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── Product.ts
│   │   │   │   │   └── Category.ts
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │       ├── SearchProductsUseCase.ts
│   │   │   │       ├── GetProductDetailsUseCase.ts
│   │   │   │       └── FilterProductsUseCase.ts
│   │   │   ├── data/
│   │   │   └── presentation/
│   │   │       ├── screens/
│   │   │       │   ├── ProductListScreen.tsx
│   │   │       │   ├── ProductDetailScreen.tsx
│   │   │       │   └── SearchScreen.tsx
│   │   │       ├── components/
│   │   │       │   ├── ProductCard.tsx
│   │   │       │   └── ProductFilter.tsx
│   │   │       ├── hooks/
│   │   │       └── state/
│   │   │
│   │   ├── orders/                  # Orders feature
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── Order.ts
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │       ├── CreateOrderUseCase.ts
│   │   │   │       ├── GetOrderStatusUseCase.ts
│   │   │   │       └── CancelOrderUseCase.ts
│   │   │   ├── data/
│   │   │   └── presentation/
│   │   │
│   │   ├── delivery/                # Delivery feature
│   │   │   ├── domain/
│   │   │   ├── data/
│   │   │   └── presentation/
│   │   │
│   │   ├── payments/                # Payments feature
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── Payment.ts
│   │   │   │   ├── repositories/
│   │   │   │   └── usecases/
│   │   │   │       ├── ProcessPaymentUseCase.ts
│   │   │   │       └── RefundPaymentUseCase.ts
│   │   │   ├── data/
│   │   │   └── presentation/
│   │   │
│   │   └── reviews/                 # Reviews feature
│   │       ├── domain/
│   │       ├── data/
│   │       └── presentation/
│   │
│   ├── core/                        # Deprecated (use features instead)
│   │
│   ├── shared/                      # Shared code across features
│   │   ├── presentation/
│   │   │   ├── components/          # Reusable UI components
│   │   │   │   ├── atoms/           # Basic components
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Text.tsx
│   │   │   │   │   └── Icon.tsx
│   │   │   │   ├── molecules/       # Composite components
│   │   │   │   │   ├── FormInput.tsx
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   └── SearchBar.tsx
│   │   │   │   └── organisms/       # Complex components
│   │   │   │       ├── Header.tsx
│   │   │   │       ├── Footer.tsx
│   │   │   │       └── Modal.tsx
│   │   │   ├── navigation/          # Navigation configuration
│   │   │   │   ├── AppNavigator.tsx
│   │   │   │   ├── CustomerNavigator.tsx
│   │   │   │   ├── VendorNavigator.tsx
│   │   │   │   ├── DriverNavigator.tsx
│   │   │   │   └── AdminNavigator.tsx
│   │   │   ├── hooks/               # Shared custom hooks
│   │   │   │   ├── useFirestore.ts
│   │   │   │   ├── useLocation.ts
│   │   │   │   ├── useNotifications.ts
│   │   │   │   └── useDebounce.ts
│   │   │   └── styles/              # Shared styles
│   │   │       ├── theme.ts
│   │   │       ├── colors.ts
│   │   │       ├── typography.ts
│   │   │       └── spacing.ts
│   │   │
│   │   ├── utils/                   # Utility functions
│   │   │   ├── validation.ts
│   │   │   ├── formatting.ts
│   │   │   ├── errorHandling.ts
│   │   │   └── dateHelpers.ts
│   │   │
│   │   ├── constants/               # App constants
│   │   │   ├── routes.ts
│   │   │   ├── api.ts
│   │   │   └── config.ts
│   │   │
│   │   └── types/                   # Shared TypeScript types
│   │       ├── common.ts
│   │       ├── navigation.ts
│   │       └── api.ts
│   │
│   ├── config/                      # App configuration
│   │   ├── firebase.ts
│   │   ├── stripe.ts
│   │   └── environment.ts
│   │
│   └── store/                       # Global state management
│       ├── index.ts
│       ├── rootReducer.ts
│       └── middleware/
│
├── assets/                          # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── __tests__/                       # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .expo/
├── .vscode/
├── firebase/
│   ├── firestore.rules
│   ├── firestore.indexes.json
│   └── storage.rules
│
├── App.tsx                          # App entry point
├── app.json
├── package.json
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
├── .gitignore
└── README.md
```

---

## Layer Descriptions

### 1. Domain Layer (Business Logic)

**Purpose:** Contains the core business logic and rules, independent of frameworks and UI.

#### Entities
Pure business objects that represent core concepts.

```typescript
// src/features/products/domain/entities/Product.ts
export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public vendorId: string,
    public categoryId: string,
    public imageUrls: string[],
    public stockQuantity: number
  ) {}

  get isInStock(): boolean {
    return this.stockQuantity > 0;
  }

  get isLowStock(): boolean {
    return this.stockQuantity > 0 && this.stockQuantity <= 10;
  }

  updateStock(quantity: number): void {
    this.stockQuantity = quantity;
  }
}
```

#### Repositories (Interfaces)
Define contracts for data access without implementation details.

```typescript
// src/features/products/domain/repositories/ProductRepository.ts
import { Product } from '../entities/Product';

export interface ProductRepository {
  getById(id: string): Promise<Product>;
  getAll(filters?: ProductFilters): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
  searchByName(query: string): Promise<Product[]>;
}

export interface ProductFilters {
  categoryId?: string;
  vendorId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}
```

#### Use Cases
Encapsulate business logic for specific actions.

```typescript
// src/features/products/domain/usecases/SearchProductsUseCase.ts
import { Product } from '../entities/Product';
import { ProductRepository, ProductFilters } from '../repositories/ProductRepository';

export class SearchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(query: string, filters?: ProductFilters): Promise<Product[]> {
    // Business logic
    if (query.trim().length < 2) {
      throw new Error('Search query must be at least 2 characters');
    }

    const products = await this.productRepository.searchByName(query);
    
    // Apply additional filters
    return this.applyFilters(products, filters);
  }

  private applyFilters(products: Product[], filters?: ProductFilters): Product[] {
    if (!filters) return products;

    return products.filter(product => {
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      if (filters.inStock && !product.isInStock) return false;
      if (filters.categoryId && product.categoryId !== filters.categoryId) return false;
      return true;
    });
  }
}
```

### 2. Data Layer (Data Access)

**Purpose:** Implements repository interfaces and handles data sources.

#### Repository Implementation

```typescript
// src/features/products/data/repositories/ProductRepositoryImpl.ts
import { 
  ProductRepository, 
  ProductFilters 
} from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';
import { ProductRemoteDataSource } from '../datasources/ProductRemoteDataSource';
import { ProductMapper } from '../models/ProductMapper';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private remoteDataSource: ProductRemoteDataSource) {}

  async getById(id: string): Promise<Product> {
    const productModel = await this.remoteDataSource.fetchProductById(id);
    return ProductMapper.toDomain(productModel);
  }

  async getAll(filters?: ProductFilters): Promise<Product[]> {
    const productModels = await this.remoteDataSource.fetchProducts(filters);
    return productModels.map(ProductMapper.toDomain);
  }

  async create(product: Product): Promise<Product> {
    const productModel = ProductMapper.toModel(product);
    const created = await this.remoteDataSource.createProduct(productModel);
    return ProductMapper.toDomain(created);
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const productModel = ProductMapper.toModel(product as Product);
    const updated = await this.remoteDataSource.updateProduct(id, productModel);
    return ProductMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.remoteDataSource.deleteProduct(id);
  }

  async searchByName(query: string): Promise<Product[]> {
    const productModels = await this.remoteDataSource.searchProducts(query);
    return productModels.map(ProductMapper.toDomain);
  }
}
```

#### Data Sources

```typescript
// src/features/products/data/datasources/ProductRemoteDataSource.ts
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
  orderBy 
} from 'firebase/firestore';
import { db } from '@config/firebase';
import { ProductModel } from '../models/ProductModel';

export class ProductRemoteDataSource {
  private collectionRef = collection(db, 'products');

  async fetchProductById(id: string): Promise<ProductModel> {
    const docRef = doc(this.collectionRef, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Product not found');
    }
    
    return { id: docSnap.id, ...docSnap.data() } as ProductModel;
  }

  async fetchProducts(filters?: any): Promise<ProductModel[]> {
    let q = query(this.collectionRef);
    
    if (filters?.categoryId) {
      q = query(q, where('categoryId', '==', filters.categoryId));
    }
    
    if (filters?.vendorId) {
      q = query(q, where('vendorId', '==', filters.vendorId));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProductModel[];
  }

  async createProduct(product: ProductModel): Promise<ProductModel> {
    const docRef = await addDoc(this.collectionRef, product);
    return { ...product, id: docRef.id };
  }

  async updateProduct(id: string, product: Partial<ProductModel>): Promise<ProductModel> {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, product);
    return this.fetchProductById(id);
  }

  async deleteProduct(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }

  async searchProducts(query: string): Promise<ProductModel[]> {
    // Implement search logic
    const q = query(
      this.collectionRef,
      where('searchName', '>=', query.toLowerCase()),
      where('searchName', '<=', query.toLowerCase() + '\uf8ff'),
      orderBy('searchName')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ProductModel[];
  }
}
```

#### Models & Mappers

```typescript
// src/features/products/data/models/ProductModel.ts
export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  price: number;
  vendorId: string;
  categoryId: string;
  imageUrls: string[];
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

// src/features/products/data/models/ProductMapper.ts
import { Product } from '../../domain/entities/Product';
import { ProductModel } from './ProductModel';

export class ProductMapper {
  static toDomain(model: ProductModel): Product {
    return new Product(
      model.id!,
      model.name,
      model.description,
      model.price,
      model.vendorId,
      model.categoryId,
      model.imageUrls,
      model.stockQuantity
    );
  }

  static toModel(domain: Product): ProductModel {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      price: domain.price,
      vendorId: domain.vendorId,
      categoryId: domain.categoryId,
      imageUrls: domain.imageUrls,
      stockQuantity: domain.stockQuantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
```

### 3. Presentation Layer (UI)

**Purpose:** Handles user interface, user interactions, and state management.

#### Screens

```typescript
// src/features/products/presentation/screens/ProductListScreen.tsx
import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '@shared/presentation/components/molecules/SearchBar';
import { LoadingSpinner } from '@shared/presentation/components/atoms/LoadingSpinner';

export const ProductListScreen: React.FC = () => {
  const { 
    products, 
    loading, 
    error, 
    searchProducts, 
    filterProducts 
  } = useProducts();

  useEffect(() => {
    searchProducts('');
  }, []);

  const handleSearch = (query: string) => {
    searchProducts(query);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
```

#### Custom Hooks

```typescript
// src/features/products/presentation/hooks/useProducts.ts
import { useState, useCallback } from 'react';
import { Product } from '../../domain/entities/Product';
import { SearchProductsUseCase } from '../../domain/usecases/SearchProductsUseCase';
import { ProductRepositoryImpl } from '../../data/repositories/ProductRepositoryImpl';
import { ProductRemoteDataSource } from '../../data/datasources/ProductRemoteDataSource';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dependency injection
  const dataSource = new ProductRemoteDataSource();
  const repository = new ProductRepositoryImpl(dataSource);
  const searchUseCase = new SearchProductsUseCase(repository);

  const searchProducts = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchUseCase.execute(query);
      setProducts(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    searchProducts,
  };
};
```

#### State Management (Redux Toolkit)

```typescript
// src/features/products/presentation/state/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../domain/entities/Product';
import { ProductRepositoryImpl } from '../../data/repositories/ProductRepositoryImpl';
import { ProductRemoteDataSource } from '../../data/datasources/ProductRemoteDataSource';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const dataSource = new ProductRemoteDataSource();
    const repository = new ProductRepositoryImpl(dataSource);
    return await repository.getAll();
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query: string) => {
    const dataSource = new ProductRemoteDataSource();
    const repository = new ProductRepositoryImpl(dataSource);
    return await repository.searchByName(query);
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
```

---

## Dependency Injection

Use a simple DI container for managing dependencies:

```typescript
// src/shared/di/container.ts
import { ProductRepository } from '@features/products/domain/repositories/ProductRepository';
import { ProductRepositoryImpl } from '@features/products/data/repositories/ProductRepositoryImpl';
import { ProductRemoteDataSource } from '@features/products/data/datasources/ProductRemoteDataSource';

class DIContainer {
  private static instance: DIContainer;
  private services: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  register<T>(key: string, factory: () => T): void {
    this.services.set(key, factory);
  }

  resolve<T>(key: string): T {
    const factory = this.services.get(key);
    if (!factory) {
      throw new Error(`Service ${key} not registered`);
    }
    return factory();
  }
}

// Register services
const container = DIContainer.getInstance();

container.register<ProductRepository>('ProductRepository', () => {
  const dataSource = new ProductRemoteDataSource();
  return new ProductRepositoryImpl(dataSource);
});

export default container;
```

---

## Navigation Structure

```typescript
// src/shared/presentation/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@features/auth/presentation/hooks/useAuth';
import { AuthNavigator } from './AuthNavigator';
import { CustomerNavigator } from './CustomerNavigator';
import { VendorNavigator } from './VendorNavigator';
import { DriverNavigator } from './DriverNavigator';
import { AdminNavigator } from './AdminNavigator';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  const getUserNavigator = () => {
    if (!user) return <AuthNavigator />;
    
    switch (user.userType) {
      case 'customer':
        return <CustomerNavigator />;
      case 'vendor':
        return <VendorNavigator />;
      case 'driver':
        return <DriverNavigator />;
      case 'admin':
        return <AdminNavigator />;
      default:
        return <AuthNavigator />;
    }
  };

  return (
    <NavigationContainer>
      {getUserNavigator()}
    </NavigationContainer>
  );
};
```

---

## Testing Strategy

### Unit Tests (Domain Layer)

```typescript
// __tests__/unit/features/products/domain/usecases/SearchProductsUseCase.test.ts
import { SearchProductsUseCase } from '@features/products/domain/usecases/SearchProductsUseCase';
import { ProductRepository } from '@features/products/domain/repositories/ProductRepository';
import { Product } from '@features/products/domain/entities/Product';

describe('SearchProductsUseCase', () => {
  let useCase: SearchProductsUseCase;
  let mockRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepository = {
      searchByName: jest.fn(),
    } as any;
    
    useCase = new SearchProductsUseCase(mockRepository);
  });

  it('should search products successfully', async () => {
    const mockProducts = [
      new Product('1', 'Product 1', 'Description', 10, 'v1', 'c1', [], 5),
    ];
    
    mockRepository.searchByName.mockResolvedValue(mockProducts);
    
    const result = await useCase.execute('Product');
    
    expect(result).toEqual(mockProducts);
    expect(mockRepository.searchByName).toHaveBeenCalledWith('Product');
  });

  it('should throw error for short queries', async () => {
    await expect(useCase.execute('a')).rejects.toThrow(
      'Search query must be at least 2 characters'
    );
  });
});
```

---

## Best Practices

### 1. **Feature Organization**
- Each feature is self-contained with its own domain, data, and presentation layers
- Features should not depend on other features directly
- Use shared code for cross-cutting concerns

### 2. **Naming Conventions**
- Entities: `Product`, `Order`, `User`
- Use Cases: `SearchProductsUseCase`, `CreateOrderUseCase`
- Repositories: `ProductRepository`, `OrderRepository`
- Screens: `ProductListScreen`, `CheckoutScreen`
- Components: `ProductCard`, `OrderSummary`

### 3. **Code Style**
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write unit tests for business logic
- Document complex logic with comments

### 4. **State Management**
- Use Redux Toolkit for global state
- Use local state (useState) for component-specific state
- Use React Context for theme, auth, etc.

### 5. **Error Handling**
- Use try-catch in use cases and repositories
- Create custom error classes for specific errors
- Display user-friendly error messages in UI

---

## Next Steps

1. Review this architecture guide
2. Set up your development environment (SETUP_GUIDE.md)
3. Review the sprint plan (SPRINT_PLAN.md)
4. Start implementing Sprint 1 features
5. Follow the clean architecture principles throughout development

