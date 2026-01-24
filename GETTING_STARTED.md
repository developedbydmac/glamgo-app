# GLAMGO - Getting Started Checklist ✅

Use this checklist to set up your development environment and start building GLAMGO!

---

## 📋 Pre-Development Checklist

### Environment Setup

- [ ] **Install Node.js (v18+)**
  ```bash
  node --version  # Should show v18.x.x or higher
  ```

- [ ] **Install Expo CLI**
  ```bash
  npm install -g expo-cli
  expo --version
  ```

- [ ] **Install Firebase CLI**
  ```bash
  npm install -g firebase-tools
  firebase --version
  firebase login
  ```

- [ ] **Install Git**
  ```bash
  git --version
  ```

- [ ] **Install VS Code** (recommended)
  - Download from: https://code.visualstudio.com/

- [ ] **Install Xcode** (for iOS development - macOS only)
  - Install from Mac App Store
  - Run: `xcode-select --install`

- [ ] **Install Android Studio** (for Android development)
  - Download from: https://developer.android.com/studio
  - Set up Android SDK and emulator

---

## 🔧 VS Code Extensions

Install these recommended extensions:

- [ ] ESLint (`dbaeumer.vscode-eslint`)
- [ ] Prettier (`esbenp.prettier-vscode`)
- [ ] React Native Tools (`msjsdiag.vscode-react-native`)
- [ ] ES7+ React/Redux Snippets (`dsznajder.es7-react-js-snippets`)
- [ ] Auto Rename Tag (`formulahendry.auto-rename-tag`)
- [ ] Material Icon Theme (`PKief.material-icon-theme`)
- [ ] GitLens (`eamodio.gitlens`)

---

## 🚀 Project Initialization

### Step 1: Clone or Initialize Project

- [ ] **Clone existing repo** (if applicable)
  ```bash
  git clone https://github.com/developedbydmac/glamgo-app.git
  cd glamgo-app
  ```

- [ ] **OR Initialize new Expo project**
  ```bash
  cd /Users/daquanmcdaniel/Documents/2026/glamgo/glamgo-app
  npx create-expo-app@latest . --template blank-typescript
  ```

### Step 2: Install Dependencies

- [ ] **Install core packages**
  ```bash
  npm install
  ```

- [ ] **Install navigation**
  ```bash
  npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
  npm install react-native-screens react-native-safe-area-context
  ```

- [ ] **Install Firebase**
  ```bash
  npm install firebase
  ```

- [ ] **Install state management**
  ```bash
  npm install @reduxjs/toolkit react-redux
  ```

- [ ] **Install UI components**
  ```bash
  npm install react-native-paper
  ```

- [ ] **Install additional packages** (see SETUP_GUIDE.md for full list)

### Step 3: Configure Environment

- [ ] **Create `.env` file**
  ```bash
  cp .env.example .env
  ```

- [ ] **Add Firebase credentials to `.env`**
  - Get from Firebase Console
  - Never commit `.env` to Git!

- [ ] **Add Stripe keys to `.env`**
  - Get from Stripe Dashboard

- [ ] **Add Google Maps API key to `.env`**
  - Get from Google Cloud Console

### Step 4: Set Up Firebase

- [ ] **Create Firebase project**
  - Go to https://console.firebase.google.com
  - Create new project: "GLAMGO"

- [ ] **Initialize Firebase in project**
  ```bash
  firebase init
  ```
  - Select: Firestore, Storage, Hosting

- [ ] **Add Web app to Firebase project**
  - Get config object
  - Add to `.env`

- [ ] **Add iOS app to Firebase** (if building for iOS)
  - Download `GoogleService-Info.plist`
  - Place in `ios/` directory

- [ ] **Add Android app to Firebase** (if building for Android)
  - Download `google-services.json`
  - Place in `android/app/` directory

- [ ] **Enable Authentication methods**
  - Email/Password
  - Google
  - Apple (for iOS)

- [ ] **Create Firestore database**
  - Start in production mode
  - Deploy security rules from `firestore.rules`

- [ ] **Set up Firebase Storage**
  - Deploy storage rules from `storage.rules`

### Step 5: Set Up Stripe

- [ ] **Create Stripe account**
  - Go to https://dashboard.stripe.com

- [ ] **Get API keys**
  - Test keys for development
  - Production keys for live

- [ ] **Add to `.env`**

- [ ] **Configure webhook endpoints** (later)

### Step 6: Set Up Google Maps

- [ ] **Create Google Cloud project**
  - Go to https://console.cloud.google.com

