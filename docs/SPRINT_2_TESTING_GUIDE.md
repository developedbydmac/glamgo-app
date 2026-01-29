# 🧪 Sprint 2 Testing Guide

## Quick Test Flow

Your app is now running at: **http://localhost:8085**

### Test Scenario 1: Complete Shopping Journey (Guest)
1. **Welcome Screen** ✨
   - App opens at Welcome screen
   - See GLAMGO logo and "Beauty Delivered to Your Door" tagline
   - Three feature cards displayed
   - Click "Browse Products" button

2. **Product List** 🛍️
   - See 30 products in 2-column grid
   - Scroll through products
   - Pull down to refresh
   - Tap any product card

3. **Product Details** 📱
   - View large product image
   - See price, rating, description
   - Check stock status
   - Try clicking "Add to Cart 🛒"
   - **Expected:** Alert prompting to login

4. **Login Required** 🔐
   - Alert: "Login Required"
   - Click "Login" button
   - Or click "Cancel" to browse more

### Test Scenario 2: Search Products
1. **Search Bar** 🔍
   - Type "lipstick" in search
   - See results filter instantly
   - Check "X products found" counter
   - Click clear (✕) button
   - Try "shampoo", "serum", "nails"

### Test Scenario 3: Authenticated Shopping
1. **Create Account** 📝
   - Click "Create Account" on Welcome screen
   - Fill in registration form
   - Submit and login

2. **Add to Cart** 🛒
   - Browse products
   - Click product for details
   - Click "Add to Cart 🛒"
   - **Expected:** Success alert!
   - Choose "View Cart" or "Continue Shopping"

3. **View Cart** 📦
   - See cart badge on home screen (red circle with count)
   - Click cart icon 🛒
   - View all cart items

4. **Manage Cart** ⚙️
   - Click + to increase quantity
   - Click - to decrease quantity
   - See subtotal update in real-time
   - Click 🗑️ to remove an item
   - Confirm deletion

5. **Clear Cart** 🧹
   - Click "Clear All" in header
   - Confirm clearing cart
   - See empty cart state

### Test Scenario 4: Navigation Flow
1. **From Welcome** 🌟
   - Welcome → Browse Products → Product List
   - Welcome → Create Account → Register
   - Welcome → Log In → Login

2. **From Customer Home** 🏠
   - See cart badge with item count
   - Click cart badge → Cart Screen
   - Click "Browse Products" → Product List

3. **From Product List** 📋
   - Tap product → Product Details
   - Click Login/Sign Up in header

4. **From Product Details** 📱
   - Back button → Product List
   - "View Cart" (after adding) → Cart Screen

5. **From Cart** 🛒
   - Tap item image → Product Details
   - Back button → Previous screen

## Features to Test

### ✅ Product Browsing
- [ ] All 30 products load
- [ ] Images display correctly
- [ ] Prices show ($XX.XX format)
- [ ] Star ratings visible
- [ ] Low stock warnings (< 20 items)
- [ ] Pull-to-refresh works

### ✅ Search Functionality
- [ ] Search by product name
- [ ] Search by description
- [ ] Search by category
- [ ] Clear button works
- [ ] Results count updates
- [ ] No results message shows

### ✅ Product Details
- [ ] Large image displays
- [ ] Back button works
- [ ] Category badge shows
- [ ] Price prominent
- [ ] Stock status colored correctly
- [ ] Description scrolls
- [ ] Vendor info visible

### ✅ Shopping Cart
- [ ] Add to cart (authenticated)
- [ ] Add to cart (guest prompts login)
- [ ] Quantity increase (+)
- [ ] Quantity decrease (-)
- [ ] Remove item (🗑️)
- [ ] Clear all items
- [ ] Subtotal calculates correctly
- [ ] Empty cart state shows

### ✅ Cart Badge
- [ ] Badge appears on home screen
- [ ] Shows correct item count
- [ ] Updates in real-time
- [ ] Clicking navigates to cart

### ✅ Navigation
- [ ] All routes work
- [ ] Back button functions
- [ ] Deep linking works
- [ ] No navigation errors

## Expected Behaviors

### Guest Users
- ✅ Can browse products
- ✅ Can search products
- ✅ Can view product details
- ❌ Cannot add to cart (prompts login)
- ❌ No cart badge visible

### Authenticated Users
- ✅ All guest features
- ✅ Can add to cart
- ✅ Can manage cart
- ✅ See cart badge
- ✅ Cart persists across sessions

## Known Behaviors

### Good Behaviors ✨
- Cart syncs in real-time with Firebase
- Cart persists when you close and reopen app
- Multiple items can be in cart
- Duplicate items increase quantity
- Out of stock products disabled
- Smooth animations throughout

### Expected Limitations 📝
- Checkout button shows "Coming Soon" (Sprint 3)
- No payment integration yet (Sprint 3)
- No order history yet (Sprint 3)
- No product reviews yet (Sprint 4)
- No favorites yet (Sprint 4)

## Browser DevTools

Open browser console (F12) to see:
- Firebase operations logging
- Cart state updates
- Any errors or warnings

## Test Credentials

If you need test accounts:
```
Customer:
Email: customer@test.com
Password: test123456

(Or create your own via Register)
```

## Success Criteria

Sprint 2 is successful if:
- ✅ All 30 products display
- ✅ Search returns correct results
- ✅ Product details show complete info
- ✅ Cart badge appears when authenticated
- ✅ Add to cart works
- ✅ Quantity management works
- ✅ Remove items works
- ✅ Clear cart works
- ✅ Navigation flows correctly
- ✅ No console errors
- ✅ Cart persists across sessions

## Bugs to Report

If you find any issues:
1. Note the steps to reproduce
2. Check browser console for errors
3. Screenshot if visual issue
4. Report what expected vs what happened

## Performance Notes

Expected performance:
- Initial load: ~1-2 seconds
- Product list: Instant
- Search: Real-time (< 100ms)
- Add to cart: ~500ms-1s
- Cart operations: ~500ms-1s

Slower operations are talking to Firebase.

## Happy Testing! 🎉

Your Sprint 2 is complete and ready to test. Try breaking it! 😄

**Test URL:** http://localhost:8085
