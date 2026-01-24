# 📱 Mobile Testing Troubleshooting Guide

**Issue:** "Request timed out" error when scanning QR code  
**Date:** January 24, 2026

---

## ✅ Current Status

**Expo Server:** ✅ Running  
**URL:** `exp://192.168.200.3:8081`  
**QR Code:** ✅ Generated

---

## 🔧 Solution Options (Try in Order)

### Option 1: Check Network Connection ⭐ MOST COMMON FIX

**Problem:** Your phone and computer must be on the same WiFi network.

**Check:**
1. On your **Mac**: Click WiFi icon → Note the network name
2. On your **Phone**: Settings → WiFi → Check you're on the SAME network
3. **Important:** Make sure you're not on:
   - Guest WiFi
   - Different 5GHz vs 2.4GHz band
   - VPN connection

**If different networks:**
- Connect both to the same WiFi
- Restart Expo (`Ctrl+C` in terminal, then `npm start`)
- Scan QR code again

---

### Option 2: Manual Connection (Works Better)

Instead of scanning QR code, type the URL manually:

**On Your Phone:**
1. Open **Expo Go** app
2. Tap **"Enter URL manually"** at the bottom
3. Type: `exp://192.168.200.3:8081`
4. Tap **"Connect"**

---

### Option 3: Use Tunnel Mode (Bypasses Network Issues)

**What is it:** Uses internet connection instead of local network

**How to use:**
```bash
# In terminal (stop current server with Ctrl+C first)
npm start -- --tunnel
```

**Then:**
- Wait for new QR code
- Scan with Expo Go
- May take longer to load (uses internet)

---

### Option 4: Test in Web Browser First

Let's verify the app works before trying phone:

**In your Expo terminal:**
- Press **`w`** key
- Browser will open with app running
- You should see: "Open up App.tsx to start working on your app!"

**If web works:** App is fine, it's just a connection issue  
**If web fails:** There's a code issue we need to fix

---

### Option 5: Use iOS Simulator (If you have Xcode)

**If you have Xcode installed:**
```bash
# In Expo terminal, press:
i
```

This opens iOS Simulator on your Mac (no phone needed!)

**Don't have Xcode?** Skip this option (it's 12GB download)

---

### Option 6: Restart Everything

Sometimes a fresh start fixes it:

```bash
# 1. Stop Expo (Ctrl+C in terminal)

# 2. Clear cache
npx expo start --clear

# 3. On your phone:
# - Force quit Expo Go app
# - Reopen Expo Go
# - Scan QR code again
```

---

### Option 7: Check Firewall Settings

**macOS Firewall might be blocking:**

1. **System Settings** → **Network** → **Firewall**
2. If Firewall is ON:
   - Click **"Firewall Options"**
   - Look for **"node"** or **"expo"**
   - Make sure it's allowed
3. Or temporarily turn Firewall OFF to test

---

### Option 8: Use Different Port

Sometimes port 8081 is busy:

```bash
# Stop Expo (Ctrl+C)
npm start -- --port 8082
# Scan new QR code
```

---

## 🎯 Quick Diagnostic

**Answer these to narrow down the issue:**

### Question 1: Can you see the QR code in terminal?
- ✅ YES → Network/connection issue
- ❌ NO → Expo didn't start properly

### Question 2: What type of phone do you have?
- 📱 iPhone → Use Camera app or Expo Go
- 🤖 Android → Must use Expo Go app only

### Question 3: Are you on same WiFi?
- ✅ YES → Try Option 2 (manual URL)
- ❌ NO → Connect to same network
- 🤷 NOT SURE → Try Option 3 (tunnel mode)

### Question 4: Do you have VPN running?
- ✅ YES → Turn it off temporarily
- ❌ NO → Good!

---

## 🚀 Alternative: Skip Mobile Testing For Now

**You can continue without phone testing!**

Since we're just starting Sprint 0 and haven't built any UI yet, you can:

### ✅ **Proceed to Step B: Install Dependencies**

This will get all the packages ready for Sprint 1 (Authentication).

### ✅ **Then move to Step C: Stripe & Google Maps Setup**

Get your API keys ready.

### ✅ **Come back to mobile testing later**

Once you have actual screens built in Sprint 1, testing will be more meaningful!

---

## 📊 What SHOULD Happen (When Working)

When successfully connected:

1. **Phone screen shows:**
   - White screen with text: "Open up App.tsx to start working on your app!"
   - This is NORMAL - we haven't built UI yet!

2. **Terminal shows:**
   ```
   › Opening exp://192.168.200.3:8081 on iPhone 15
   › Loading
   ```

3. **You can:**
   - Make code changes
   - Save file
   - App automatically reloads on phone

---

## 🆘 Still Not Working?

### Quick Tests:

#### Test 1: Can you ping your computer from phone?
1. Find your Mac's IP: `192.168.200.3`
2. On phone browser, go to: `http://192.168.200.3:8081`
3. If you see Metro Bundler page → Connection works!

#### Test 2: Is Metro Bundler running?
1. In browser on Mac, go to: `http://localhost:8081`
2. Should see Metro Bundler waiting page

#### Test 3: Check Expo Go version
1. Make sure Expo Go app is updated
2. App Store → Updates → Update Expo Go

---

## 💡 My Recommendation

**For now, let's:**

1. ✅ Skip phone testing temporarily
2. ✅ Move to **Step B: Install Dependencies**
3. ✅ Move to **Step C: API Keys Setup**
4. ✅ Start building Sprint 1 features
5. 🔄 Come back to phone testing when you have actual UI

**Why?**
- Right now there's nothing to see (blank template)
- Once you build login screens, it'll be worth testing
- You can develop and test everything in web browser for now

---

## 🌐 Easiest Way to Test Right Now

### Use Web Browser! (Press `w` in Expo)

**Advantages:**
- ✅ No network issues
- ✅ Instant reload
- ✅ Can use Chrome DevTools
- ✅ Can test everything except:
  - Camera
  - Push notifications
  - Haptic feedback

**For Sprint 1 (Authentication), web is perfect!**

---

## 🔄 Next Steps

**Tell me:**

**A)** "Let's skip phone testing and move to dependencies" ⭐ RECOMMENDED  
**B)** "Let me try Option 2 (manual URL)"  
**C)** "Let's test in web browser first (press w)"  
**D)** "Let me check my WiFi and try again"

---

**Created:** January 24, 2026  
**Expo Server:** Running on `exp://192.168.200.3:8081`  
**Status:** Waiting for connection

**👑 GLAMGO - From Roots to Doorstep 👑**
