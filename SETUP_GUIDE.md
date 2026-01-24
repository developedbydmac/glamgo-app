# GLAMGO - Complete Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your macOS system:

### Required Tools

1. **Node.js (v18+)**
   ```bash
   # Check if Node.js is installed
   node --version
   
   # If not installed, download from https://nodejs.org/
   # Or install via Homebrew:
   brew install node
   ```

2. **Expo CLI**
   ```bash
   # Install globally
   npm install -g expo-cli
   
   # Verify installation
   expo --version
   ```

3. **Firebase CLI**
   ```bash
   # Install globally
   npm install -g firebase-tools
   
   # Verify installation
   firebase --version
   
   # Login to Firebase
   firebase login
   ```

4. **Git** (Already installed on macOS)
   ```bash
   git --version
   ```

5. **VS Code** (Recommended)
   - Download from https://code.visualstudio.com/

6. **Xcode** (for iOS development)
   - Install from Mac App Store
   - Install Command Line Tools:
   ```bash
   xcode-select --install
   ```

7. **Android Studio** (for Android development)
   - Download from https://developer.android.com/studio
   - Install Android SDK and emulator

### Recommended VS Code Extensions

```bash
# Install these extensions
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension mgmcdermott.vscode-language-babel
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension formulahendry.auto-rename-tag
code --install-extension PKief.material-icon-theme
code --install-extension chakrounanas.turbo-console-log
```

---

## Project Setup

### Step 1: Initialize Expo Project

```bash
# Navigate to your project directory
cd /Users/daquanmcdaniel/Documents/2026/glamgo/glamgo-app

# Initialize Expo project with TypeScript
npx create-expo-app@latest . --template blank-typescript

# Answer prompts:
# - Use template: blank (TypeScript)
# - Name: glamgo-app
```

### Step 2: Install Core Dependencies

```bash
# Navigation
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Firebase
npm install firebase
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
npm install @react-native-firebase/storage @react-native-firebase/messaging

# State Management
npm install @reduxjs/toolkit react-redux
npm install zustand # Alternative lightweight option

# UI Components
npm install react-native-paper
npm install @react-native-community/slider
npm install react-native-vector-icons
npm install @expo/vector-icons

# Maps & Location
npm install react-native-maps
npm install expo-location
npm install react-native-google-places-autocomplete

# Image & Media
npm install expo-image-picker
npm install expo-camera
npm install react-native-image-crop-picker

# Payments
npm install @stripe/stripe-react-native

# Forms & Validation
npm install react-hook-form
npm install yup @hookform/resolvers

# Utils
npm install axios
npm install date-fns
npm install lodash
npm install @types/lodash --save-dev

# Push Notifications
npm install expo-notifications

# Analytics
npm install @react-native-firebase/analytics

# Testing
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
npm install --save-dev @types/jest

# Linting & Formatting
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Step 3: Firebase Project Setup

#### 3.1 Create Firebase Project

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Select:
# - Firestore: Configure security rules and indexes
# - Storage: Configure security rules
# - Hosting: (optional)
# - Functions: (optional for backend)

# Follow prompts:
# - Use existing project or create new
# - Firestore rules: firestore.rules
# - Firestore indexes: firestore.indexes.json
# - Storage rules: storage.rules
```

#### 3.2 Configure Firebase Web App

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project
3. Click "Add app" → Web (</>) icon
4. Register app name: "GLAMGO"
5. Copy the Firebase config object

#### 3.3 Configure Firebase iOS App

1. In Firebase Console → Project Settings
2. Click "Add app" → iOS icon
3. Enter iOS Bundle ID: `com.glamgo.app`
4. Download `GoogleService-Info.plist`
5. Place in `ios/` directory

#### 3.4 Configure Firebase Android App

1. In Firebase Console → Project Settings
2. Click "Add app" → Android icon
3. Enter Android package name: `com.glamgo.app`
4. Download `google-services.json`
5. Place in `android/app/` directory

### Step 4: Environment Configuration

Create environment files:

```bash
# Create .env file
touch .env

# Create .env.example (template for team)
touch .env.example
```

Add to `.env`:
```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_key

# API Base URL
API_BASE_URL=https://your-api.com

# Environment
NODE_ENV=development
```

Add to `.gitignore`:
```
.env
.env.local
.env.*.local
```

### Step 5: Project Structure Setup

Run these commands to create the folder structure:

