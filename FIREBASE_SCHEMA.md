# GLAMGO - Firebase Firestore Database Schema

## Overview
This schema follows Firestore best practices for scalability, including:
- Denormalization where needed for read performance
- Subcollections for related data
- Composite indexes for complex queries
- Proper security rules considerations
- Scalable structure for millions of documents

---

## Collections Structure

```
firestore/
├── users/
│   ├── {userId}/
│   │   ├── addresses/ (subcollection)
│   │   ├── paymentMethods/ (subcollection)
│   │   └── notifications/ (subcollection)
├── vendors/
│   ├── {vendorId}/
│   │   ├── products/ (subcollection)
│   │   ├── orders/ (subcollection)
│   │   └── analytics/ (subcollection)
├── products/
│   └── {productId}/
├── orders/
│   ├── {orderId}/
│   │   └── items/ (subcollection)
├── deliveries/
│   └── {deliveryId}/
├── drivers/
│   ├── {driverId}/
│   │   ├── earnings/ (subcollection)
│   │   └── deliveries/ (subcollection)
├── reviews/
│   └── {reviewId}/
├── categories/
│   └── {categoryId}/
├── promoCodes/
│   └── {promoCodeId}/
└── admin/
    └── settings/
```

---

## 1. Users Collection

**Path:** `/users/{userId}`

```typescript
{
  // User Identity
  userId: string,                    // Firebase Auth UID
  email: string,
  phoneNumber: string,
  displayName: string,
  profilePhotoURL?: string,
  
  // User Type
  userType: 'customer' | 'vendor' | 'driver' | 'admin',
  
  // Authentication
  authProviders: string[],           // ['password', 'google', 'apple']
  emailVerified: boolean,
  phoneVerified: boolean,
  
  // Profile Information
  firstName: string,
  lastName: string,
  dateOfBirth?: Timestamp,
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say',
  
  // Location
  defaultAddressId?: string,
  
  // Preferences
  preferences: {
    notifications: {
      push: boolean,
      email: boolean,
      sms: boolean,
      orderUpdates: boolean,
      promotions: boolean,
    },
    language: string,                // 'en', 'es', etc.
    theme: 'light' | 'dark' | 'auto',
  },
  
  // Status & Stats
  status: 'active' | 'suspended' | 'banned',
  totalOrders: number,
  lifetimeSpend: number,
  averageOrderValue: number,
  favoriteVendorIds: string[],       // Array of vendor IDs (max 50)
  
  // Cart (for persistence)
  cartItems: Array<{
    productId: string,
    vendorId: string,
    quantity: number,
    addedAt: Timestamp,
  }>,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLoginAt: Timestamp,
  
  // Search
  searchName: string,                // Lowercase for search
  searchEmail: string,               // Lowercase for search
}
```

### Subcollection: Addresses
**Path:** `/users/{userId}/addresses/{addressId}`

```typescript
{
  addressId: string,
  label: string,                     // 'Home', 'Work', 'Other'
  isDefault: boolean,
  
  // Address Details
  street: string,
  apartment?: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  
  // Geolocation
  coordinates: GeoPoint,             // For distance calculations
  placeId?: string,                  // Google Maps Place ID
  
  // Delivery Instructions
  instructions?: string,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastUsedAt?: Timestamp,
}
```

### Subcollection: Payment Methods
**Path:** `/users/{userId}/paymentMethods/{paymentMethodId}`

