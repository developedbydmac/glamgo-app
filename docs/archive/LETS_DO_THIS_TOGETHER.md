# 🤝 Let's Set Up Firebase Together!

**Step-by-step guide to complete Firebase setup together in 15-20 minutes**

---

## 🎯 What We'll Do

We'll walk through creating your Firebase project, getting API keys, and deploying the security rules - all together, step by step.

---

## ✅ Before We Start

Make sure you have:
- [ ] Google account (Gmail)
- [ ] Terminal open
- [ ] `.env` file ready to edit
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)

---

## 📝 Step-by-Step Walkthrough

### 🔷 Part 1: Create Firebase Project (5 minutes)

#### Step 1: Open Firebase Console
```
👉 I'll guide you to: https://console.firebase.google.com
```

**You do:**
1. Click the link I provide
2. Sign in with your Google account
3. Tell me when you see the Firebase welcome screen

---

#### Step 2: Create New Project
**You do:**
1. Click **"Add project"** or **"Create a project"**
2. Project name: Type `GLAMGO` (or `glamgo-app`)
3. Click **"Continue"**

**Tell me:** "✅ Project name entered"

---

#### Step 3: Enable Analytics (Optional)
**You do:**
1. Toggle **"Enable Google Analytics"** - ON (recommended)
2. Click **"Continue"**
3. Select your country
4. Accept terms
5. Click **"Create project"**

**Wait:** 30-60 seconds for project creation

**Tell me:** "✅ Project created"

---

### 🔷 Part 2: Get API Keys (3 minutes)

#### Step 4: Add Web App
**You do:**
1. Click the **web icon** `</>` (or "Add app" → Web)
2. App nickname: Type `GLAMGO Web`
3. **Don't check** Firebase Hosting (skip for now)
4. Click **"Register app"**

**Tell me:** "✅ App registered"

---

#### Step 5: Copy Configuration
**You'll see** a code block like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "glamgo-app.firebaseapp.com",
  projectId: "glamgo-app",
  storageBucket: "glamgo-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123",
  measurementId: "G-XXXXXXXXXX"
};
```

**You do:**
1. **Copy** all the values
2. Keep this window open
3. Tell me: "✅ Config copied"

**I'll help you:** Update your `.env` file with these values

---

### 🔷 Part 3: Enable Authentication (2 minutes)

#### Step 6: Set Up Auth
**You do:**
1. Click sidebar: **"Authentication"**
2. Click **"Get started"**
3. Click **"Email/Password"**
4. Toggle **Enable** - ON
5. Click **"Save"**

**Tell me:** "✅ Email auth enabled"

---

#### Step 7: Enable Google Sign-In
**You do:**
1. Click **"Google"** in sign-in providers
2. Toggle **Enable** - ON
3. Select your email from dropdown
4. Click **"Save"**

**Tell me:** "✅ Google auth enabled"

---

### 🔷 Part 4: Create Firestore Database (2 minutes)

#### Step 8: Set Up Firestore
**You do:**
1. Click sidebar: **"Firestore Database"**
2. Click **"Create database"**
3. Select: **"Start in production mode"** (we have custom rules!)
4. Click **"Next"**

---

#### Step 9: Choose Location
**You do:**
1. **Cloud Firestore location:** Select closest to you
   - `us-central1` (Iowa) - Good for US
   - `us-east1` (South Carolina) - Good for East Coast
   - Choose your region
2. Click **"Enable"**

**Wait:** 1-2 minutes for database creation

**Tell me:** "✅ Firestore created"

---

### 🔷 Part 5: Set Up Storage (1 minute)

#### Step 10: Create Storage
**You do:**
1. Click sidebar: **"Storage"**
2. Click **"Get started"**
3. Select: **"Start in production mode"**
4. Click **"Next"**
5. Use **same location** as Firestore
6. Click **"Done"**

**Tell me:** "✅ Storage created"

---

### 🔷 Part 6: Deploy Security Rules (5 minutes)

**Now we switch to terminal!**

#### Step 11: Login to Firebase
**You do** (in terminal):
```bash
firebase login
```

**What happens:**
- Browser opens
- Sign in with same Google account
- Allow Firebase CLI access
- Return to terminal

**Tell me:** "✅ Logged in"

---

#### Step 12: Initialize Firebase
**You do:**
```bash
cd /Users/daquanmcdaniel/Documents/2026/glamgo/glamgo-app
firebase init
```

**Answer the prompts:**
1. **"Which Firebase features?"** 
   - Use arrow keys, spacebar to select:
   - [x] Firestore
   - [x] Storage
   - Press Enter

2. **"Select a default Firebase project"**
   - Select: **"Use an existing project"**
   - Choose: **glamgo-app** (or your project name)

3. **"What file should be used for Firestore Rules?"**
   - Press Enter (uses `firestore.rules`)

4. **"What file should be used for Firestore indexes?"**
   - Press Enter (uses `firestore.indexes.json`)

5. **"What file should be used for Storage Rules?"**
   - Press Enter (uses `storage.rules`)

**Tell me:** "✅ Firebase initialized"

---

#### Step 13: Deploy Everything!
**You do:**
```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

