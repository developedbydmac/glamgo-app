# Sprint 3 - Checkout & Delivery Addresses

**Status:** 🔄 IN PROGRESS  
**Start Date:** January 31, 2026  
**Target Completion:** February 7, 2026  
**Total Story Points:** 20 points

---

## 🎯 Sprint 3 Goals

1. **HIGH PRIORITY** (10 points):
   - ✅ Enable customers to save delivery addresses
   - ✅ Complete checkout flow with order summary
   - ✅ Calculate delivery fees and taxes
   - ✅ Create pending orders (payment integration in Sprint 4)

2. **MEDIUM PRIORITY** (7 points - Time Permitting):
   - Filter products by category, price, brand
   - Sort products by various criteria
   
3. **LOW PRIORITY** (3 points - Can Defer):
   - View vendor profiles

---

## 📋 User Stories - Priority Order

### 🔴 HIGH PRIORITY (Must Complete)

#### US-011: Manage Delivery Addresses (5 points)
**Implementation Order: #1**

**What to Build:**
1. **Domain Layer:**
   - `src/features/address/domain/entities/Address.ts`
     - id, userId, label, street, city, state, zipCode, isDefault, createdAt
   - `src/features/address/domain/repositories/AddressRepository.ts`
     - getAddresses(), addAddress(), updateAddress(), deleteAddress(), setDefaultAddress()
   - Use cases for each operation

2. **Data Layer:**
   - `src/features/address/data/repositories/FirebaseAddressRepository.ts`
     - Firestore collection: `users/{userId}/addresses`
     - Implement all CRUD operations
     - Handle default address logic (only one can be default)

3. **Presentation Layer:**
   - `src/features/address/presentation/screens/AddressListScreen.tsx`
     - List all saved addresses
     - "Add New Address" button
     - Edit/Delete actions per address
     - Set default radio button
   - `src/features/address/presentation/screens/AddAddressScreen.tsx`
     - Form with: label, street, city, state, zipCode
     - Validation (all fields required)
     - Save button
   - `src/features/address/presentation/screens/EditAddressScreen.tsx`
     - Pre-filled form
     - Update button

4. **State Management:**
   - `src/contexts/AddressContext.tsx`
     - Global address state
     - addresses, loading, error
     - loadAddresses(), addAddress(), updateAddress(), deleteAddress(), setDefault()

5. **Navigation:**
   - Add "Addresses" to CustomerHomeScreen settings/menu
   - Add routes: AddressList, AddAddress, EditAddress

6. **Firestore Security Rules:**
   ```javascript
   match /users/{userId}/addresses/{addressId} {
     allow read, write: if request.auth.uid == userId;
   }
   ```

**Acceptance Criteria Checklist:**
- [ ] User can view list of saved addresses
- [ ] User can add new address with validation
- [ ] User can edit existing addresses
- [ ] User can delete addresses with confirmation
- [ ] User can set one address as default
- [ ] Addresses persist in Firestore
- [ ] Error handling works

---

#### US-012: Checkout Flow (5 points)
**Implementation Order: #2** (After addresses)

**What to Build:**
1. **Domain Layer:**
   - `src/features/checkout/domain/entities/Order.ts`
     - id, userId, items[], address, subtotal, deliveryFee, tax, total, instructions, status, createdAt
   - `src/features/checkout/domain/entities/OrderItem.ts`
     - productId, product, quantity, price, subtotal
   - `src/features/checkout/domain/repositories/OrderRepository.ts`
     - createOrder(), getOrder(), getUserOrders()
   - Use cases

2. **Data Layer:**
   - `src/features/checkout/data/repositories/FirebaseOrderRepository.ts`
     - Firestore collection: `orders`
     - Create order with all details
     - Index on userId for queries