- [ ] **Enable required APIs**
  - Maps SDK for iOS
  - Maps SDK for Android
  - Places API
  - Directions API
  - Distance Matrix API

- [ ] **Create API key**

- [ ] **Restrict API key**
  - By application (bundle ID)
  - By API (only Maps & Places)

- [ ] **Add to `.env`**

---

## 📁 Project Structure Setup

- [ ] **Create folder structure**
  ```bash
  # Run the commands from SETUP_GUIDE.md Section "Step 5: Project Structure Setup"
  ```

- [ ] **Verify structure created correctly**
  ```bash
  ls -R src/
  ```

---

## ⚙️ Configuration Files

- [ ] **Review/update `tsconfig.json`**
  - Check path aliases
  - Ensure strict mode enabled

- [ ] **Review/update `.eslintrc.js`**
  - Check rules
  - Ensure Prettier integration

- [ ] **Review/update `.prettierrc`**
  - Check formatting rules

- [ ] **Create `src/config/firebase.ts`**
  - Initialize Firebase app
  - Export auth, db, storage

- [ ] **Update `firestore.rules`**
  - Copy rules from SETUP_GUIDE.md
  - Deploy: `firebase deploy --only firestore`

- [ ] **Update `storage.rules`**
  - Copy rules from SETUP_GUIDE.md
  - Deploy: `firebase deploy --only storage`

---

## 🧪 Testing Setup

- [ ] **Install testing libraries**
  ```bash
  npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
  ```

- [ ] **Create test folder structure**
  ```bash
  mkdir -p __tests__/{unit,integration,e2e}
  ```

- [ ] **Configure Jest** (if needed)

- [ ] **Write first test**
  - Test a utility function
  - Verify Jest works

---

## 📚 Documentation Review

- [ ] **Read `SETUP_GUIDE.md`** - Complete setup instructions
- [ ] **Read `ARCHITECTURE.md`** - Understand clean architecture
- [ ] **Read `FIREBASE_SCHEMA.md`** - Review database design
- [ ] **Read `USER_STORIES.md`** - Understand requirements
- [ ] **Read `SPRINT_PLAN.md`** - Review development timeline
- [ ] **Read `TRELLO_BOARD.md`** - Project management guide

---

## 📊 Project Management Setup

### Trello

- [ ] **Create Trello account** (if needed)
  - Go to https://trello.com

- [ ] **Create GLAMGO board**
  - Use structure from `TRELLO_BOARD.md`

- [ ] **Create lists**
  - Backlog
  - Sprint Planning
  - In Progress
  - Code Review
  - Testing
  - Done
  - Deployed
  - Bugs
  - Ideas / Future

- [ ] **Create labels**
  - Priority labels
  - Feature labels
  - Technical labels
  - Status labels

- [ ] **Enable Power-Ups**
  - Calendar
  - Custom Fields
  - Card Aging
  - GitHub (optional)

- [ ] **Add custom fields**
  - Story Points
  - Sprint
  - Epic
  - Status
  - Priority

- [ ] **Create Epic cards**
  - Customer App
  - Vendor Dashboard
  - Driver App
  - Admin Panel
  - Backend/API

- [ ] **Import Sprint 1 stories**
  - From `SPRINT_PLAN.md`
  - Create cards for each user story

- [ ] **Invite team members**

### GitHub

- [ ] **Set up repository**
  - Already done: https://github.com/developedbydmac/glamgo-app.git

- [ ] **Protect main branch**
  - Require pull request reviews
  - Require status checks

- [ ] **Set up branch protection rules**

- [ ] **Add collaborators** (if team)

---

## 🎨 Design & Assets

- [ ] **Create logo** (or use placeholder)
  - Place in `assets/images/logo.png`

- [ ] **Create app icon**
  - Place in `assets/images/icon.png`
  - 1024x1024px

- [ ] **Create splash screen**
  - Place in `assets/images/splash.png`

- [ ] **Set up design system**
  - Colors in `src/shared/presentation/styles/colors.ts`
  - Typography in `src/shared/presentation/styles/typography.ts`
  - Spacing in `src/shared/presentation/styles/spacing.ts`

- [ ] **Create Figma designs** (optional but recommended)

---

## 🚀 First Run

- [ ] **Start development server**
  ```bash
  npm start
  ```

- [ ] **Test on iOS simulator** (macOS only)
  ```bash
  npm run ios
  ```

- [ ] **Test on Android emulator**
  ```bash
  npm run android
  ```

- [ ] **Test on physical device**
  - Install Expo Go app
  - Scan QR code

- [ ] **Verify app loads successfully**

