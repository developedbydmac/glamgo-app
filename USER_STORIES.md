# GLAMGO - User Story Map (MVP - 3 Month Launch)

## Project Overview
**GLAMGO** is a beauty supply delivery app connecting customers with local beauty supply vendors through on-demand delivery drivers.

---

## 1. CUSTOMER USER STORIES

### Epic: Account Management
**User Story 1.1: Account Registration**
- **As a** customer
- **I want to** create an account with my email/phone and profile details
- **So that** I can start ordering beauty products

**Acceptance Criteria:**
- [ ] User can sign up with email/password or phone number
- [ ] User can sign up with Google/Apple social login
- [ ] Profile includes: name, phone, email, profile photo
- [ ] Email/phone verification required
- [ ] User receives welcome notification
- [ ] Profile data stored securely in Firestore

**User Story 1.2: Manage Delivery Addresses**
- **As a** customer
- **I want to** save multiple delivery addresses
- **So that** I can quickly order to different locations

**Acceptance Criteria:**
- [ ] User can add unlimited addresses
- [ ] Address includes: label (Home/Work), street, city, state, zip, coordinates
- [ ] One address can be set as default
- [ ] User can edit/delete saved addresses
- [ ] Address validation using Google Maps API

### Epic: Product Discovery & Ordering
**User Story 1.3: Browse Products**
- **As a** customer
- **I want to** browse beauty products by category
- **So that** I can find what I need

**Acceptance Criteria:**
- [ ] Categories include: Hair Care, Skincare, Makeup, Nails, Tools, Wigs/Extensions
- [ ] Products display: image, name, brand, price, vendor
- [ ] Search functionality with autocomplete
- [ ] Filter by: price range, brand, vendor, rating
- [ ] Sort by: popularity, price (low-high, high-low), newest

**User Story 1.4: View Product Details**
- **As a** customer
- **I want to** see detailed product information
- **So that** I can make informed purchase decisions

**Acceptance Criteria:**
- [ ] Display: multiple images, description, price, brand
- [ ] Show vendor name, location, and rating
- [ ] Display availability status (in stock/out of stock)
- [ ] Show customer reviews and ratings
- [ ] Estimated delivery time displayed

**User Story 1.5: Shopping Cart Management**
- **As a** customer
- **I want to** add products to a cart
- **So that** I can order multiple items at once

**Acceptance Criteria:**
- [ ] Add/remove items from cart
- [ ] Update quantities
- [ ] Cart persists across sessions
- [ ] Show subtotal, delivery fee, taxes
- [ ] Cart items from multiple vendors are grouped
- [ ] Warning if items are from different vendors (may affect delivery)

**User Story 1.6: Place Order**
- **As a** customer
- **I want to** complete my order with payment
- **So that** I can receive my beauty products

**Acceptance Criteria:**
- [ ] Select delivery address
- [ ] Choose delivery speed (Standard/Express)
- [ ] Add delivery instructions
- [ ] Apply promo codes
- [ ] Select payment method (Card/Digital Wallet)
- [ ] Review order summary before confirmation
- [ ] Receive order confirmation with tracking number

### Epic: Order Tracking & Management
**User Story 1.7: Track Order in Real-Time**
- **As a** customer
- **I want to** track my order status
- **So that** I know when to expect delivery

**Acceptance Criteria:**
- [ ] View order status: Placed → Confirmed → Preparing → Out for Delivery → Delivered
- [ ] See driver location on map (when out for delivery)
- [ ] Receive push notifications for status updates
- [ ] View estimated delivery time
- [ ] Contact driver via in-app messaging or call

**User Story 1.8: Order History**
- **As a** customer
- **I want to** view my past orders
- **So that** I can reorder or reference previous purchases

**Acceptance Criteria:**
- [ ] List all past orders with date, items, total
- [ ] Filter by date range or vendor
- [ ] View order details
- [ ] "Reorder" button to add items to cart
- [ ] Download receipt/invoice

**User Story 1.9: Rate and Review**
- **As a** customer
- **I want to** rate products, vendors, and drivers
- **So that** I can share my experience

**Acceptance Criteria:**
- [ ] Rate orders after delivery (1-5 stars)
- [ ] Separate ratings for: product quality, vendor service, driver
- [ ] Optional written review
- [ ] Upload photos with review
- [ ] Edit review within 48 hours

---

## 2. VENDOR USER STORIES

