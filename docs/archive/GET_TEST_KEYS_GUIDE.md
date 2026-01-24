# 🔄 Switch to Stripe Test Mode & Get Google Maps Keys

**Quick guide to get test API keys and finish setup**

---

## 🧪 **Part 1: Get Stripe Test Keys** (2 minutes)

### Step 1: Open Stripe Dashboard
👉 **Go to:** https://dashboard.stripe.com

You should already be logged in!

---

### Step 2: Switch to Test Mode

**Look at the TOP of the page:**

You'll see a toggle switch that says either:
- 🔴 **"Viewing live data"** (currently what you're in)
- OR
- 🟢 **"Viewing test data"**

**Click the toggle to switch to TEST MODE** 

It should now say: **"Viewing test data"** 🟢

---

### Step 3: Get Your Test API Keys

**Now that you're in test mode:**

1. Click **"Developers"** in the left sidebar
2. Click **"API keys"**
3. You'll see two TEST keys:
   - **Publishable key** - starts with `pk_test_...`
   - **Secret key** - starts with `sk_test_...` (click "Reveal live key" to see it)

**Copy both keys!**

**Tell me:** "✅ Got test keys" and paste them, then I'll update your `.env` file!

---

### 📝 **Test Keys Format:**
```
Publishable: pk_test_XXXXXXXXXXXXXXXXXXX
Secret: sk_test_XXXXXXXXXXXXXXXXXXX
```

---

## 🗺️ **Part 2: Google Maps Setup** (10 minutes)

Once you have your Stripe test keys, we'll move to Google Maps!

### Step 1: Go to Google Cloud Console
👉 **Go to:** https://console.cloud.google.com

**You do:**
1. Sign in with your Google account (same as Firebase)
2. **Tell me:** "✅ On Google Cloud Console"

---

### Step 2: Create New Project (or Select Existing)

**Option A - Create New Project:**
1. Click the project dropdown at the top
2. Click **"New Project"**
3. **Project name:** `GLAMGO Maps` or `glamgo-app`
4. Click **"Create"**
5. Wait 30 seconds
6. Select the new project

**Option B - Use Existing:**
1. Click project dropdown
2. Select your `glamgo-app` project

**Tell me:** "✅ Project selected"

---

### Step 3: Enable Required APIs

**You need to enable 5 APIs:**

1. In the search bar at top, type: **"Maps SDK for iOS"**
2. Click the result
3. Click **"Enable"**
4. Wait for it to enable

**Repeat for these 4 more APIs:**
- **Maps SDK for Android**
- **Places API**
- **Directions API**
- **Distance Matrix API**

**Tell me:** "✅ APIs enabled" (after all 5 are done)

---

### Step 4: Create API Key

1. Click **"Credentials"** in the left sidebar
2. Click **"+ Create Credentials"** at the top
3. Select **"API key"**
4. A popup shows your new key: `AIzaSyC...`
5. **Copy the key!**

**DON'T CLOSE THE POPUP YET!**

**Tell me:** "✅ Key created" and paste the key

---

### Step 5: Restrict API Key (Important for Security)

**In the popup that's still open:**

1. Click **"Edit API key"** (or "Restrict Key")
2. **Application restrictions:**
   - For now, select **"None"** (we'll restrict later when we have bundle IDs)
3. **API restrictions:**
   - Select **"Restrict key"**
   - Check these 5 APIs:
     - ☑️ Maps SDK for iOS
     - ☑️ Maps SDK for Android  
     - ☑️ Places API
     - ☑️ Directions API
     - ☑️ Distance Matrix API
4. Click **"Save"**

**Tell me:** "✅ Key restricted"

---

### Step 6: Update .env File

**Once you give me:**
- ✅ Stripe test publishable key (pk_test_...)
- ✅ Stripe test secret key (sk_test_...)
- ✅ Google Maps API key (AIzaSy...)

**I'll update your `.env` file with all of them!**

---

## 📊 **What You'll Get:**

### Updated .env File Will Have:
```env
# Firebase Configuration ✅ (already done)
EXPO_PUBLIC_FIREBASE_API_KEY=...
# ... all 7 Firebase keys

# Stripe Configuration ✅ (test keys)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Google Maps Configuration ✅ (new)
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_IOS=AIzaSy...
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_ANDROID=AIzaSy...

# App Configuration ✅
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_URL=https://us-central1-glamgo-app.cloudfunctions.net
```

---

## 💳 **Test Card Numbers for Stripe**

Once you have test keys, use these fake card numbers to test payments:

| Card Number | Type | Result |
|-------------|------|--------|
| 4242 4242 4242 4242 | Visa | ✅ Success |
| 4000 0000 0000 0002 | Visa | ❌ Declined |
| 4000 0025 0000 3155 | Visa | ✅ Requires 3D Secure |

**Any future expiry date (e.g., 12/34)**  
**Any 3-digit CVC (e.g., 123)**

---

## 🎯 **Checklist:**

**Stripe Test Mode:**
- [ ] Switch to "Viewing test data" mode
- [ ] Copy test publishable key (pk_test_...)
- [ ] Copy test secret key (sk_test_...)

**Google Maps:**
- [ ] Create/select Google Cloud project
- [ ] Enable 5 APIs (Maps iOS, Maps Android, Places, Directions, Distance Matrix)
- [ ] Create API key (AIzaSy...)
- [ ] Restrict API key to those 5 APIs

**Share with me:**
- [ ] Stripe test publishable key
- [ ] Stripe test secret key
- [ ] Google Maps API key

---

## ⏱️ **Time Estimate:**

| Task | Time |
|------|------|
| Switch to Stripe test mode | 1 min |
| Get Stripe test keys | 1 min |
| Create Google Cloud project | 1 min |
| Enable 5 APIs | 4 min |
| Create & restrict API key | 3 min |
| Update .env file | 1 min |
| **Total** | **~10 min** |

---

**Ready? Let's start with Stripe test mode!** 🚀

**Tell me when you have the test keys, and we'll move to Google Maps!**

**👑 GLAMGO - From Roots to Doorstep 👑**