- [ ] **Test hot reload**
  - Make a change
  - Verify it updates immediately

---

## 🔐 Security Checklist

- [ ] **`.env` is in `.gitignore`**
  ```bash
  cat .gitignore | grep .env
  ```

- [ ] **No API keys in code**
  - Use environment variables
  - Never commit secrets

- [ ] **Firebase rules are restrictive**
  - Test with Firebase Emulator

- [ ] **Storage rules are secure**

- [ ] **Enable App Check** (Firebase)
  - Prevent abuse

---

## 🎯 Sprint 1 Preparation

### User Stories for Sprint 1

- [ ] **US-001: User Registration (5 points)**
  - Create Trello card
  - Break down into tasks
  - Estimate effort

- [ ] **US-002: User Login (3 points)**
  - Create Trello card
  - Depends on US-001

- [ ] **US-003: Social Login - Google (4 points)**
  - Create Trello card
  - Depends on US-001

- [ ] **US-004: User Profile Management (4 points)**
  - Create Trello card
  - Depends on US-002

- [ ] **US-005: Role-Based Navigation (3 points)**
  - Create Trello card
  - Depends on US-002

- [ ] **US-006: Logout (2 points)**
  - Create Trello card
  - Depends on US-002

### Technical Tasks

- [ ] **Set up Firebase Authentication (3 points)**
- [ ] **Create Auth domain entities and use cases (4 points)**
- [ ] **Build login/register screens (5 points)**
- [ ] **Implement auth state management (3 points)**
- [ ] **Create navigation structure (3 points)**

### Sprint 1 Goal
**Enable users to register, login, and access their role-appropriate interface.**

---

## 🎉 Ready to Start!

### Pre-Sprint Checklist

- [ ] All tools installed
- [ ] Project initialized
- [ ] Dependencies installed
- [ ] Environment configured
- [ ] Firebase set up
- [ ] Trello board created
- [ ] Documentation reviewed
- [ ] App runs successfully
- [ ] Sprint 1 cards created
- [ ] Team is ready!

---

## 📅 Daily Workflow

### Every Morning
- [ ] Pull latest changes: `git pull origin main`
- [ ] Check Trello board
- [ ] Review Sprint 1 goal
- [ ] Pick a card to work on

### During Development
- [ ] Move card to "In Progress"
- [ ] Create feature branch
- [ ] Write tests (TDD)
- [ ] Implement feature
- [ ] Test manually
- [ ] Commit regularly
- [ ] Update card progress

### Before Committing
- [ ] Run linter: `npm run lint`
- [ ] Run tests: `npm test`
- [ ] Test manually
- [ ] Review changes: `git diff`

### End of Day
- [ ] Push changes
- [ ] Update Trello card
- [ ] Comment on progress
- [ ] Communicate blockers

---

## 🆘 Troubleshooting

### Common Issues

**Issue: Node modules problems**
```bash
rm -rf node_modules
npm install
```

**Issue: Expo cache problems**
```bash
expo start -c
```

**Issue: iOS build problems**
```bash
cd ios && pod install && cd ..
```

**Issue: Android build problems**
```bash
cd android && ./gradlew clean && cd ..
```

**Issue: Firebase not connecting**
- Check `.env` file
- Verify API keys
- Check Firebase console

---

## 📞 Get Help

- 📖 Read documentation in this repo
- 🔍 Search issues on GitHub
- 💬 Ask team on Discord/Slack
- 📧 Email: support@glamgo.com
- 🐛 Create GitHub issue

---

## 🎯 Next Steps

Once setup is complete:

1. ✅ Review Sprint 1 user stories
2. 🎯 Pick first story: US-001 (User Registration)
3. 📋 Move card to "In Progress" on Trello
4. 🔨 Create feature branch: `feature/user-registration`
5. 💻 Start coding!
6. 🧪 Write tests
7. 📝 Commit & push
8. 🔄 Create PR
9. 👀 Request review
10. 🚀 Merge & deploy!

---

## ✨ You're All Set!

You now have everything you need to start building GLAMGO!

**Let's build something amazing! 💄✨**

---

## 📊 Setup Progress Tracker

Track your progress:

```
Setup Phase: [▓▓▓▓▓▓▓▓▓▓] 100%

✅ Tools Installed
✅ Project Initialized
✅ Dependencies Installed
✅ Environment Configured
✅ Firebase Set Up
✅ Trello Created
✅ Documentation Reviewed
✅ First Run Successful

🎯 Ready for Sprint 1!
```

---

**Happy Coding! 🚀**