### Epic: Vendor Onboarding
**User Story 2.1: Vendor Registration**
- **As a** beauty supply vendor
- **I want to** register my store on the platform
- **So that** I can reach more customers

**Acceptance Criteria:**
- [ ] Submit business information: store name, address, phone, email
- [ ] Upload business license and tax documents
- [ ] Set store hours and delivery radius
- [ ] Upload store logo and banner images
- [ ] Account pending approval from admin
- [ ] Receive approval/rejection notification

**User Story 2.2: Store Profile Setup**
- **As a** vendor
- **I want to** create an attractive store profile
- **So that** customers choose my store

**Acceptance Criteria:**
- [ ] Add store description and story
- [ ] Upload multiple store photos
- [ ] Set store policies (return, refund, delivery)
- [ ] Display average rating and total orders
- [ ] Show verified badge (if approved)

### Epic: Product Management
**User Story 2.3: Add Products**
- **As a** vendor
- **I want to** add my products to the catalog
- **So that** customers can purchase them

**Acceptance Criteria:**
- [ ] Add product with: name, brand, description, price
- [ ] Upload multiple product images (max 5)
- [ ] Select category and subcategory
- [ ] Add product variants (size, color, etc.)
- [ ] Set stock quantity
- [ ] Mark products as featured
- [ ] Bulk upload via CSV

**User Story 2.4: Inventory Management**
- **As a** vendor
- **I want to** manage my inventory
- **So that** I don't oversell products

**Acceptance Criteria:**
- [ ] Update stock quantities in real-time
- [ ] Low stock alerts (customizable threshold)
- [ ] Mark items as out of stock
- [ ] Automatic stock reduction after order
- [ ] View inventory reports
- [ ] Export inventory data

**User Story 2.5: Pricing & Promotions**
- **As a** vendor
- **I want to** offer discounts and promotions
- **So that** I can attract more customers

**Acceptance Criteria:**
- [ ] Create percentage or fixed amount discounts
- [ ] Set promotion duration (start/end dates)
- [ ] Apply to specific products or categories
- [ ] Create promo codes
- [ ] View promotion performance metrics

### Epic: Order Fulfillment
**User Story 2.6: Receive and Manage Orders**
- **As a** vendor
- **I want to** receive orders and update their status
- **So that** customers get their products on time

**Acceptance Criteria:**
- [ ] Receive instant notification for new orders
- [ ] View order details: items, customer info, delivery address
- [ ] Accept or reject orders within 10 minutes
- [ ] Update order status: Preparing → Ready for Pickup
- [ ] Add estimated preparation time
- [ ] Contact customer if issues arise

**User Story 2.7: Order Dashboard**
- **As a** vendor
- **I want to** view all my orders in one place
- **So that** I can manage my business efficiently

**Acceptance Criteria:**
- [ ] Tabs for: New, Preparing, Ready, Completed, Cancelled
- [ ] Filter by date, status, customer
- [ ] Search by order number
- [ ] Bulk status updates
- [ ] Print packing slips

### Epic: Analytics & Earnings
**User Story 2.8: View Sales Analytics**
- **As a** vendor
- **I want to** see my sales performance
- **So that** I can make informed business decisions

**Acceptance Criteria:**
- [ ] Dashboard with: total sales, orders, revenue
- [ ] Time-based charts (daily, weekly, monthly)
- [ ] Best-selling products
- [ ] Customer demographics
- [ ] Average order value
- [ ] Export reports

**User Story 2.9: Earnings & Payouts**
- **As a** vendor
- **I want to** track my earnings and receive payouts
- **So that** I can manage my finances

**Acceptance Criteria:**
- [ ] View current balance and pending earnings
- [ ] See transaction history
- [ ] Platform commission clearly displayed
- [ ] Request payout (minimum threshold: $50)
- [ ] Payout processed within 3-5 business days
- [ ] Multiple payout methods (bank transfer, PayPal)

---

## 3. DRIVER USER STORIES

### Epic: Driver Onboarding
**User Story 3.1: Driver Registration**
- **As a** delivery driver
- **I want to** register on the platform
- **So that** I can earn money delivering beauty products

**Acceptance Criteria:**
- [ ] Submit personal info: name, phone, email, photo
- [ ] Upload driver's license and vehicle registration
- [ ] Vehicle information: make, model, year, license plate
- [ ] Background check consent
- [ ] Banking info for payments
- [ ] Account pending approval
- [ ] Receive approval notification

