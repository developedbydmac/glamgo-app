# 🚀 Sprint 2 Planning - GLAMGO App

**Start Date**: January 30, 2026  
**Target End Date**: February 5, 2026 (7 days)  
**Focus**: Customer Features - Product Discovery & Shopping

---

## 📊 Sprint 1 Recap

**Completed**: 17 of 21 points (81%)
- ✅ User Registration & Login
- ✅ Profile Management
- ✅ Role-Based Navigation
- ✅ Logout Functionality
- ⏸️ Google OAuth (deferred)

**Foundation Ready**: Authentication, user management, and navigation are solid. Time to build customer features!

---

## 🎯 Sprint 2 Goals

### Primary Objective
**Enable customers to browse and search for products**

### Success Criteria
- Customers can browse product catalog
- Customers can search for specific products
- Customers can view product details
- Customers can add products to shopping cart
- Clean, modern UI that matches GLAMGO branding

---

## 📋 Proposed User Stories

### High Priority (Must Have)

#### US-007: Product Catalog Browsing (8 points)
**As a customer, I want to browse available products so that I can see what's available to purchase.**

**Acceptance Criteria:**
- [ ] Display list of products with images
- [ ] Show product name, price, and rating
- [ ] Implement infinite scroll or pagination
- [ ] Pull products from Firestore
- [ ] Loading states and error handling
- [ ] Pull to refresh functionality

**Technical Notes:**
- Create Product entity and repository
- Implement ProductService for Firestore queries
- Use FlatList with performance optimization
- Product images stored in Firebase Storage

---

#### US-008: Product Search (5 points)
**As a customer, I want to search for products so that I can quickly find what I'm looking for.**

**Acceptance Criteria:**
- [ ] Search bar at top of product list
- [ ] Real-time search filtering
- [ ] Search by product name
- [ ] Display "no results" message when appropriate
- [ ] Clear search button

**Technical Notes:**
- Implement text-based search
- Debounce search input for performance
- Consider Firestore query limitations
- May need Algolia integration for advanced search later

---

#### US-009: Product Details (5 points)
**As a customer, I want to view detailed information about a product so that I can make an informed purchase decision.**

**Acceptance Criteria:**
- [ ] Display product image gallery
- [ ] Show full description
- [ ] Display price, ratings, reviews
- [ ] Show vendor information
- [ ] "Add to Cart" button
- [ ] Back navigation

**Technical Notes:**
- Create ProductDetailsScreen
- Image carousel/gallery component
- Link to vendor profile (future story)
- Prepare for cart integration

---

#### US-010: Shopping Cart (8 points)
**As a customer, I want to add products to a cart so that I can purchase multiple items at once.**

**Acceptance Criteria:**
- [ ] Add products to cart from product details
- [ ] View cart with all added items
- [ ] Update quantity of items
- [ ] Remove items from cart
- [ ] Display total price
- [ ] Cart persists in Firestore
- [ ] Cart icon with badge showing item count

**Technical Notes:**
- Create Cart entity and repository
- CartContext for global state
- Firestore cart collection per user
- Cart badge on navigation
- Quantity validation (stock limits)

---

### Medium Priority (Should Have)

#### US-011: Product Categories (3 points)
**As a customer, I want to filter products by category so that I can find relevant items faster.**

**Acceptance Criteria:**
- [ ] Display category filter chips/tabs
- [ ] Filter products by selected category
- [ ] Show all products when no filter selected
- [ ] Smooth filtering transition

**Technical Notes:**
- Define product categories (Hair, Nails, Makeup, Skincare, etc.)
- Firestore query with category filter
- Category management in admin (future)

---

#### US-012: Product Ratings & Reviews Preview (3 points)
**As a customer, I want to see product ratings and review summaries so that I can gauge product quality.**

**Acceptance Criteria:**
- [ ] Display average star rating
- [ ] Show number of reviews
- [ ] Display on product cards and details page
- [ ] Visual star rating component

**Technical Notes:**
- Review entity (full reviews in future sprint)
- Calculate average from Firestore
- Star rating reusable component
- Mock data for now if needed

---

### Low Priority (Nice to Have)

#### US-013: Favorites/Wishlist (3 points)
**As a customer, I want to save favorite products so that I can easily find them later.**

**Acceptance Criteria:**
- [ ] Heart icon on product cards
- [ ] Toggle favorite status
- [ ] View all favorites in separate screen
- [ ] Persist favorites in Firestore

---

## 📊 Story Point Estimate

| Priority | Stories | Points |
|----------|---------|--------|
| High | 4 stories | 26 points |
| Medium | 2 stories | 6 points |
| Low | 1 story | 3 points |
| **TOTAL** | **7 stories** | **35 points** |

**Recommended Sprint 2 Scope**: 26 points (High Priority only)

---

## 🏗️ Technical Architecture

### New Entities

```typescript
// Product Entity
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrls: string[];
  category: ProductCategory;
  vendorId: string;
  vendorName: string;
  stockQuantity: number;
  averageRating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

enum ProductCategory {
  HAIR = 'Hair',
  NAILS = 'Nails',
  MAKEUP = 'Makeup',
  SKINCARE = 'Skincare',
  TOOLS = 'Tools',
  ACCESSORIES = 'Accessories',
}

// Cart Entity
interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

interface Cart {
  userId: string;
  items: CartItem[];
  totalPrice: number;
  updatedAt: Date;
}
```

### New Screens