```bash
# Create main directories
mkdir -p src/features
mkdir -p src/core/domain/entities
mkdir -p src/core/domain/repositories
mkdir -p src/core/domain/usecases
mkdir -p src/core/data/repositories
mkdir -p src/core/data/datasources
mkdir -p src/core/data/models
mkdir -p src/shared/presentation/components
mkdir -p src/shared/presentation/screens
mkdir -p src/shared/presentation/navigation
mkdir -p src/shared/presentation/hooks
mkdir -p src/shared/presentation/styles
mkdir -p src/shared/utils
mkdir -p src/shared/constants
mkdir -p src/shared/types
mkdir -p src/config
mkdir -p assets/images
mkdir -p assets/fonts
mkdir -p assets/icons

# Create feature directories
mkdir -p src/features/auth/{domain,data,presentation}
mkdir -p src/features/customer/{domain,data,presentation}
mkdir -p src/features/vendor/{domain,data,presentation}
mkdir -p src/features/driver/{domain,data,presentation}
mkdir -p src/features/admin/{domain,data,presentation}
mkdir -p src/features/products/{domain,data,presentation}
mkdir -p src/features/orders/{domain,data,presentation}
mkdir -p src/features/delivery/{domain,data,presentation}
mkdir -p src/features/payments/{domain,data,presentation}
mkdir -p src/features/reviews/{domain,data,presentation}

# Create test directories
mkdir -p __tests__/unit
mkdir -p __tests__/integration
mkdir -p __tests__/e2e
```

### Step 6: Configuration Files

#### 6.1 TypeScript Configuration