**Wait:** 10-30 seconds for deployment

**You'll see:**
```
✔ Deploy complete!

Project Console: https://console.firebase.google.com/project/glamgo-app/overview
```

**Tell me:** "✅ Rules deployed!"

---

### 🔷 Part 7: Update Environment File (3 minutes)

#### Step 14: Open .env File
**You do:**
```bash
code .env
```

#### Step 15: Update Values
**I'll help you** paste in the correct values from Step 5

**You'll update:**
```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyD...YOUR_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=glamgo-app.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=glamgo-app
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=glamgo-app.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Also update:**
```env
EXPO_PUBLIC_API_URL=https://us-central1-glamgo-app.cloudfunctions.net
```
*(Replace `us-central1` with your region)*
*(Replace `glamgo-app` with your project ID)*

**Save file:** Cmd+S (Mac) or Ctrl+S (Windows)

**Tell me:** "✅ .env updated"

---

## 🎉 We Did It!

### ✅ Verification Checklist

Let's verify everything is working:

**In Firebase Console:**
- [ ] Authentication → Users tab exists (empty is OK)
- [ ] Firestore Database → Data tab shows empty
- [ ] Firestore Database → Rules tab shows our custom rules
- [ ] Firestore Database → Indexes tab shows 10 indexes
- [ ] Storage → Files tab exists (empty is OK)
- [ ] Storage → Rules tab shows our custom rules

**On Your Computer:**
- [ ] `.env` file has real Firebase values
- [ ] Firebase CLI is logged in
- [ ] Rules are deployed
- [ ] No error messages

---

## 🚀 What's Next?

Now that Firebase is set up, we can:

1. **Test on Mobile Device** - Let's get the app running on your phone!
2. **Install Dependencies** - Add remaining packages
3. **Start Sprint 1** - Begin building authentication!

---

## 🆘 Common Issues & Solutions

### Issue: "Can't find firebase command"
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
# Then select correct project
```

### Issue: "Can't see configuration"
1. Go to Firebase Console
2. Click gear icon (Settings)
3. Scroll to "Your apps"
4. Click your web app
5. Click "Config"

---

## 📞 During Our Session

### If You Get Stuck:
1. **Tell me exactly what you see** on screen
2. **Share the error message** if any
3. **Wait for my guidance** before clicking

### Communication:
- ✅ "Done" - When you complete a step
- ⏳ "Working on it" - If it's taking time
- ❓ "What do I do?" - If unclear
- ❌ "Error" - If something goes wrong

---

## ⏱️ Time Estimate

| Part | Task | Time |
|------|------|------|
| 1 | Create Firebase project | 5 min |
| 2 | Get API keys | 3 min |
| 3 | Enable Authentication | 2 min |
| 4 | Create Firestore | 2 min |
| 5 | Set up Storage | 1 min |
| 6 | Deploy rules | 5 min |
| 7 | Update .env | 3 min |
| **Total** | **Complete setup** | **~20 min** |

---

## 🎯 Success Criteria

By the end, you'll have:
- ✅ Firebase project created
- ✅ Web app registered
- ✅ Authentication enabled (Email + Google)
- ✅ Firestore database created
- ✅ Storage bucket created
- ✅ Security rules deployed
- ✅ Indexes deployed (building)
- ✅ `.env` file updated with real keys
- ✅ Ready to start coding!

---

**Let me know when you're ready to start, and we'll do this together!** 🚀

**👑 GLAMGO - From Roots to Doorstep 👑**