1. **ProductListScreen** - Browse all products
2. **ProductDetailsScreen** - Detailed product view
3. **CartScreen** - View shopping cart
4. **SearchResultsScreen** - Search results (may merge with ProductList)

### New Use Cases

1. **GetProductsUseCase** - Fetch products from Firestore
2. **SearchProductsUseCase** - Search products by query
3. **GetProductByIdUseCase** - Fetch single product
4. **AddToCartUseCase** - Add product to cart
5. **UpdateCartItemUseCase** - Update quantity
6. **RemoveFromCartUseCase** - Remove item from cart
7. **GetCartUseCase** - Fetch user's cart

### New Repositories

1. **ProductRepository** - CRUD operations for products
2. **CartRepository** - Cart management in Firestore

---

## 📦 Firestore Collections

### Products Collection
```
products/
├── {productId}/
    ├── id: string
    ├── name: string
    ├── description: string
    ├── price: number
    ├── imageUrls: string[]
    ├── category: string
    ├── vendorId: string
    ├── vendorName: string
    ├── stockQuantity: number
    ├── averageRating: number
    ├── reviewCount: number
    ├── createdAt: timestamp
    └── updatedAt: timestamp
```

### Carts Collection
```
carts/
├── {userId}/
    ├── userId: string
    ├── items: array
    │   ├── productId: string
    │   ├── quantity: number
    │   └── addedAt: timestamp
    ├── totalPrice: number
    └── updatedAt: timestamp
```

---

## 🎨 UI/UX Considerations

### Product Cards
- Clean card design with rounded corners
- High-quality product images
- Price prominently displayed
- Star rating visible
- "Add to Cart" quick action

### Shopping Cart
- Swipe to delete items
- Quantity picker (+ / -)
- Subtotal per item
- Total price at bottom
- Prominent "Checkout" button

### Color Scheme
- Continue GLAMGO purple branding (#4A2663)
- Green for "Add to Cart" actions
- Red for delete/remove actions
- Neutral grays for backgrounds

---

## 📝 Sample Data Requirements

For testing, we'll need to create sample products:

**Minimum 20 products across categories:**
- 5 Hair products
- 5 Nail products
- 5 Makeup products
- 5 Skincare products

**Each product needs:**
- Name and description
- Price ($10-$150 range)
- 1-3 product images
- Category assignment
- Mock vendor assignment
- Stock quantity (20-100)
- Mock rating (3.5-5 stars)

---

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] Browse products with smooth scrolling
- [ ] Search for products by name
- [ ] View product details
- [ ] Add products to cart
- [ ] Update cart quantities
- [ ] Remove items from cart
- [ ] View cart total calculation
- [ ] Navigate between screens
- [ ] Handle empty states (no products, empty cart)
- [ ] Test loading and error states

### Edge Cases
- Empty product list
- Empty search results
- Empty cart
- Out of stock products
- Large quantities in cart
- Network errors
- Slow image loading

---

## ⚠️ Known Limitations

1. **No Real Vendors Yet** - Will use placeholder vendor data
2. **No Payment Integration** - Cart stops at cart screen (checkout in Sprint 3)
3. **Basic Search** - Text-based only (no filters, sorting initially)
4. **Mock Reviews** - Full review system in future sprint
5. **Single Image** - May start with 1 image per product for simplicity

---

## 📅 Sprint Timeline

### Week Breakdown

**Day 1-2: Foundation**
- Create Product and Cart entities
- Set up Firestore collections
- Create sample product data
- Implement ProductRepository

**Day 3-4: Product Browsing**
- US-007: Product List Screen
- US-008: Search functionality
- US-011: Category filtering

**Day 5-6: Product Details & Cart**
- US-009: Product Details Screen
- US-010: Shopping Cart implementation

**Day 7: Polish & Testing**
- Fix bugs
- Improve UI/UX
- Manual testing
- Documentation

---

## 🚀 Definition of Done

Each user story is complete when:
- ✅ All acceptance criteria met
- ✅ TypeScript compiles with 0 errors
- ✅ Manual testing passed
- ✅ Error handling implemented
- ✅ Loading states working
- ✅ UI matches GLAMGO branding
- ✅ Code documented
- ✅ Git committed with proper message

---

## 🎯 Sprint 2 Success Metrics

**Must Achieve:**
- Product browsing works smoothly
- Search returns relevant results
- Cart functionality is bug-free
- UI is polished and professional
- 0 TypeScript errors

**Stretch Goals:**
- Category filtering working
- Product ratings displayed
- Favorites/wishlist implemented

---

## 🔄 Dependencies

### From Sprint 1
- ✅ User authentication working
- ✅ AuthContext providing user data
- ✅ Firebase configuration complete
- ✅ Navigation structure in place

### For Sprint 3
- Order placement
- Payment integration
- Address management
- Delivery scheduling

---

## 📚 Documentation Plan

Each completed story will have:
1. Complete user story document
2. Technical implementation notes
3. Testing checklist
4. Troubleshooting guide
5. Screenshots of features

---

## 🎉 Let's Build Sprint 2!

**Ready to start?** Begin with US-007 (Product Catalog Browsing) and work through high-priority stories.

**Questions to Answer First:**
1. Should we create sample product data now or as we build?
2. How many products do we need for realistic testing?
3. Do we want to implement image upload for products this sprint?

---

**Next Step**: Confirm Sprint 2 scope and start with US-007! 🚀