**User Story 3.2: Driver Profile**
- **As a** driver
- **I want to** manage my profile and availability
- **So that** I receive appropriate delivery requests

**Acceptance Criteria:**
- [ ] Update personal and vehicle information
- [ ] Set availability status (Online/Offline)
- [ ] View driver rating and total deliveries
- [ ] Set preferred delivery zones
- [ ] Update profile photo

### Epic: Delivery Management
**User Story 3.3: Receive Delivery Requests**
- **As a** driver
- **I want to** receive delivery requests nearby
- **So that** I can efficiently complete deliveries

**Acceptance Criteria:**
- [ ] Receive push notification for new requests
- [ ] See pickup and dropoff locations on map
- [ ] View estimated distance and earnings
- [ ] Accept/decline requests within 30 seconds
- [ ] Auto-decline after timeout
- [ ] See order details (vendor, customer, items count)

**User Story 3.4: Navigate to Pickup & Delivery**
- **As a** driver
- **I want to** get directions to pickup and delivery locations
- **So that** I can complete deliveries efficiently

**Acceptance Criteria:**
- [ ] Turn-by-turn navigation to vendor
- [ ] Mark arrival at vendor location
- [ ] Confirm order pickup with code/signature
- [ ] Navigation to customer location
- [ ] View customer delivery instructions
- [ ] Contact customer via call/message

**User Story 3.5: Complete Delivery**
- **As a** driver
- **I want to** confirm successful delivery
- **So that** I can get paid and move to next order

**Acceptance Criteria:**
- [ ] Mark arrival at delivery location
- [ ] Capture proof of delivery (photo/signature)
- [ ] Complete delivery and update status
- [ ] Add delivery notes if needed
- [ ] Report issues (customer not available, wrong address)
- [ ] See earnings for completed delivery

**User Story 3.6: Active Delivery Dashboard**
- **As a** driver
- **I want to** view my current delivery status
- **So that** I can stay organized

**Acceptance Criteria:**
- [ ] View active delivery details
- [ ] See order status and timeline
- [ ] Customer and vendor contact info
- [ ] Update delivery status
- [ ] Report problems
- [ ] View delivery history for the day

### Epic: Earnings & Performance
**User Story 3.7: Track Earnings**
- **As a** driver
- **I want to** see my earnings in real-time
- **So that** I can track my income

**Acceptance Criteria:**
- [ ] Today's earnings displayed prominently
- [ ] Weekly and monthly earnings summary
- [ ] Earnings per delivery breakdown
- [ ] Tips received separately shown
- [ ] View pending vs. available balance
- [ ] Export earnings statements

**User Story 3.8: Performance Metrics**
- **As a** driver
- **I want to** view my performance stats
- **So that** I can maintain high ratings

**Acceptance Criteria:**
- [ ] Display current rating (1-5 stars)
- [ ] Total deliveries completed
- [ ] On-time delivery percentage
- [ ] Acceptance rate
- [ ] Customer feedback/reviews
- [ ] Performance tips and suggestions

---

## 4. ADMIN USER STORIES

### Epic: Platform Management
**User Story 4.1: Admin Dashboard**
- **As an** admin
- **I want to** see platform-wide metrics
- **So that** I can monitor business health

**Acceptance Criteria:**
- [ ] Total users (customers, vendors, drivers)
- [ ] Active orders in real-time
- [ ] Revenue metrics (daily, weekly, monthly)
- [ ] Order completion rates
- [ ] Average delivery times
- [ ] Top performing vendors and drivers
- [ ] System health indicators

**User Story 4.2: User Management**
- **As an** admin
- **I want to** manage all platform users
- **So that** I can ensure quality and safety

**Acceptance Criteria:**
- [ ] View/search all users by type
- [ ] Review vendor registration applications
- [ ] Approve/reject vendor accounts
- [ ] Review driver applications and documents
- [ ] Approve/reject driver accounts
- [ ] Suspend/ban users for violations
- [ ] View user activity and history
- [ ] Send notifications to users

**User Story 4.3: Order Monitoring**
- **As an** admin
- **I want to** monitor all orders
- **So that** I can resolve issues quickly

**Acceptance Criteria:**
- [ ] View all orders across platform
- [ ] Filter by status, date, vendor, driver
- [ ] See problematic orders (delayed, cancelled)
- [ ] Manually assign drivers if needed
- [ ] Issue refunds when necessary
- [ ] View order timeline and history
- [ ] Export order data

