# 🔥 Firebase Project Setup Guide

**Complete step-by-step guide to create Firebase project and obtain API keys**

---

## 📋 Table of Contents

1. [Create Firebase Project](#1-create-firebase-project)
2. [Get Firebase API Keys](#2-get-firebase-api-keys)
3. [Enable Authentication](#3-enable-authentication)
4. [Create Firestore Database](#4-create-firestore-database)
5. [Set Up Storage](#5-set-up-storage)
6. [Deploy Security Rules](#6-deploy-security-rules)
7. [Deploy Indexes](#7-deploy-indexes)
8. [Update Environment Variables](#8-update-environment-variables)
9. [Verify Setup](#9-verify-setup)

---

## 1. Create Firebase Project

### Step 1.1: Go to Firebase Console
1. Open browser and go to: **https://console.firebase.google.com**
2. Sign in with your Google account
3. Click **"Add project"** or **"Create a project"**

### Step 1.2: Configure Project
1. **Project name:** Enter `GLAMGO` or `glamgo-app`
2. Click **"Continue"**

### Step 1.3: Google Analytics (Optional but Recommended)
1. **Enable Google Analytics:** Toggle ON (recommended)
2. Click **"Continue"**

### Step 1.4: Configure Analytics
1. **Analytics location:** Choose your country (e.g., United States)
2. **Accept terms:** Check all boxes
3. Click **"Create project"**

### Step 1.5: Wait for Project Creation
- Firebase will create your project (takes 30-60 seconds)
- Click **"Continue"** when ready

✅ **Result:** Firebase project created!

---

## 2. Get Firebase API Keys

### Step 2.1: Add Web App
1. In Firebase Console, click the **web icon** `</>`
2. Or go to: **Project Overview → Add app → Web**

### Step 2.2: Register App
1. **App nickname:** Enter `GLAMGO Web` or `glamgo-app`
2. **Firebase Hosting:** Leave unchecked (for now)
3. Click **"Register app"**

### Step 2.3: Copy Configuration
Firebase will show you a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "glamgo-app.firebaseapp.com",
  projectId: "glamgo-app",
  storageBucket: "glamgo-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 2.4: Save These Values
**Copy each value to update your `.env` file later:**

- `apiKey` → `EXPO_PUBLIC_FIREBASE_API_KEY`
- `authDomain` → `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `projectId` → `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `storageBucket` → `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `messagingSenderId` → `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `appId` → `EXPO_PUBLIC_FIREBASE_APP_ID`
- `measurementId` → `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Step 2.5: Continue to Console
Click **"Continue to console"**

✅ **Result:** You now have Firebase API keys!

---

## 3. Enable Authentication

### Step 3.1: Navigate to Authentication
1. In Firebase Console sidebar, click **"Authentication"**
2. Click **"Get started"**

### Step 3.2: Enable Email/Password
1. Click **"Sign-in method"** tab
2. Click **"Email/Password"**
3. **Enable:** Toggle ON
4. **Email link (passwordless sign-in):** Leave OFF (for now)
5. Click **"Save"**

### Step 3.3: Enable Google Sign-In
1. Click **"Google"** in the sign-in providers list
2. **Enable:** Toggle ON
3. **Project support email:** Select your email
4. Click **"Save"**

### Step 3.4: Enable Apple Sign-In (Optional - for iOS)
1. Click **"Apple"** in the sign-in providers list
2. **Enable:** Toggle ON
3. *Note: Requires Apple Developer account*
4. Click **"Save"** (or skip for now)

✅ **Result:** Authentication methods enabled!

---

## 4. Create Firestore Database

### Step 4.1: Navigate to Firestore
1. In Firebase Console sidebar, click **"Firestore Database"**
2. Click **"Create database"**

### Step 4.2: Choose Security Mode
1. **Start in production mode** (we have custom rules ready)
2. Click **"Next"**

### Step 4.3: Select Location
1. **Cloud Firestore location:** Choose closest region
   - `us-central1` (Iowa) - Good for US
   - `us-east1` (South Carolina) - Good for US East Coast
   - Choose based on your primary audience location
2. ⚠️ **Important:** Location cannot be changed later!
3. Click **"Enable"**

### Step 4.4: Wait for Database Creation
- Firestore will create the database (takes 1-2 minutes)

✅ **Result:** Firestore database created!

---

## 5. Set Up Storage

### Step 5.1: Navigate to Storage
1. In Firebase Console sidebar, click **"Storage"**
2. Click **"Get started"**

### Step 5.2: Security Rules
1. **Start in production mode** (we have custom rules ready)
2. Click **"Next"**

### Step 5.3: Choose Location
1. **Storage location:** Use same location as Firestore
   - Example: `us-central1`
2. Click **"Done"**

### Step 5.4: Wait for Storage Creation
- Storage will be created (takes 30 seconds)

✅ **Result:** Firebase Storage created!

---

## 6. Deploy Security Rules

### Step 6.1: Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

### Step 6.2: Login to Firebase
```bash
firebase login
```
- Browser will open
- Sign in with same Google account
- Allow Firebase CLI access

### Step 6.3: Initialize Firebase in Project
```bash
cd /Users/daquanmcdaniel/Documents/2026/glamgo/glamgo-app
firebase init
```

### Step 6.4: Select Features
Use **spacebar** to select, **enter** to confirm:
- [x] Firestore
- [x] Storage
- [ ] Everything else (skip for now)

Press **Enter**

### Step 6.5: Select Firebase Project
1. **Use an existing project**
2. Select **glamgo-app** (or your project name)
3. Press **Enter**

### Step 6.6: Configure Firestore
1. **Firestore rules file:** Press **Enter** (uses `firestore.rules`)
2. **Firestore indexes file:** Press **Enter** (uses `firestore.indexes.json`)

### Step 6.7: Configure Storage
1. **Storage rules file:** Press **Enter** (uses `storage.rules`)

### Step 6.8: Deploy Rules
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes

# Deploy Storage rules
firebase deploy --only storage
```

**Expected Output:**
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/glamgo-app/overview
```

✅ **Result:** Security rules deployed to Firebase!

---

## 7. Deploy Indexes

Already done in Step 6.8! But you can verify:

### Verify Indexes
1. Go to Firebase Console
2. Click **"Firestore Database"**
3. Click **"Indexes"** tab
4. You should see 10 composite indexes:
   - Products indexes (3)
   - Orders indexes (2)
   - Deliveries indexes (2)
   - Reviews indexes (2)
   - More...

✅ **Result:** Indexes deployed and building!

*Note: Indexes may take 5-10 minutes to build*

---

## 8. Update Environment Variables

### Step 8.1: Open .env File
```bash
code .env
# Or use any text editor
```

### Step 8.2: Update Firebase Keys
Replace the placeholder values with your actual keys from Step 2:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyD...YOUR_ACTUAL_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=glamgo-app.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=glamgo-app
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=glamgo-app.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 8.3: Update API URL
```env
EXPO_PUBLIC_API_URL=https://us-central1-glamgo-app.cloudfunctions.net
```
*Replace `us-central1` with your region if different*
*Replace `glamgo-app` with your actual project ID*

### Step 8.4: Save File
- Press **Cmd+S** (Mac) or **Ctrl+S** (Windows)
- ⚠️ **Never commit .env to Git!**

✅ **Result:** Environment variables updated!

---

## 9. Verify Setup

### Step 9.1: Check Firebase Connection
```bash
# Test Firebase connection
npm start
```

### Step 9.2: Verify in Firebase Console

#### Check Authentication:
1. Go to **Authentication** → **Users**
2. Should be empty (no users yet) ✅

#### Check Firestore:
1. Go to **Firestore Database** → **Data**
2. Should be empty (no collections yet) ✅
3. Go to **Rules** tab
4. Should show your custom rules ✅
5. Go to **Indexes** tab
6. Should show 10 indexes (may be building) ✅

#### Check Storage:
1. Go to **Storage** → **Files**
2. Should be empty ✅
3. Go to **Rules** tab
4. Should show your custom rules ✅

✅ **Result:** Firebase setup complete and verified!

---

## 🎉 Success Checklist

After completing all steps, you should have:

- [x] Firebase project created (`glamgo-app`)
- [x] Firebase API keys obtained
- [x] Web app registered
- [x] Email/Password authentication enabled
- [x] Google authentication enabled
- [x] Firestore database created
- [x] Storage bucket created
- [x] Firestore rules deployed
- [x] Storage rules deployed
- [x] Firestore indexes deployed (and building)
- [x] `.env` file updated with real keys
- [x] Firebase CLI initialized in project

---

## 🔑 Where to Find Your Keys Later

### Firebase Console URLs:
- **Project Overview:** https://console.firebase.google.com/project/glamgo-app/overview
- **Project Settings:** https://console.firebase.google.com/project/glamgo-app/settings/general
- **Web App Config:** Project Settings → Your apps → Web app → Config

### To Get Keys Again:
1. Go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"**
3. Click on your web app
4. Click **"Config"**
5. Copy the `firebaseConfig` object

---

## 🆘 Troubleshooting

### Issue: "Firebase CLI not found"
```bash
npm install -g firebase-tools
```

### Issue: "Permission denied"
```bash
sudo npm install -g firebase-tools
```

### Issue: "Wrong project selected"
```bash
firebase use --add
# Select correct project
```

### Issue: "Rules deployment failed"
```bash
# Check syntax
firebase deploy --only firestore:rules --debug

# Check if logged in
firebase login --reauth
```

### Issue: "Indexes taking too long"
- Indexes can take 5-15 minutes to build
- Check status in Firebase Console → Firestore → Indexes
- Green checkmark = Ready
- Orange clock = Building

---

## 📊 Expected Timeline

| Task | Time |
|------|------|
| Create Firebase project | 2 minutes |
| Get API keys | 2 minutes |
| Enable authentication | 3 minutes |
| Create Firestore | 2 minutes |
| Set up Storage | 1 minute |
| Install Firebase CLI | 2 minutes |
| Initialize and deploy rules | 5 minutes |
| Update .env file | 2 minutes |
| Verify setup | 3 minutes |
| **Total** | **~20 minutes** |

---

## 🎯 Next Steps After Firebase Setup

1. ✅ Firebase project created
2. → **Get Stripe API keys** (see `STRIPE_SETUP.md`)
3. → **Get Google Maps API keys** (see `GOOGLE_MAPS_SETUP.md`)
4. → **Install remaining dependencies**
5. → **Test app on mobile device**
6. → **Start Sprint 1: Authentication**

---

## 📞 Resources

- **Firebase Console:** https://console.firebase.google.com
- **Firebase Docs:** https://firebase.google.com/docs
- **Firebase CLI Docs:** https://firebase.google.com/docs/cli
- **Firestore Security Rules:** https://firebase.google.com/docs/firestore/security/get-started
- **Storage Security Rules:** https://firebase.google.com/docs/storage/security

---

**Created:** January 24, 2026  
**Last Updated:** January 24, 2026  
**Next:** Complete API keys setup (Stripe, Google Maps)

---

**👑 GLAMGO - From Roots to Doorstep 👑**
