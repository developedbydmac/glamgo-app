# GLAMGO - Beauty Supply Delivery App 💄✨

<div align="center">

![GLAMGO Logo](assets/images/logo.png)

**On-Demand Beauty Supply Delivery Platform**

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

[Features](#features) • [Getting Started](#getting-started) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 📖 About GLAMGO

GLAMGO is a comprehensive beauty supply delivery marketplace that connects **customers**, **local beauty supply vendors**, and **delivery drivers** in real-time. Think "Uber Eats for beauty products."

### 🎯 Mission
Make beauty products accessible to everyone through fast, reliable delivery from local vendors.

### 👥 User Types
- **👤 Customers** - Browse and order beauty products
- **🏪 Vendors** - Manage store, products, and orders
- **🚗 Drivers** - Deliver orders and earn money
- **👨‍💼 Admins** - Manage platform and users

---

## ✨ Features

### For Customers
- 🔍 Browse & search beauty products by category
- 🛒 Shopping cart with multi-vendor support
- 💳 Secure payments via Stripe
- 📍 Real-time order tracking with driver location
- ⭐ Rate vendors, drivers, and products
- 🏠 Multiple delivery addresses
- 🎁 Promo codes & discounts
- 🔔 Push notifications for order updates

### For Vendors
- 🏬 Store profile management
- 📦 Product catalog management
- 📊 Inventory tracking with low-stock alerts
- 📱 Real-time order notifications
- 💰 Sales analytics & earnings dashboard
- 🎯 Promotions & discount management
- 📈 Performance metrics

### For Drivers
- 🗺️ Turn-by-turn navigation
- 💵 Real-time earnings tracking
- 📸 Proof of delivery capture
- ⚡ Accept/decline delivery requests
- 📊 Performance metrics
- 💳 Easy payout system
- 🎯 Preferred delivery zones

### For Admins
- 📊 Platform-wide analytics
- 👥 User management & approval
- 🛡️ Content moderation
- ⚙️ Platform configuration
- 💰 Financial reporting
- 🎫 Promo code management
- 🏆 Featured vendors/products

---

## 🏗️ Tech Stack

### Frontend
- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Navigation** - Navigation
- **React Native Paper** - UI components

### Backend
- **Firebase Auth** - Authentication
- **Cloud Firestore** - Database
- **Firebase Storage** - File storage
- **Cloud Functions** - Serverless functions
- **Firebase Analytics** - Analytics

### Services
- **Stripe** - Payment processing
- **Google Maps API** - Maps & location
- **Expo Notifications** - Push notifications
- **Firebase Cloud Messaging** - Notifications

### DevOps
- **Git & GitHub** - Version control
- **EAS Build** - App building
- **EAS Submit** - App store submission
- **Trello** - Project management

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

```bash
# Check Node.js version (requires v18+)
node --version

# Check npm version
npm --version
```

### Required Tools

1. **Node.js** (v18 or higher)
2. **Expo CLI**
3. **Firebase CLI**
4. **Git**
5. **VS Code** (recommended)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/developedbydmac/glamgo-app.git
cd glamgo-app
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Install global tools

```bash
# Install Expo CLI
npm install -g expo-cli

# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login
```

#### 4. Set up environment variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your API keys
# Firebase, Stripe, Google Maps, etc.
```

#### 5. Initialize Firebase

```bash
# Initialize Firebase in your project
firebase init

# Select:
# - Firestore
# - Storage
# - Hosting (optional)
```

#### 6. Run the app

```bash
# Start Expo development server
npm start

# Or run on specific platform
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

### 📱 Running on Physical Device

#### iOS
1. Install Expo Go from App Store
2. Scan QR code from terminal
3. App opens in Expo Go

#### Android
1. Install Expo Go from Play Store
2. Scan QR code from terminal
3. App opens in Expo Go

---

## 📚 Documentation

Comprehensive documentation is available in the following files:

| Document | Description |
|----------|-------------|
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Complete setup instructions |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Clean architecture guide |
| [FIREBASE_SCHEMA.md](./FIREBASE_SCHEMA.md) | Database schema design |
| [USER_STORIES.md](./USER_STORIES.md) | User stories & requirements |
| [SPRINT_PLAN.md](./SPRINT_PLAN.md) | 12-week development plan |
| [TRELLO_BOARD.md](./TRELLO_BOARD.md) | Project management guide |

---

## 🗂️ Project Structure

```
glamgo-app/
├── src/
│   ├── features/              # Feature modules
│   │   ├── auth/             # Authentication
│   │   ├── customer/         # Customer app
│   │   ├── vendor/           # Vendor dashboard
│   │   ├── driver/           # Driver app
│   │   ├── admin/            # Admin panel
│   │   ├── products/         # Products
│   │   ├── orders/           # Orders
│   │   ├── delivery/         # Delivery
│   │   ├── payments/         # Payments
│   │   └── reviews/          # Reviews
│   ├── shared/               # Shared code
│   │   ├── presentation/     # UI components
│   │   ├── utils/            # Utilities
│   │   ├── constants/        # Constants
│   │   └── types/            # TypeScript types
│   ├── config/               # Configuration
│   └── store/                # Redux store
├── assets/                   # Static assets
├── __tests__/                # Tests
├── firebase/                 # Firebase config
├── App.tsx                   # App entry point
└── package.json
```

### Feature Structure (Clean Architecture)

```
feature/
├── domain/                   # Business logic
│   ├── entities/            # Domain models
│   ├── repositories/        # Repository interfaces
│   └── usecases/            # Use cases
├── data/                    # Data layer
│   ├── repositories/        # Repository implementations
│   ├── datasources/         # Data sources
│   └── models/              # Data models
└── presentation/            # UI layer
    ├── screens/             # Screens
    ├── components/          # Components
    ├── hooks/               # Custom hooks
    └── state/               # State management
```

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- UserService.test.ts
```

### Test Coverage Goals
- **Unit Tests**: 80%+ coverage
- **Integration Tests**: Key user flows
- **E2E Tests**: Critical paths

---

## 🎨 Code Style

### ESLint & Prettier

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat(customer): add product search functionality
fix(vendor): resolve inventory update bug
docs(readme): update installation steps
chore(deps): upgrade react-navigation
```

---

## 🏃 Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/product-search
```

### 2. Make Changes

```bash
# Make your changes
# Test your changes
# Commit regularly
```

### 3. Push & Create PR

```bash
git push origin feature/product-search
# Create Pull Request on GitHub
```

### 4. Code Review

- Request review from team
- Address feedback
- Merge after approval

---

## 📅 Sprint Schedule

| Sprint | Duration | Focus Area |
|--------|----------|-----------|
| **Sprint 0** | Week 0 | Setup & Configuration |
| **Sprint 1** | Week 1 | Authentication & User Management |
| **Sprint 2** | Week 2 | Product Browsing |
| **Sprint 3** | Week 3 | Shopping Cart & Checkout |
| **Sprint 4** | Week 4 | Payments & Orders |
| **Sprint 5** | Week 5 | Order Tracking |
| **Sprint 6** | Week 6 | Vendor Onboarding |
| **Sprint 7** | Week 7 | Vendor Order Management |
| **Sprint 8** | Week 8 | Driver Core Functionality |
| **Sprint 9** | Week 9 | Driver Completion |
| **Sprint 10** | Week 10 | Admin User Management |
| **Sprint 11** | Week 11 | Admin Configuration |
| **Sprint 12** | Week 12 | Polish & Launch |

**Total: 12 weeks to MVP launch** 🚀

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# Google Maps
GOOGLE_MAPS_API_KEY=your_maps_key

# Environment
NODE_ENV=development
API_BASE_URL=https://your-api.com
```

**⚠️ Never commit `.env` to Git!**

---

## 🚀 Deployment

### Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both
eas build --platform all
```

### Submit to App Stores

```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

---

## 📊 Success Metrics

### Performance Targets
- ⚡ App launch time: < 3 seconds
- 🎯 Screen load time: < 1 second
- 📱 Crash rate: < 1%
- ⭐ User rating: 4.5+

### Business Metrics
- 👥 User growth rate
- 💰 GMV (Gross Merchandise Value)
- 📦 Order completion rate: > 95%
- 🚗 Driver acceptance rate: > 90%
- ⏱️ Average delivery time: < 30 minutes

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 1. Fork the Repository

```bash
# Fork on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/glamgo-app.git
```

### 2. Create Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Commit Changes

```bash
git commit -m "feat: add amazing feature"
```

### 4. Push & Submit PR

```bash
git push origin feature/amazing-feature
# Create Pull Request
```

### Code Review Process
1. Automated tests must pass
2. Code review by 1+ team member
3. Address feedback
4. Merge to main

---

## 🐛 Bug Reports

Found a bug? Please create an issue with:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: How to reproduce the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: Device, OS version, app version

---

## 💬 Support

Need help? Reach out:

- 📧 Email: support@glamgo.com
- 💬 Discord: [Join our community]
- 📖 Docs: [Documentation](./SETUP_GUIDE.md)
- 🐛 Issues: [GitHub Issues](https://github.com/developedbydmac/glamgo-app/issues)

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Team

### Developers
- **Daquan McDaniel** - Lead Developer - [@developedbydmac](https://github.com/developedbydmac)

### Contributors
<!-- Add contributors here -->

---

## 🙏 Acknowledgments

- React Native community
- Expo team
- Firebase team
- All open-source contributors

---

## 📱 Screenshots

<!-- Add screenshots here -->

| Customer App | Vendor Dashboard | Driver App |
|-------------|------------------|------------|
| ![Customer](assets/screenshots/customer.png) | ![Vendor](assets/screenshots/vendor.png) | ![Driver](assets/screenshots/driver.png) |

---

## 🗺️ Roadmap

### Phase 1 (Weeks 1-4)
- ✅ Authentication & User Management
- ✅ Product Browsing
- ✅ Shopping Cart
- ✅ Payments & Orders

### Phase 2 (Weeks 5-8)
- ✅ Order Tracking
- ✅ Vendor Dashboard
- ✅ Driver App

### Phase 3 (Weeks 9-12)
- ✅ Admin Panel
- ✅ Analytics
- ✅ Polish & Launch

### Future Enhancements
- 💡 AR Try-On for makeup
- 💡 Subscription boxes
- 💡 Loyalty program
- 💡 Multi-language support
- 💡 AI product recommendations

---

## 📈 Project Status

**Current Phase:** Sprint 2 - Product Catalog (69% Complete) 🚀  
**Latest:** Product browsing, search, and details screens complete!  
**Next Up:** Shopping Cart (US-010)  
**Target Launch:** 10 weeks remaining

### Recent Accomplishments ✨
- ✅ **Sprint 1:** User authentication & profile management (81% complete)
- ✅ **Sprint 2 Phase 1:** Product entity, repository, & 30 sample products seeded
- ✅ **Sprint 2 Phase 2:** Product catalog UI (browsing + search + details)

### Sprint Progress
- [x] Project setup (Sprint 0)
- [x] Documentation complete (Sprint 0)
- [x] Authentication (Sprint 1) - 81% complete
- [x] Product backend (Sprint 2 Phase 1) - 100% complete
- [x] Product catalog UI (Sprint 2 Phase 2.1-2.3) - 100% complete
- [ ] Shopping cart (Sprint 2 Phase 2.4) - Next up!
- [ ] Checkout & payments (Sprint 3-4)
- [ ] Order tracking (Sprint 5)
- [ ] Vendor dashboard (Sprints 6-7)
- [ ] Driver app (Sprints 8-9)
- [ ] Admin panel (Sprints 10-11)
- [ ] Launch prep (Sprint 12)

### Latest Features 🎉
**Sprint 2 Phase 2 (Just Completed):**
- 🛍️ Product list screen with 2-column grid
- 🔍 Real-time product search
- 📱 Product details screen
- ⭐ Star ratings & reviews display
- 📦 Stock status indicators
- 🔄 Pull-to-refresh
- 🌐 Web browser support for testing

**See:** [SPRINT_2_PHASE_2_SUMMARY.md](./docs/SPRINT_2_PHASE_2_SUMMARY.md) for full details

---

## 🎯 Quick Links

- [📖 Setup Guide](./SETUP_GUIDE.md)
- [🏗️ Architecture](./ARCHITECTURE.md)
- [🗄️ Database Schema](./FIREBASE_SCHEMA.md)
- [📋 User Stories](./USER_STORIES.md)
- [📅 Sprint Plan](./SPRINT_PLAN.md)
- [📊 Trello Board](./TRELLO_BOARD.md)

---

<div align="center">

**Made with ❤️ by the GLAMGO Team**

[Website](https://glamgo.com) • [Twitter](https://twitter.com/glamgo) • [Instagram](https://instagram.com/glamgo)

© 2026 GLAMGO. All rights reserved.

</div>