Create/update `tsconfig.json`:
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@features/*": ["src/features/*"],
      "@core/*": ["src/core/*"],
      "@shared/*": ["src/shared/*"],
      "@config/*": ["src/config/*"],
      "@assets/*": ["assets/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

#### 6.2 ESLint Configuration

Create `.eslintrc.js`:
```javascript
module.exports = {
  root: true,
  extends: [
    'expo',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
```

#### 6.3 Prettier Configuration

Create `.prettierrc`:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

#### 6.4 Firebase Configuration

Create `src/config/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
```

### Step 7: Firestore Security Rules

Update `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function hasRole(role) {
      return isAuthenticated() && 
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == role;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(userId);
      allow delete: if hasRole('admin');
      
      // Subcollections
      match /addresses/{addressId} {
        allow read, write: if isOwner(userId);
      }
      
      match /paymentMethods/{paymentId} {
        allow read, write: if isOwner(userId);
      }
      
      match /notifications/{notificationId} {
        allow read, write: if isOwner(userId);
      }
    }
    
    // Vendors collection
    match /vendors/{vendorId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId) || hasRole('admin');
      allow delete: if hasRole('admin');
      
      match /products/{productId} {
        allow read: if isAuthenticated();
        allow write: if isOwner(get(/databases/$(database)/documents/vendors/$(vendorId)).data.userId);
      }
      
      match /orders/{orderId} {
        allow read: if isOwner(get(/databases/$(database)/documents/vendors/$(vendorId)).data.userId);
      }
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if true; // Public read
      allow create: if hasRole('vendor');
      allow update: if isOwner(resource.data.vendorId) || hasRole('admin');
      allow delete: if isOwner(resource.data.vendorId) || hasRole('admin');
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if isOwner(resource.data.customerId) || 
                     isOwner(resource.data.vendorId) ||
                     isOwner(resource.data.driverId) ||
                     hasRole('admin');
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.customerId) ||
                       isOwner(resource.data.vendorId) ||
                       isOwner(resource.data.driverId) ||
                       hasRole('admin');
      
      match /items/{itemId} {
        allow read: if isOwner(get(/databases/$(database)/documents/orders/$(orderId)).data.customerId);
      }
    }
    
    // Deliveries collection
    match /deliveries/{deliveryId} {
      allow read: if isOwner(resource.data.customerId) ||
                     isOwner(resource.data.vendorId) ||
                     isOwner(resource.data.driverId) ||
                     hasRole('admin');
      allow create: if hasRole('vendor') || hasRole('admin');
      allow update: if isOwner(resource.data.driverId) || hasRole('admin');
    }
    
    // Drivers collection
    match /drivers/{driverId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.userId) || hasRole('admin');
      allow delete: if hasRole('admin');
      
      match /earnings/{earningId} {
        allow read: if isOwner(get(/databases/$(database)/documents/drivers/$(driverId)).data.userId);
      }
      
      match /deliveries/{deliveryId} {
        allow read: if isOwner(get(/databases/$(database)/documents/drivers/$(driverId)).data.userId);
      }
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if true; // Public read
      allow create: if isAuthenticated() && isOwner(request.resource.data.customerId);
      allow update: if isOwner(resource.data.customerId);
      allow delete: if hasRole('admin');
    }
    
    // Categories collection
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if hasRole('admin');
    }
    
    // Promo codes collection
    match /promoCodes/{promoCodeId} {
      allow read: if isAuthenticated();
      allow write: if hasRole('admin') || hasRole('vendor');
    }
    
    // Admin settings
    match /admin/{document=**} {
      allow read: if hasRole('admin');
      allow write: if hasRole('admin');
    }
  }
}
```

### Step 8: Storage Security Rules

Update `storage.rules`:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isImage() {
      return request.resource.contentType.matches('image/.*');
    }
    
    function isValidSize(maxSizeMB) {
      return request.resource.size < maxSizeMB * 1024 * 1024;
    }
    
    // User profile photos
    match /users/{userId}/profile/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId) && isImage() && isValidSize(5);
    }
    
    // Product images
    match /products/{vendorId}/{productId}/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isValidSize(5);
    }
    
    // Vendor documents
    match /vendors/{vendorId}/documents/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isOwner(vendorId) && isValidSize(10);
    }
    
    // Driver documents
    match /drivers/{driverId}/documents/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isOwner(driverId) && isValidSize(10);
    }
    
    // Delivery proof
    match /deliveries/{deliveryId}/proof/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated() && isImage() && isValidSize(5);
    }
    
    // Review photos
    match /reviews/{reviewId}/{fileName} {
      allow read: if true;
      allow write: if isAuthenticated() && isImage() && isValidSize(5);
    }
  }
}
```

### Step 9: Deploy Firebase Configuration

```bash
# Deploy Firestore rules and indexes
firebase deploy --only firestore

# Deploy Storage rules
firebase deploy --only storage

# Deploy all
firebase deploy
```

### Step 10: Run the Project

```bash
# Start Expo development server
npm start

# Or run on specific platform
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

---

## Additional Setup

### Enable Firebase Authentication Methods

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable the following:
   - Email/Password
   - Google
   - Apple (for iOS)
   - Phone

### Set up Google Maps API

1. Go to Google Cloud Console: https://console.cloud.google.com
2. Create a new project or select existing
3. Enable APIs:
   - Maps SDK for iOS
   - Maps SDK for Android
   - Places API
   - Directions API
   - Distance Matrix API
4. Create credentials (API Key)
5. Restrict API key by application and API

### Set up Stripe

1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Get your Publishable Key
3. Set up webhook endpoints for payment events
4. Configure payment methods

### Set up Push Notifications

```bash
# Configure Expo push notifications
expo install expo-notifications

# Get Expo push token in your app
# Configure FCM for Android and APNs for iOS
```

---

## Development Workflow

### Daily Development

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Before Committing

```bash
# Run linting
npm run lint

# Run tests
npm test

# Check TypeScript
npx tsc --noEmit

# Stage changes
git add .

# Commit with conventional commits
git commit -m "feat: add user authentication"

# Push to remote
git push origin your-branch
```

---

## Troubleshooting

### Common Issues

#### 1. Node modules issues
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install
```

#### 2. Expo cache issues
```bash
# Clear Expo cache
expo start -c
```

#### 3. iOS build issues
```bash
cd ios
pod install
cd ..
```

#### 4. Android build issues
```bash
cd android
./gradlew clean
cd ..
```

#### 5. Firebase connection issues
- Check Firebase configuration in `src/config/firebase.ts`
- Verify API keys in `.env`
- Check Firebase project settings

---

## Testing

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

---

## Deployment

### Build for Production

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Both
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

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## Team Collaboration

### Git Workflow

1. Create feature branch: `git checkout -b feature/user-authentication`
2. Make changes and commit regularly
3. Push to remote: `git push origin feature/user-authentication`
4. Create Pull Request on GitHub
5. Request code review
6. Merge after approval

### Branch Naming Convention

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Urgent fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates

### Commit Message Convention

Follow Conventional Commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

---

## Next Steps

1. ✅ Complete setup checklist above
2. 📖 Review FIREBASE_SCHEMA.md
3. 📋 Review USER_STORIES.md
4. 🏗️ Review ARCHITECTURE.md (next file)
5. 📅 Review SPRINT_PLAN.md (next file)
6. 🎯 Start Sprint 1!

