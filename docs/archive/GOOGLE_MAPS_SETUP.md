# 🗺️ Google Maps API Keys Setup Guide

**Complete guide to get Google Maps API keys for location services**

---

## 📋 What You'll Get

- **Google Maps API Key** (for iOS)
- **Google Maps API Key** (for Android)
- Can use same key for both platforms

---

## 🚀 Quick Start (10 minutes)

### Step 1: Create Google Cloud Project

1. Go to: **https://console.cloud.google.com**
2. Sign in with Google account
3. Click **"Select a project"** (top left)
4. Click **"NEW PROJECT"**
5. **Project name:** Enter `GLAMGO` or `glamgo-app`
6. **Location:** Leave as "No organization"
7. Click **"CREATE"**
8. Wait for project creation (30 seconds)

✅ **Result:** Google Cloud project created!

---

### Step 2: Enable Required APIs

#### 2.1: Go to APIs & Services
1. Click **☰** menu (top left)
2. Click **"APIs & Services"** → **"Library"**

#### 2.2: Enable Maps SDK for iOS
1. Search for: **"Maps SDK for iOS"**
2. Click on it
3. Click **"ENABLE"**
4. Wait for activation (30 seconds)

#### 2.3: Enable Maps SDK for Android
1. Click **"← Back to library"**
2. Search for: **"Maps SDK for Android"**
3. Click on it
4. Click **"ENABLE"**

#### 2.4: Enable Places API
1. Click **"← Back to library"**
2. Search for: **"Places API"**
3. Click on it
4. Click **"ENABLE"**

#### 2.5: Enable Directions API
1. Click **"← Back to library"**
2. Search for: **"Directions API"**
3. Click on it
4. Click **"ENABLE"**

#### 2.6: Enable Distance Matrix API
1. Click **"← Back to library"**
2. Search for: **"Distance Matrix API"**
3. Click on it
4. Click **"ENABLE"**

✅ **Result:** 5 APIs enabled!

---

### Step 3: Create API Key

#### 3.1: Go to Credentials
1. Click **☰** menu (top left)
2. Click **"APIs & Services"** → **"Credentials"**

#### 3.2: Create Credentials
1. Click **"+ CREATE CREDENTIALS"** (top)
2. Select **"API key"**
3. A popup will show your key:
   ```
   AIzaSyB...your_key_here...XYZ
   ```
4. **Copy this key!** (Click copy icon)

✅ **Result:** API key created!

---

### Step 4: Restrict API Key (Important for Security!)

#### 4.1: Click "RESTRICT KEY"
Or click on the key name to edit it.

#### 4.2: Name Your Key
- **Name:** `GLAMGO Mobile App Key`

#### 4.3: Application Restrictions