3. **Presentation Layer:**
   - `src/features/checkout/presentation/screens/CheckoutScreen.tsx`
     - **Delivery Address Section:**
       - Show selected/default address
       - "Change Address" button → AddressListScreen (select mode)
       - "Add New Address" button → AddAddressScreen
     - **Order Summary Section:**
       - List all cart items (image, name, qty, price)
       - Non-editable (edit in cart)
     - **Pricing Breakdown:**
       - Subtotal: Sum of (item price × quantity)
       - Delivery Fee: $5.00 (flat rate for MVP)
       - Tax: 8% of subtotal (configurable constant)
       - **Total:** subtotal + delivery + tax
     - **Delivery Instructions:**
       - Optional text area (e.g., "Leave at door", "Ring bell")
     - **Place Order Button:**
       - Validates address selected
       - Creates order with status: "pending"
       - Clears cart
       - Navigates to OrderConfirmationScreen

   - `src/features/checkout/presentation/screens/OrderConfirmationScreen.tsx`
     - Success message
     - Order number display
     - Order summary
     - "Track Order" button (Sprint 5)
     - "Browse Products" button

4. **Business Logic:**
   - `src/features/checkout/domain/services/OrderCalculator.ts`
     ```typescript
     calculateSubtotal(items): number
     calculateDeliveryFee(): number  // Always $5 for MVP
     calculateTax(subtotal): number  // 8%
     calculateTotal(subtotal, deliveryFee, tax): number
     ```

5. **Navigation:**
   - Add "Checkout" button on CartScreen
   - Add routes: Checkout, OrderConfirmation
   - Pass cart items to checkout

6. **Firestore Security Rules:**
   ```javascript
   match /orders/{orderId} {
     allow create: if request.auth.uid == request.resource.data.userId;
     allow read: if request.auth.uid == resource.data.userId;
   }
   ```

**Acceptance Criteria Checklist:**
- [ ] Checkout button appears on cart screen
- [ ] User can select/change delivery address
- [ ] Order summary shows all items
- [ ] Subtotal calculated correctly
- [ ] Delivery fee shown ($5)
- [ ] Tax calculated (8%)
- [ ] Total calculated correctly
- [ ] User can add delivery instructions
- [ ] Validation prevents checkout without address
- [ ] Order created in Firestore with status "pending"
- [ ] Cart cleared after order placed
- [ ] Confirmation screen shows order details

---

### 🟡 MEDIUM PRIORITY (If Time Permits)

#### US-013: Filter Products (4 points)
**Implementation Order: #3**

**What to Build:**
1. Update `ProductListScreen.tsx`:
   - Add "Filter" button in header
   - Filter modal/sheet with:
     - Category checkboxes (Hair, Skin, Makeup, Nails, Fragrance)
     - Price range (min/max inputs)
     - Brand checkboxes (dynamically from products)
     - Apply & Clear buttons
   - Filter logic in component state
   - Combine with existing search

**Defer if time is tight** - nice-to-have feature

---

#### US-014: Sort Products (3 points)
**Implementation Order: #4**

**What to Build:**
1. Update `ProductListScreen.tsx`:
   - Add sort dropdown/button
   - Sort options: Price (Low-High), Price (High-Low), Name (A-Z), Rating, Newest
   - Apply sorting to filtered/searched results

**Defer if time is tight** - nice-to-have feature

---

### ⚪ LOW PRIORITY (Can Defer to Sprint 4+)

#### US-015: View Vendor Profile (3 points)
**Implementation Order: #5**

**What to Build:**
1. `VendorProfileScreen.tsx` - Basic vendor info display
2. Link from ProductDetailsScreen

**Definitely defer** - not critical for checkout flow

---

## 🔧 Technical Implementation Order

### Phase 1: Delivery Addresses (Day 1-2)
1. ✅ Create Address domain entities
2. ✅ Build AddressRepository interface
3. ✅ Implement FirebaseAddressRepository
4. ✅ Create address use cases
5. ✅ Build AddressContext
6. ✅ Create AddressListScreen
7. ✅ Create AddAddressScreen
8. ✅ Create EditAddressScreen
9. ✅ Add navigation routes
10. ✅ Update Firestore rules
11. ✅ Test all address CRUD operations

