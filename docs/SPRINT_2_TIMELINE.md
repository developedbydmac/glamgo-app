# 🗓️ Sprint 2: Visual Timeline & Milestones

**Duration**: 7 days (January 30 - February 5, 2026)  
**Goal**: Customer can browse products and manage shopping cart

---

## 📊 Sprint Timeline

```
Day 1: FOUNDATION
┌─────────────────────────────────────────────────────┐
│ Morning:   Create Product entity & repository       │
│ Afternoon: Create seed script with 30 products      │
│ Evening:   Seed Firestore with sample data          │
└─────────────────────────────────────────────────────┘
Deliverable: Products in Firestore ✅

Day 2: PRODUCT LIST
┌─────────────────────────────────────────────────────┐
│ Morning:   Create ProductListScreen                 │
│ Afternoon: Create ProductCard component             │
│ Evening:   Add loading/error states                 │
└─────────────────────────────────────────────────────┘
Deliverable: Browse products working ✅

Day 3: SEARCH
┌─────────────────────────────────────────────────────┐
│ Morning:   Add search bar to ProductList            │
│ Afternoon: Implement search filtering               │
│ Evening:   Add "no results" handling                │
└─────────────────────────────────────────────────────┘
Deliverable: Search products working ✅

Day 4: PRODUCT DETAILS
┌─────────────────────────────────────────────────────┐
│ Morning:   Create ProductDetailsScreen              │
│ Afternoon: Design details layout                    │
│ Evening:   Add navigation & "Add to Cart" button    │
└─────────────────────────────────────────────────────┘
Deliverable: Product details working ✅

Day 5: CART FOUNDATION
┌─────────────────────────────────────────────────────┐
│ Morning:   Create Cart entity & repository          │
│ Afternoon: Create CartContext                       │
│ Evening:   Wire up "Add to Cart" functionality      │
└─────────────────────────────────────────────────────┘
Deliverable: Can add items to cart ✅

Day 6: CART SCREEN
┌─────────────────────────────────────────────────────┐
│ Morning:   Create CartScreen & CartItemCard         │
│ Afternoon: Add quantity controls & remove           │
│ Evening:   Add cart badge & navigation              │
└─────────────────────────────────────────────────────┘
Deliverable: Full cart management ✅

Day 7: POLISH & TEST
┌─────────────────────────────────────────────────────┐
│ Morning:   Manual testing & bug fixes               │
│ Afternoon: UI polish & refinements                  │
│ Evening:   Documentation & git commit               │
└─────────────────────────────────────────────────────┘
Deliverable: Sprint 2 complete! 🎉
```

---

## 🎯 Milestone Checkpoints

### ✅ Milestone 1: Data Foundation (End of Day 1)
**You should be able to:**
- Query products from Firestore console
- See 30 sample products with images
- Verify product data structure is correct

**Verification:**
```bash
# Open Firebase Console
# Navigate to Firestore Database
# Check products collection has 30 documents
```

---

### ✅ Milestone 2: Browse Products (End of Day 2)
**You should be able to:**
- Open the app
- Navigate to product list
- See products in a grid
- Scroll through all products
- See product images, names, prices

**Verification:**
```bash
# Run: npx expo start
# Navigate to Browse Products
# See product grid
# Scroll smoothly
```

---

### ✅ Milestone 3: Search Products (End of Day 3)
**You should be able to:**
- Type in search bar
- See filtered results in real-time
- Clear search
- See "no results" message

**Verification:**
```bash
# Open product list
# Type "hair" in search
# See only hair products
# Type "xyz" 
# See "no results" message
```

---

### ✅ Milestone 4: View Details (End of Day 4)
**You should be able to:**
- Tap on a product card
- See product details screen
- See large image, full description
- See "Add to Cart" button
- Navigate back to list

**Verification:**
```bash
# Tap any product
# See full details
# Tap back button
# Return to list
```

---

### ✅ Milestone 5: Add to Cart (End of Day 5)
**You should be able to:**
- Tap "Add to Cart" on product details
- See success message
- Cart badge shows item count
- Cart data saved to Firestore