**For now, select "None"** (we'll restrict later when we have bundle IDs)

*Later, you'll restrict by:*
- **iOS:** Bundle ID (e.g., `com.twisthelpwhit.glamgo`)
- **Android:** Package name + SHA-1 fingerprint

#### 4.4: API Restrictions
1. Select **"Restrict key"**
2. Check these APIs:
   - ✅ Maps SDK for iOS
   - ✅ Maps SDK for Android
   - ✅ Places API
   - ✅ Directions API
   - ✅ Distance Matrix API

#### 4.5: Save
Click **"SAVE"**

✅ **Result:** API key restricted and secured!

---

## 📝 Update Environment Variables

### Open .env File
```bash
code .env
```

### Add Your Google Maps Keys
```env
# Google Maps Configuration
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_IOS=AIzaSyB...YOUR_ACTUAL_KEY
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_ANDROID=AIzaSyB...YOUR_ACTUAL_KEY
```

**Note:** You can use the **same key for both** iOS and Android

**Example:**
```env
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_IOS=AIzaSyBdVl2c...
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_ANDROID=AIzaSyBdVl2c...
```

### Save File
- Press **Cmd+S** (Mac) or **Ctrl+S** (Windows)
- ⚠️ **Never commit .env to Git!**

✅ **Result:** Google Maps keys configured!

---

## 🎯 Google Maps Features for GLAMGO

### What Google Maps Provides:

#### Maps Display:
- ✅ Interactive maps
- ✅ Custom markers (vendors, drivers, customers)
- ✅ Map styles (custom GLAMGO theme)
- ✅ Current location

#### Places API:
- ✅ Address autocomplete
- ✅ Place details
- ✅ Geocoding (address → coordinates)
- ✅ Reverse geocoding (coordinates → address)

#### Directions API:
- ✅ Turn-by-turn navigation
- ✅ Route optimization
- ✅ ETA calculation
- ✅ Multiple waypoints

#### Distance Matrix API:
- ✅ Distance calculation between locations
- ✅ Delivery time estimates
- ✅ Driver assignment optimization
- ✅ Radius-based vendor search

---

## 🗺️ GLAMGO Map Use Cases

### Customer App:
- View nearby vendors on map
- See delivery driver location in real-time
- Track order delivery progress
- Save delivery addresses

### Vendor App:
- Set store location
- View delivery coverage area
- See active orders on map

### Driver App:
- Navigate to pickup location
- Navigate to customer location
- Optimize multi-stop routes
- Track distance traveled

---

## 💰 Pricing

### Google Maps Platform Pricing:

#### Free Tier (Monthly):
- **Maps:** 28,000 loads free
- **Places:** 2,000 requests free (autocomplete)
- **Directions:** 2,000 requests free
- **Distance Matrix:** 2,000 elements free

#### After Free Tier:
- **Maps:** $7 per 1,000 loads
- **Places:** $17 per 1,000 requests
- **Directions:** $5 per 1,000 requests
- **Distance Matrix:** $5 per 1,000 elements

**Note:** You get **$200 free credit every month!**

---

## 🔒 Restrict API Key for Production

### When Ready for Production:

#### Get Bundle ID / Package Name:

**iOS Bundle ID:**
```bash
# In app.json, find:
"ios": {
  "bundleIdentifier": "com.twisthelpwhit.glamgo"
}
```

**Android Package Name:**
```bash
# In app.json, find:
"android": {
  "package": "com.twisthelpwhit.glamgo"
}
```

#### Get Android SHA-1 Fingerprint:
```bash
# For debug build:
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Look for SHA1 line:
# SHA1: AA:BB:CC:DD:EE:FF:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE
```

#### Restrict in Google Cloud Console:
1. Go to Credentials
2. Click on your API key
3. **Application restrictions:**
   - Select **"iOS apps"** for iOS key
   - Add bundle ID: `com.twisthelpwhit.glamgo`
   - Select **"Android apps"** for Android key
   - Add package name: `com.twisthelpwhit.glamgo`
   - Add SHA-1 fingerprint
4. Click **"SAVE"**

---

## 🧪 Test Your Google Maps Integration

### Test Features:

#### 1. Map Display
- App should show a map
- Map should be interactive (pan, zoom)
- Current location button should work

#### 2. Address Autocomplete
- Start typing an address
- Suggestions should appear
- Selecting suggestion should populate address

#### 3. Geocoding
- Enter address
- Should convert to coordinates (lat, lng)

#### 4. Directions
- Set origin and destination
- Should show route on map
- Should show ETA

### Test Addresses (for development):
- **Vendor:** "123 Beauty Ave, Los Angeles, CA 90001"
- **Customer:** "456 Glam St, Los Angeles, CA 90002"
- **Driver:** Anywhere in between

---

## 🆘 Troubleshooting

### Issue: "API key not found"
- Check you copied the full key
- Ensure no extra spaces
- Verify key is in `.env` file

### Issue: "This API project is not authorized"
- Go to Google Cloud Console
- Enable the required APIs (Step 2)
- Wait 5-10 minutes for activation

### Issue: "API key restrictions"
- For development, set Application restrictions to **"None"**
- For production, add bundle ID/package name
- For Android, add SHA-1 fingerprint

### Issue: "Exceeded quota"
- Check usage in Google Cloud Console
- You get $200 free credit monthly
- Add billing account if needed

### Issue: "Map not displaying"
- Check API key in `.env`
- Verify Maps SDK enabled
- Check bundle ID (iOS) or package name (Android)
- Check SHA-1 fingerprint (Android)

---

## 📊 Monitor Usage

### Check API Usage:
1. Go to **https://console.cloud.google.com**
2. Select your project
3. Click **☰** → **"APIs & Services"** → **"Dashboard"**
4. See usage graphs for each API

### Set Quota Alerts:
1. Click **☰** → **"Billing"** → **"Budgets & alerts"**
2. Click **"CREATE BUDGET"**
3. Set monthly budget (e.g., $50)
4. Set alert threshold (e.g., 80%)
5. Add your email
6. Click **"FINISH"**

---

## 📞 Resources

- **Google Cloud Console:** https://console.cloud.google.com
- **Maps Platform Docs:** https://developers.google.com/maps
- **Pricing Calculator:** https://mapsplatform.google.com/pricing/
- **React Native Maps:** https://github.com/react-native-maps/react-native-maps
- **Places Autocomplete:** https://developers.google.com/maps/documentation/places/web-service/autocomplete

---

## ✅ Checklist

After completing this guide, you should have:

- [x] Google Cloud project created
- [x] 5 APIs enabled (Maps iOS, Maps Android, Places, Directions, Distance Matrix)
- [x] API key created
- [x] API key restricted (by API)
- [x] Keys added to `.env` file
- [x] `.env` not committed to Git

---

## 🎯 Next Steps

1. ✅ Google Maps keys obtained
2. → **Install Maps SDK:** `npm install react-native-maps`
3. → **Configure Maps in app** (Sprint 2: Product browsing with map)
4. → **Implement driver navigation** (Sprint 8-9: Driver app)

---

## 📅 When to Use

- **Sprint 2:** Display vendors on map (Products feature)
- **Sprint 3:** Address autocomplete (Checkout)
- **Sprint 5:** Real-time delivery tracking (Order tracking)
- **Sprint 8-9:** Driver navigation (Driver app)

---

## 🔐 Security Notes

### ✅ DO:
- Enable only the APIs you need
- Restrict key by application (bundle ID)
- Monitor usage regularly
- Set quota alerts
- Use different keys for dev/prod

### ❌ DON'T:
- Commit API key to Git
- Share API key publicly
- Leave key unrestricted
- Ignore usage alerts
- Use same key across all projects

---

**Created:** January 24, 2026  
**Estimated Time:** 10 minutes  
**Difficulty:** ⭐⭐ Medium

---

**👑 GLAMGO - From Roots to Doorstep 👑**