```typescript
{
  paymentMethodId: string,
  isDefault: boolean,
  
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay',
  
  // Card Info (tokenized via Stripe)
  stripePaymentMethodId: string,
  last4?: string,
  brand?: string,                    // 'visa', 'mastercard', 'amex'
  expiryMonth?: number,
  expiryYear?: number,
  
  // Billing Address
  billingAddress: {
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
  },
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

### Subcollection: Notifications
**Path:** `/users/{userId}/notifications/{notificationId}`

```typescript
{
  notificationId: string,
  type: 'order_update' | 'promotion' | 'system' | 'message',
  title: string,
  message: string,
  
  // Status
  read: boolean,
  readAt?: Timestamp,
  
  // Action
  actionType?: 'open_order' | 'open_product' | 'open_url',
  actionData?: any,
  
  // Priority
  priority: 'high' | 'normal' | 'low',
  
  // Metadata
  createdAt: Timestamp,
  expiresAt?: Timestamp,
}
```

---

## 2. Vendors Collection

**Path:** `/vendors/{vendorId}`

```typescript
{
  // Vendor Identity
  vendorId: string,
  userId: string,                    // Reference to users collection
  
  // Business Information
  businessName: string,
  businessEmail: string,
  businessPhone: string,
  description: string,
  
  // Branding
  logoURL: string,
  bannerURL?: string,
  storePhotos: string[],             // Array of image URLs (max 10)
  
  // Location
  address: {
    street: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    coordinates: GeoPoint,
  },
  
  // Operating Hours
  hours: {
    monday: { open: string, close: string, isClosed: boolean },
    tuesday: { open: string, close: string, isClosed: boolean },
    wednesday: { open: string, close: string, isClosed: boolean },
    thursday: { open: string, close: string, isClosed: boolean },
    friday: { open: string, close: string, isClosed: boolean },
    saturday: { open: string, close: string, isClosed: boolean },
    sunday: { open: string, close: string, isClosed: boolean },
  },
  
  // Delivery Settings
  deliveryRadius: number,            // In miles
  minimumOrderAmount: number,
  estimatedPrepTime: number,         // In minutes
  deliveryFee: number,
  freeDeliveryThreshold?: number,
  
  // Business Documents
  documents: {
    businessLicense: string,         // Storage URL
    taxId: string,
    insuranceCertificate?: string,
  },
  
  // Payment Information
  stripeAccountId: string,           // Stripe Connect account
  bankAccountVerified: boolean,
  commissionRate: number,            // Platform commission (e.g., 0.15 = 15%)
  
  // Stats & Performance
  stats: {
    totalProducts: number,
    activeProducts: number,
    totalOrders: number,
    completedOrders: number,
    cancelledOrders: number,
    averageRating: number,
    totalReviews: number,
    averageAcceptanceTime: number,  // In seconds
    averagePrepTime: number,        // In minutes
    onTimeRate: number,             // Percentage
    lifetimeRevenue: number,
  },
  
  // Status
  status: 'pending' | 'active' | 'suspended' | 'closed',
  isVerified: boolean,
  isFeatured: boolean,
  isAcceptingOrders: boolean,
  
  // Categories
  categories: string[],              // Primary categories sold
  
  // Policies
  policies: {
    returns: string,
    refunds: string,
    cancellation: string,
  },
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  approvedAt?: Timestamp,
  approvedBy?: string,               // Admin userId
  
  // Search
  searchName: string,                // Lowercase for search
  searchCity: string,
}
```

### Subcollection: Vendor Products
**Path:** `/vendors/{vendorId}/products/{productId}`

```typescript
{
  productId: string,                 // Also exists in global products collection
  
  // Vendor-specific data
  costPrice: number,                 // Vendor's cost (private)
  stockQuantity: number,
  lowStockThreshold: number,
  sku?: string,                      // Vendor's internal SKU
  
  // Visibility
  isActive: boolean,
  isFeatured: boolean,
  
  // Sales Data
  totalSold: number,
  revenue: number,
  
  // Metadata
  addedAt: Timestamp,
  updatedAt: Timestamp,
}
```

### Subcollection: Vendor Orders
**Path:** `/vendors/{vendorId}/orders/{orderId}`

```typescript
{
  orderId: string,                   // Reference to main orders collection
  
  // Quick access fields (denormalized)
  customerId: string,
  customerName: string,
  status: string,
  total: number,
  itemCount: number,
  
  // Vendor Actions
  acceptedAt?: Timestamp,
  preparedAt?: Timestamp,
  readyAt?: Timestamp,
  
  // Metadata
  createdAt: Timestamp,
}
```

### Subcollection: Vendor Analytics
**Path:** `/vendors/{vendorId}/analytics/{date}`

```typescript
{
  date: string,                      // YYYY-MM-DD
  
  // Daily metrics
  orders: number,
  revenue: number,
  averageOrderValue: number,
  newCustomers: number,
  returningCustomers: number,
  
  // Product performance
  topProducts: Array<{
    productId: string,
    name: string,
    unitsSold: number,
    revenue: number,
  }>,
  
  // Time-based
  peakHours: { [hour: string]: number },
  
  createdAt: Timestamp,
}
```

---

## 3. Products Collection (Global)

**Path:** `/products/{productId}`

```typescript
{
  // Product Identity
  productId: string,
  vendorId: string,                  // Reference to vendor
  
  // Basic Information
  name: string,
  brand: string,
  description: string,
  categoryId: string,
  subcategoryId?: string,
  
  // Images
  images: Array<{
    url: string,
    order: number,
    isPrimary: boolean,
  }>,
  thumbnailURL: string,
  
  // Pricing
  price: number,
  compareAtPrice?: number,           // Original price if on sale
  discountPercentage?: number,
  
  // Variants (for size, color, etc.)
  hasVariants: boolean,
  variants?: Array<{
    variantId: string,
    name: string,                    // 'Small', 'Large', 'Red', etc.
    type: string,                    // 'size', 'color', etc.
    price?: number,                  // If different from base price
    stockQuantity: number,
    sku?: string,
  }>,
  
  // Inventory (for single variant products)
  stockQuantity?: number,
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock',
  
  // Product Details
  details: {
    weight?: number,
    dimensions?: { length: number, width: number, height: number },
    ingredients?: string,
    instructions?: string,
    warnings?: string,
  },
  
  // Tags & Search
  tags: string[],                    // ['natural', 'vegan', 'organic']
  searchKeywords: string[],
  
  // Stats
  stats: {
    views: number,
    totalSold: number,
    averageRating: number,
    totalReviews: number,
    favoriteCount: number,
  },
  
  // Status
  isActive: boolean,
  isFeatured: boolean,
  isVerified: boolean,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Denormalized Vendor Info (for quick access)
  vendor: {
    name: string,
    logoURL: string,
    rating: number,
    coordinates: GeoPoint,
  },
  
  // Search Fields
  searchName: string,                // Lowercase
  searchBrand: string,
  searchCategory: string,
}
```

---

## 4. Orders Collection

**Path:** `/orders/{orderId}`

```typescript
{
  // Order Identity
  orderId: string,                   // e.g., "GLAM-2026-001234"
  orderNumber: string,               // Display number
  
  // Parties
  customerId: string,
  customerName: string,
  vendorId: string,
  vendorName: string,
  driverId?: string,
  driverName?: string,
  
  // Order Status
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'assigned' | 
          'picked_up' | 'in_transit' | 'delivered' | 'cancelled' | 'refunded',
  
  // Order Items (summary)
  items: Array<{
    productId: string,
    productName: string,
    brand: string,
    imageURL: string,
    quantity: number,
    price: number,              // Price at time of order
    variantId?: string,
    variantName?: string,
    subtotal: number,
  }>,
  itemCount: number,
  
  // Pricing Breakdown
  pricing: {
    subtotal: number,
    deliveryFee: number,
    serviceFee: number,
    tax: number,
    discount: number,
    promoCode?: string,
    tip?: number,
    total: number,
  },
  
  // Delivery Information
  delivery: {
    address: {
      street: string,
      apartment?: string,
      city: string,
      state: string,
      zipCode: string,
      coordinates: GeoPoint,
    },
    instructions?: string,
    contactName: string,
    contactPhone: string,
    
    type: 'standard' | 'express',
    estimatedPickupTime: Timestamp,
    estimatedDeliveryTime: Timestamp,
    actualPickupTime?: Timestamp,
    actualDeliveryTime?: Timestamp,
  },
  
  // Payment Information
  payment: {
    method: 'card' | 'paypal' | 'apple_pay' | 'google_pay',
    status: 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded',
    transactionId: string,          // Stripe payment intent ID
    last4?: string,
    brand?: string,
    paidAt?: Timestamp,
  },
  
  // Timeline
  timeline: Array<{
    status: string,
    timestamp: Timestamp,
    note?: string,
    updatedBy: string,              // userId or system
  }>,
  
  // Proof of Delivery
  proofOfDelivery?: {
    method: 'photo' | 'signature',
    photoURL?: string,
    signature?: string,
    notes?: string,
    completedAt: Timestamp,
  },
  
  // Ratings & Reviews
  customerRating?: {
    overall: number,
    vendorRating: number,
    driverRating: number,
    productQuality: number,
    review?: string,
    ratedAt: Timestamp,
  },
  
  // Cancellation/Issues
  cancellation?: {
    cancelledBy: 'customer' | 'vendor' | 'driver' | 'admin',
    reason: string,
    cancelledAt: Timestamp,
    refundAmount?: number,
    refundStatus?: string,
  },
  
  // Special Flags
  isGift: boolean,
  isPriority: boolean,
  hasIssue: boolean,
  issueDescription?: string,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  completedAt?: Timestamp,
  
  // Indexes for queries
  statusIndex: string,               // `${status}_${createdAt.toMillis()}`
  vendorStatusIndex: string,         // `${vendorId}_${status}`
  customerStatusIndex: string,       // `${customerId}_${status}`
  driverStatusIndex?: string,        // `${driverId}_${status}`
}
```

### Subcollection: Order Items (Detailed)
**Path:** `/orders/{orderId}/items/{itemId}`

```typescript
{
  itemId: string,
  productId: string,
  variantId?: string,
  
  // Product Details (snapshot at order time)
  productName: string,
  brand: string,
  description: string,
  imageURL: string,
  
  // Pricing
  price: number,
  quantity: number,
  subtotal: number,
  tax: number,
  total: number,
  
  // Vendor
  vendorId: string,
  vendorName: string,
  
  // Item-specific notes
  specialInstructions?: string,
  
  // Status
  status: 'pending' | 'confirmed' | 'prepared' | 'delivered' | 'returned',
  
  // Metadata
  addedAt: Timestamp,
}
```

---

## 5. Deliveries Collection

**Path:** `/deliveries/{deliveryId}`

```typescript
{
  // Delivery Identity
  deliveryId: string,
  orderId: string,                   // Reference to order
  
  // Parties
  vendorId: string,
  vendorName: string,
  customerId: string,
  customerName: string,
  driverId?: string,
  driverName?: string,
  
  // Status
  status: 'pending' | 'assigned' | 'accepted' | 'at_vendor' | 
          'picked_up' | 'in_transit' | 'arrived' | 'completed' | 
          'cancelled' | 'failed',
  
  // Locations
  pickup: {
    address: string,
    coordinates: GeoPoint,
    contactName: string,
    contactPhone: string,
    instructions?: string,
    arrivedAt?: Timestamp,
    pickedUpAt?: Timestamp,
  },
  
  dropoff: {
    address: string,
    coordinates: GeoPoint,
    contactName: string,
    contactPhone: string,
    instructions?: string,
    arrivedAt?: Timestamp,
    deliveredAt?: Timestamp,
  },
  
  // Route & Distance
  estimatedDistance: number,         // In miles
  actualDistance?: number,
  estimatedDuration: number,         // In minutes
  actualDuration?: number,
  
  // Driver Location Tracking
  driverLocation?: GeoPoint,         // Updated in real-time
  lastLocationUpdate?: Timestamp,
  
  // Earnings
  earnings: {
    baseFee: number,
    distanceFee: number,
    timeFee: number,
    tip: number,
    total: number,
  },
  
  // Timeline
  timeline: Array<{
    status: string,
    timestamp: Timestamp,
    coordinates?: GeoPoint,
  }>,
  
  // Delivery Details
  priority: 'standard' | 'express',
  packageSize: 'small' | 'medium' | 'large',
  fragile: boolean,
  
  // Proof of Delivery
  proof?: {
    method: 'photo' | 'signature' | 'contactless',
    photoURL?: string,
    signatureURL?: string,
    notes?: string,
    recipientName?: string,
  },
  
  // Issues
  issues?: Array<{
    type: 'delay' | 'wrong_address' | 'customer_unavailable' | 'damaged' | 'other',
    description: string,
    reportedAt: Timestamp,
    reportedBy: string,
    resolved: boolean,
  }>,
  
  // Ratings
  customerRating?: {
    rating: number,
    review?: string,
    ratedAt: Timestamp,
  },
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  assignedAt?: Timestamp,
  completedAt?: Timestamp,
  
  // Indexes
  statusIndex: string,               // `${status}_${createdAt.toMillis()}`
  driverStatusIndex?: string,        // `${driverId}_${status}`
}
```

---

## 6. Drivers Collection

**Path:** `/drivers/{driverId}`

```typescript
{
  // Driver Identity
  driverId: string,
  userId: string,                    // Reference to users collection
  
  // Personal Information
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  photoURL?: string,
  dateOfBirth: Timestamp,
  
  // Documents
  documents: {
    driversLicense: {
      number: string,
      expiryDate: Timestamp,
      state: string,
      photoURL: string,
      verified: boolean,
    },
    vehicleRegistration: {
      licensePlate: string,
      state: string,
      expiryDate: Timestamp,
      photoURL: string,
      verified: boolean,
    },
    insurance: {
      provider: string,
      policyNumber: string,
      expiryDate: Timestamp,
      photoURL: string,
      verified: boolean,
    },
    backgroundCheck: {
      status: 'pending' | 'approved' | 'rejected',
      completedAt?: Timestamp,
      expiryDate?: Timestamp,
    },
  },
  
  // Vehicle Information
  vehicle: {
    make: string,
    model: string,
    year: number,
    color: string,
    licensePlate: string,
    type: 'car' | 'motorcycle' | 'bicycle' | 'scooter',
    photoURL?: string,
  },
  
  // Banking Information
  banking: {
    accountHolderName: string,
    stripeAccountId: string,         // Stripe Connect
    accountVerified: boolean,
    lastPayoutAt?: Timestamp,
  },
  
  // Availability
  availability: {
    isOnline: boolean,
    currentStatus: 'offline' | 'available' | 'busy' | 'delivering',
    lastStatusChange: Timestamp,
    preferredZones: string[],        // Array of city/area names
    workingHours?: {
      monday: { start: string, end: string, working: boolean },
      tuesday: { start: string, end: string, working: boolean },
      wednesday: { start: string, end: string, working: boolean },
      thursday: { start: string, end: string, working: boolean },
      friday: { start: string, end: string, working: boolean },
      saturday: { start: string, end: string, working: boolean },
      sunday: { start: string, end: string, working: boolean },
    },
  },
  
  // Current Location & Activity
  currentLocation?: GeoPoint,
  lastLocationUpdate?: Timestamp,
  currentDeliveryId?: string,
  
  // Stats & Performance
  stats: {
    totalDeliveries: number,
    completedDeliveries: number,
    cancelledDeliveries: number,
    averageRating: number,
    totalReviews: number,
    acceptanceRate: number,          // Percentage
    completionRate: number,
    onTimeRate: number,
    averageDeliveryTime: number,     // In minutes
    totalEarnings: number,
    totalDistance: number,           // In miles
    totalTips: number,
  },
  
  // Earnings
  earnings: {
    availableBalance: number,
    pendingBalance: number,
    lifetimeEarnings: number,
    lastPayoutAmount?: number,
    lastPayoutAt?: Timestamp,
    nextPayoutDate?: Timestamp,
  },
  
  // Status
  status: 'pending' | 'active' | 'suspended' | 'deactivated',
  approvalStatus: 'pending' | 'approved' | 'rejected',
  
  // Ratings & Reviews
  recentRatings: Array<{
    orderId: string,
    rating: number,
    review?: string,
    customerId: string,
    createdAt: Timestamp,
  }>,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  approvedAt?: Timestamp,
  approvedBy?: string,
  lastActiveAt: Timestamp,
}
```

### Subcollection: Driver Earnings
**Path:** `/drivers/{driverId}/earnings/{earningId}`

```typescript
{
  earningId: string,
  deliveryId: string,
  orderId: string,
  
  // Breakdown
  baseFee: number,
  distanceFee: number,
  timeFee: number,
  bonus: number,
  tip: number,
  total: number,
  
  // Commission
  platformFee: number,               // Platform's cut
  driverPayout: number,
  
  // Status
  status: 'pending' | 'available' | 'paid_out',
  paidOutAt?: Timestamp,
  payoutBatchId?: string,
  
  // Metadata
  earnedAt: Timestamp,
  createdAt: Timestamp,
}
```

### Subcollection: Driver Deliveries
**Path:** `/drivers/{driverId}/deliveries/{deliveryId}`

```typescript
{
  deliveryId: string,
  orderId: string,
  
  // Quick access (denormalized)
  customerName: string,
  vendorName: string,
  total: number,
  earnings: number,
  status: string,
  
  // Performance
  acceptedAt: Timestamp,
  pickedUpAt?: Timestamp,
  deliveredAt?: Timestamp,
  duration?: number,                 // In minutes
  
  // Rating
  rating?: number,
  
  // Metadata
  createdAt: Timestamp,
}
```

---

## 7. Reviews Collection

**Path:** `/reviews/{reviewId}`

```typescript
{
  // Review Identity
  reviewId: string,
  
  // Related Entities
  orderId: string,
  customerId: string,
  customerName: string,
  customerPhotoURL?: string,
  
  // Review Target
  targetType: 'product' | 'vendor' | 'driver',
  targetId: string,                  // productId, vendorId, or driverId
  targetName: string,
  
  // Ratings (1-5 stars)
  rating: number,
  
  // Product-specific ratings
  productQuality?: number,
  valueForMoney?: number,
  matchesDescription?: number,
  
  // Vendor-specific ratings
  productSelection?: number,
  vendorService?: number,
  packagingQuality?: number,
  
  // Driver-specific ratings
  timeliness?: number,
  professionalism?: number,
  communication?: number,
  
  // Review Content
  title?: string,
  review?: string,
  pros?: string,
  cons?: string,
  
  // Media
  photos: string[],                  // Array of photo URLs
  videos?: string[],
  
  // Verification
  isVerifiedPurchase: boolean,
  
  // Interaction
  helpful: number,                   // Number of helpful votes
  notHelpful: number,
  flagged: boolean,
  flagReason?: string,
  
  // Vendor Response
  vendorResponse?: {
    message: string,
    respondedAt: Timestamp,
    respondedBy: string,
  },
  
  // Status
  status: 'published' | 'pending' | 'hidden' | 'removed',
  moderationNote?: string,
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Indexes
  targetIndex: string,               // `${targetType}_${targetId}_${rating}`
  ratingIndex: number,               // For sorting
}
```

---

## 8. Categories Collection

**Path:** `/categories/{categoryId}`

```typescript
{
  categoryId: string,
  name: string,
  description: string,
  iconURL: string,
  bannerURL?: string,
  
  // Hierarchy
  parentCategoryId?: string,         // For subcategories
  order: number,                     // Display order
  level: number,                     // 0 = top level, 1 = subcategory
  
  // Subcategories
  subcategoryIds: string[],
  
  // Stats
  productCount: number,
  vendorCount: number,
  
  // Status
  isActive: boolean,
  isFeatured: boolean,
  
  // SEO
  slug: string,
  searchKeywords: string[],
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

---

## 9. Promo Codes Collection

**Path:** `/promoCodes/{promoCodeId}`

```typescript
{
  promoCodeId: string,
  code: string,                      // e.g., "GLAM20"
  
  // Discount Details
  discountType: 'percentage' | 'fixed' | 'free_delivery',
  discountValue: number,             // 20 for 20% or $20
  maxDiscount?: number,              // Max discount amount for percentage
  minOrderAmount?: number,           // Minimum order to apply
  
  // Validity
  validFrom: Timestamp,
  validUntil: Timestamp,
  isActive: boolean,
  
  // Usage Limits
  maxTotalUses?: number,             // Total uses across all users
  maxUsesPerUser?: number,           // Per user limit
  currentUses: number,
  
  // Restrictions
  applicableTo: 'all' | 'first_order' | 'specific_vendors' | 'specific_products',
  vendorIds?: string[],              // If applicable to specific vendors
  productIds?: string[],
  excludedVendorIds?: string[],
  excludedProductIds?: string[],
  userEligibility: 'all' | 'new_users' | 'specific_users',
  eligibleUserIds?: string[],
  
  // Tracking
  usedBy: string[],                  // Array of userIds (limited to recent)
  totalRevenue: number,
  totalOrders: number,
  
  // Creator
  createdBy: string,                 // Admin or vendor userId
  creatorType: 'admin' | 'vendor',
  
  // Metadata
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Search
  searchCode: string,                // Uppercase for search
}
```

---

## 10. Admin Settings Collection

**Path:** `/admin/settings`

```typescript
{
  // Platform Configuration
  platform: {
    name: string,
    version: string,
    maintenanceMode: boolean,
    maintenanceMessage?: string,
  },
  
  // Commission Rates
  commission: {
    vendorRate: number,              // e.g., 0.15 = 15%
    driverRate: number,
    minimumCommission: number,
  },
  
  // Delivery Settings
  delivery: {
    baseDeliveryFee: number,
    perMileRate: number,
    perMinuteRate: number,
    freeDeliveryThreshold: number,
    maxDeliveryRadius: number,
    standardDeliveryTime: number,    // In minutes
    expressDeliveryTime: number,
    expressDeliveryFee: number,
  },
  
  // Order Settings
  order: {
    minimumOrderAmount: number,
    serviceFeePercentage: number,
    taxRate: number,
    vendorAcceptanceTimeout: number, // In minutes
    driverAcceptanceTimeout: number,
    autoAssignDrivers: boolean,
  },
  
  // Payment Settings
  payment: {
    acceptedMethods: string[],
    stripePublishableKey: string,
    minimumPayoutAmount: number,
    payoutSchedule: 'daily' | 'weekly' | 'monthly',
  },
  
  // Features
  features: {
    enableReviews: boolean,
    enableChat: boolean,
    enableScheduledDelivery: boolean,
    enableLoyaltyProgram: boolean,
    enableReferrals: boolean,
  },
  
  // Thresholds
  thresholds: {
    lowStockAlert: number,
    driverMaxActiveDeliveries: number,
    orderCancellationWindow: number,  // In minutes
  },
  
  // Contact & Support
  contact: {
    supportEmail: string,
    supportPhone: string,
    emergencyPhone: string,
  },
  
  // Metadata
  updatedAt: Timestamp,
  updatedBy: string,
}
```

---

## Composite Indexes Required

Add these to `firestore.indexes.json`:

```json
{
  "indexes": [
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "customerId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "vendorId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "orders",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "driverId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "products",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "categoryId", "order": "ASCENDING" },
        { "fieldPath": "isActive", "order": "ASCENDING" },
        { "fieldPath": "stats.averageRating", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "products",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "vendorId", "order": "ASCENDING" },
        { "fieldPath": "isActive", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "deliveries",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "driverId", "order": "ASCENDING" },
        { "fieldPath": "status", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "reviews",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "targetType", "order": "ASCENDING" },
        { "fieldPath": "targetId", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "products",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "isActive", "order": "ASCENDING" },
        { "fieldPath": "vendor.coordinates", "mode": "ASCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

---

## Security Rules Considerations

Key security principles for the schema:

1. **Users**: Can read/update own profile, addresses, payment methods
2. **Vendors**: Can read/update own vendor profile and products
3. **Products**: Public read, vendor write (own products only)
4. **Orders**: Customer/vendor/driver can read own orders
5. **Deliveries**: Driver can update assigned deliveries
6. **Drivers**: Can update own availability and location
7. **Reviews**: Customer can write, public read
8. **Admin**: Full access to admin collection

---

## Scalability Best Practices Implemented

1. ✅ **Denormalization**: Store frequently accessed data together
2. ✅ **Subcollections**: Organize related data hierarchically
3. ✅ **Composite Indexes**: Optimize complex queries
4. ✅ **GeoPoints**: Enable location-based queries
5. ✅ **Arrays**: Limited to reasonable sizes (< 100 items)
6. ✅ **Pagination**: Use createdAt/updatedAt for cursor-based pagination
7. ✅ **Real-time Updates**: Structure supports efficient listeners
8. ✅ **Search Fields**: Lowercase fields for case-insensitive search
9. ✅ **Status Indexes**: Compound fields for efficient filtering
10. ✅ **Aggregation Data**: Stats stored at document level

---

## Data Migration & Seeding

Consider creating seed data for:
- Categories (Hair Care, Skincare, Makeup, etc.)
- Admin settings
- Initial promo codes for launch
- Test vendors and products