**User Story 4.4: Content Moderation**
- **As an** admin
- **I want to** moderate user-generated content
- **So that** platform maintains quality standards

**Acceptance Criteria:**
- [ ] Review flagged reviews and ratings
- [ ] Remove inappropriate content
- [ ] Verify product listings for accuracy
- [ ] Approve vendor promotions
- [ ] Manage featured vendors/products
- [ ] Handle user reports and disputes

### Epic: Platform Configuration
**User Story 4.5: Manage Categories**
- **As an** admin
- **I want to** manage product categories
- **So that** products are well-organized

**Acceptance Criteria:**
- [ ] Create/edit/delete categories
- [ ] Create subcategories
- [ ] Reorder category display
- [ ] Upload category icons
- [ ] Set featured categories

**User Story 4.6: Platform Settings**
- **As an** admin
- **I want to** configure platform-wide settings
- **So that** the business operates smoothly

**Acceptance Criteria:**
- [ ] Set commission rates (vendor and driver)
- [ ] Configure delivery fees and radius
- [ ] Set minimum order amounts
- [ ] Manage payment methods
- [ ] Configure tax rates by region
- [ ] Set platform policies and terms

**User Story 4.7: Promo Code Management**
- **As an** admin
- **I want to** create platform-wide promo codes
- **So that** I can run marketing campaigns

**Acceptance Criteria:**
- [ ] Create promo codes with custom rules
- [ ] Set discount type (%, fixed, free delivery)
- [ ] Limit uses (per user, total)
- [ ] Set validity period
- [ ] Track promo code usage and ROI
- [ ] Deactivate codes

### Epic: Analytics & Reports
**User Story 4.8: Advanced Analytics**
- **As an** admin
- **I want to** access detailed analytics
- **So that** I can make data-driven decisions

**Acceptance Criteria:**
- [ ] User growth charts
- [ ] Revenue and GMV tracking
- [ ] Order volume trends
- [ ] Geographic heat maps
- [ ] Retention and churn rates
- [ ] Customer acquisition cost
- [ ] Export all data to CSV/Excel

**User Story 4.9: Financial Reports**
- **As an** admin
- **I want to** generate financial reports
- **So that** I can manage accounting and compliance

**Acceptance Criteria:**
- [ ] Revenue by vendor, category, region
- [ ] Commission earnings breakdown
- [ ] Pending payouts to vendors/drivers
- [ ] Transaction logs
- [ ] Tax reporting data
- [ ] Refund reports

---

## MVP PRIORITIZATION (3-Month Timeline)

### MUST HAVE (Critical for Launch)
- ✅ User authentication (all personas)
- ✅ Customer: Browse, search, add to cart, checkout
- ✅ Customer: Real-time order tracking
- ✅ Vendor: Product management (CRUD)
- ✅ Vendor: Order management (accept, prepare, ready)
- ✅ Driver: Accept deliveries, navigate, complete delivery
- ✅ Admin: User approval, basic monitoring
- ✅ Payment processing (Stripe)
- ✅ Push notifications

### SHOULD HAVE (Important but can be phased)
- ⚠️ Reviews and ratings
- ⚠️ Promo codes
- ⚠️ Multiple payment methods
- ⚠️ Earnings dashboard (vendor/driver)
- ⚠️ Basic analytics

### COULD HAVE (Nice to have, post-launch)
- 💡 Advanced filters and sorting
- 💡 In-app messaging
- 💡 Social login
- 💡 Scheduled deliveries
- 💡 Loyalty program

### WON'T HAVE (Future versions)
- ❌ Subscription boxes
- ❌ AR try-on features
- ❌ Multi-language support
- ❌ Advanced AI recommendations

---

## Success Metrics

### Customer Metrics
- User registration rate
- Order completion rate
- Average order value
- Customer retention (30-day)
- App rating (target: 4.5+)

### Vendor Metrics
- Vendor onboarding rate
- Average products per vendor
- Order acceptance rate (target: >95%)
- Average preparation time

### Driver Metrics
- Driver onboarding rate
- Delivery acceptance rate (target: >90%)
- On-time delivery rate (target: >95%)
- Average delivery time

### Platform Metrics
- GMV (Gross Merchandise Value)
- Take rate (commission %)
- Order volume growth
- Active users (DAU, MAU)