**Verification:**
```bash
# View product details
# Tap "Add to Cart"
# See "Added to cart" message
# Check cart badge shows "1"
# Check Firestore carts collection
```

---

### ✅ Milestone 6: Manage Cart (End of Day 6)
**You should be able to:**
- Navigate to cart screen
- See all cart items
- Increase/decrease quantities
- Remove items
- See total price update
- Cart persists on app restart

**Verification:**
```bash
# Navigate to cart
# See all items
# Change quantity
# See total update
# Remove an item
# Restart app
# Cart still has items
```

---

### ✅ Milestone 7: Sprint Complete (End of Day 7)
**You should have:**
- All 4 high-priority stories complete
- 0 TypeScript errors
- All features tested
- Documentation complete
- Code committed to git

**Final Verification:**
```bash
# Run full app test
# Browse products ✅
# Search products ✅
# View details ✅
# Add to cart ✅
# Manage cart ✅
# npx tsc --noEmit (0 errors) ✅
```

---

## 📈 Progress Tracking

Track your progress daily:

```
Sprint 2 Progress: [███░░░░░░░] 30%

✅ Day 1: Foundation Complete
✅ Day 2: Product List Complete
✅ Day 3: Search Complete
⏳ Day 4: Product Details (In Progress)
⬜ Day 5: Cart Foundation
⬜ Day 6: Cart Screen
⬜ Day 7: Polish & Test

Story Points: 8 of 26 complete (31%)
```

---

## 🎯 Definition of Done (Per Story)

Before marking any story as complete:

**US-007: Product Catalog**
- [ ] Products display in grid/list
- [ ] Images load correctly
- [ ] Name, price, rating visible
- [ ] Smooth scrolling
- [ ] Pull to refresh works
- [ ] Loading state shows
- [ ] Error handling works
- [ ] 0 TypeScript errors

**US-008: Search**
- [ ] Search bar functional
- [ ] Results filter in real-time
- [ ] Clear button works
- [ ] "No results" message shows
- [ ] Search is case-insensitive
- [ ] 0 TypeScript errors

**US-009: Product Details**
- [ ] Full product info displays
- [ ] Large image shows
- [ ] Description readable
- [ ] Price and rating visible
- [ ] Add to Cart button present
- [ ] Navigation works
- [ ] 0 TypeScript errors

**US-010: Shopping Cart**
- [ ] Cart screen displays items
- [ ] Quantity controls work
- [ ] Remove item works
- [ ] Total calculates correctly
- [ ] Cart persists in Firestore
- [ ] Cart badge shows count
- [ ] Empty cart state works
- [ ] 0 TypeScript errors

---

## 🚦 Traffic Light Status

Use this to track story health:

```
🟢 US-007: Product Catalog - Not Started
   Ready to begin, all requirements clear

🟢 US-008: Search - Blocked
   Depends on US-007 completion

🟢 US-009: Product Details - Blocked
   Depends on US-007 completion

🟢 US-010: Shopping Cart - Blocked
   Depends on US-009 completion

Legend:
🟢 Green = On track / Ready
🟡 Yellow = At risk / Needs attention
🔴 Red = Blocked / Issues
```

---

## 📞 When to Ask for Help

Ask for help if:
- ❌ Stuck for more than 1 hour on same problem
- ❌ TypeScript errors that won't resolve
- ❌ Firestore queries not working
- ❌ Navigation issues
- ❌ Performance problems
- ❌ Design/UX uncertainty

---

## 🎉 Celebration Points

Celebrate these wins:
- 🎊 First product displays on screen
- 🎊 Search returns correct results
- 🎊 First item added to cart
- 🎊 Cart total calculates correctly
- 🎊 All stories complete
- 🎊 0 TypeScript errors
- 🎊 Sprint 2 DONE!

---

## 🔄 Feedback Loop

At end of each day:
1. ✅ Review what you built
2. ✅ Test the feature
3. ✅ Commit your code
4. ✅ Update progress tracker
5. ✅ Plan next day

---

## 🚀 You're Ready!

Sprint 2 is well-planned and achievable. Take it one day at a time, and you'll have a fully functional product browsing and cart system by February 5th!

**First action**: Create Product entity and seed script (Day 1)

Let's build something amazing! 💪