### Phase 2: Checkout Flow (Day 3-4)
1. ✅ Create Order domain entities
2. ✅ Build OrderRepository interface
3. ✅ Implement FirebaseOrderRepository
4. ✅ Create OrderCalculator service
5. ✅ Build checkout use cases
6. ✅ Create CheckoutScreen
7. ✅ Integrate with AddressContext
8. ✅ Integrate with CartContext
9. ✅ Create OrderConfirmationScreen
10. ✅ Add navigation routes
11. ✅ Update Firestore rules
12. ✅ Test complete checkout flow

### Phase 3: Filtering & Sorting (Day 5 - Optional)
1. Add filter UI to ProductListScreen
2. Implement filter logic
3. Add sort dropdown
4. Implement sort logic
5. Test combinations

---

## 📁 Files to Create

### Domain Layer (8 files)
```
src/features/address/domain/
├── entities/Address.ts
├── repositories/AddressRepository.ts
└── useCases/
    ├── GetAddressesUseCase.ts
    ├── AddAddressUseCase.ts
    ├── UpdateAddressUseCase.ts
    ├── DeleteAddressUseCase.ts
    └── SetDefaultAddressUseCase.ts

src/features/checkout/domain/
├── entities/
│   ├── Order.ts
│   └── OrderItem.ts
├── repositories/OrderRepository.ts
├── services/OrderCalculator.ts
└── useCases/
    ├── CreateOrderUseCase.ts
    └── GetOrderUseCase.ts
```

### Data Layer (2 files)
```
src/features/address/data/repositories/FirebaseAddressRepository.ts
src/features/checkout/data/repositories/FirebaseOrderRepository.ts
```

### Presentation Layer (5 files)
```
src/features/address/presentation/screens/
├── AddressListScreen.tsx
├── AddAddressScreen.tsx
└── EditAddressScreen.tsx

src/features/checkout/presentation/screens/
├── CheckoutScreen.tsx
└── OrderConfirmationScreen.tsx
```

### Context (1 file)
```
src/contexts/AddressContext.tsx
```

**Total New Files:** ~16 files
**Total Lines:** ~1,500-2,000 lines

---

## 🧪 Testing Checklist

### Address Management
- [ ] Add address with valid data
- [ ] Add address with invalid data (validation)
- [ ] View list of addresses
- [ ] Edit existing address
- [ ] Delete address with confirmation
- [ ] Set address as default
- [ ] Only one default address at a time
- [ ] Addresses persist after app restart

### Checkout Flow
- [ ] Navigate to checkout from cart
- [ ] See default address selected
- [ ] Change address
- [ ] Add new address during checkout
- [ ] View order summary (all items)
- [ ] Verify subtotal calculation
- [ ] Verify delivery fee ($5)
- [ ] Verify tax (8%)
- [ ] Verify total
- [ ] Add delivery instructions
- [ ] Cannot checkout without address
- [ ] Place order successfully
- [ ] Cart cleared after order
- [ ] See order confirmation
- [ ] Order saved in Firestore with correct data

---

## 🎯 Success Metrics

- ✅ Users can save at least 1 delivery address
- ✅ Users can complete checkout flow end-to-end
- ✅ Orders created with status "pending"
- ✅ Cart cleared after successful order
- ✅ Calculations correct (subtotal, tax, delivery, total)
- ✅ 0 TypeScript errors
- ✅ All security rules deployed

---

## 🚀 Next Sprint Preview

**Sprint 4 will add:**
- Stripe payment integration
- Process payments for pending orders
- Payment method management
- Order confirmation emails
- Update order status to "paid"

---

## 📝 Notes

- **No Google Maps API** for MVP - manual address entry is sufficient
- **Fixed pricing** for MVP - $5 delivery, 8% tax (can make configurable later)
- **No promo codes yet** - Sprint 4+
- **Orders stay "pending"** until payment in Sprint 4
- **Keep it simple** - focus on core checkout flow first

---

**Let's build this! 🚀**
