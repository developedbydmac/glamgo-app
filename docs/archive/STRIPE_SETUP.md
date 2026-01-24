# 💳 Stripe API Keys Setup Guide

**Complete guide to get Stripe API keys for payment processing**

---

## 📋 What You'll Get

- **Publishable Key** (Public, safe to expose)
- **Secret Key** (Private, NEVER expose)

---

## 🚀 Quick Start (5 minutes)

### Step 1: Create Stripe Account
1. Go to: **https://dashboard.stripe.com/register**
2. Fill in:
   - **Email address**
   - **Full name**
   - **Country** (United States recommended)
   - **Password**
3. Click **"Create account"**

### Step 2: Verify Email
1. Check your email
2. Click verification link
3. Return to Stripe Dashboard

### Step 3: Get Test API Keys
1. You'll land on the Stripe Dashboard
2. Click **"Developers"** in the top right
3. Click **"API keys"** in the left sidebar

### Step 4: Copy Your Keys

You'll see two keys:

#### Publishable Key (Starts with `pk_test_`)
```
pk_test_51OXxxx...xxxxxx
```
**Use for:** Frontend (React Native app)  
**Safe to expose:** Yes

#### Secret Key (Starts with `sk_test_`)
```
sk_test_51OXxxx...xxxxxx
```
**Use for:** Backend (Firebase Cloud Functions)  
**Safe to expose:** ❌ **NO! Never commit to Git!**

---

## 📝 Update Environment Variables

### Open .env File
```bash
code .env
```

### Add Your Stripe Keys
```env
# Stripe Configuration
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
```

**Example:**
```env
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51OXmHc2eZvKYlo2C...
STRIPE_SECRET_KEY=sk_test_51OXmHc2eZvKYlo2C...
```

### Save File
- Press **Cmd+S** (Mac) or **Ctrl+S** (Windows)
- ⚠️ **Never commit .env to Git!**

✅ **Result:** Stripe keys configured!

---

## 🏢 For Production (Later)

### When You're Ready to Go Live:

1. **Activate Account:**
   - Go to Stripe Dashboard
   - Click "Activate account"
   - Provide business information
   - Add bank account
   - Verify identity

2. **Get Production Keys:**
   - Toggle **"Test mode"** OFF (top right)
   - Go to Developers → API keys
   - Copy **Production keys**:
     - `pk_live_...` (Publishable)
     - `sk_live_...` (Secret)

3. **Update Production .env:**
   ```env
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
   ```

---

## 🎯 Stripe Features for GLAMGO

### What Stripe Provides:
- ✅ Credit/Debit card payments
- ✅ Apple Pay / Google Pay
- ✅ Payment security (PCI compliant)
- ✅ Fraud prevention
- ✅ Customer management
- ✅ Subscription billing (future)
- ✅ Stripe Connect (vendor/driver payouts)

### GLAMGO Payment Flow:
1. **Customer** adds items to cart
2. **Customer** enters payment method
3. **Stripe** processes payment securely
4. **GLAMGO** receives payment
5. **Stripe Connect** pays out to vendors
6. **Stripe Connect** pays out to drivers

---

## 🔗 Stripe Connect Setup (For Vendor/Driver Payouts)

### Enable Stripe Connect (Later, when needed):

1. Go to **https://dashboard.stripe.com/connect/accounts/overview**
2. Click **"Get started"**
3. Choose **"Platform or marketplace"**
4. Fill in business information
5. Complete onboarding

**Note:** This is for Sprint 6-8 (vendor/driver features)

---

## 📊 Test Your Stripe Integration

### Test Card Numbers (Use in Test Mode):

| Card | Number | Use Case |
|------|--------|----------|
| **Success** | `4242 4242 4242 4242` | Payment succeeds |
| **Decline** | `4000 0000 0000 0002` | Card declined |
| **Insufficient Funds** | `4000 0000 0000 9995` | Insufficient funds |
| **3D Secure** | `4000 0025 0000 3155` | Requires authentication |

**Use any:**
- **Expiry:** Any future date (e.g., 12/34)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

---

## 💰 Pricing

### Stripe Fees:
- **Standard:** 2.9% + $0.30 per transaction
- **Connect (payouts):** Additional 0.25% per payout
- **No monthly fees**
- **No setup fees**

**Example for $50 order:**
- Customer pays: $50.00
- Stripe fee: $1.76 (2.9% + $0.30)
- You receive: $48.24

---

## 🆘 Troubleshooting

### Issue: "Can't find API keys"
- Click **"Developers"** (top right)
- Click **"API keys"** (left sidebar)

### Issue: "Keys don't work"
- Ensure you copied the full key
- Check if you're in Test mode (toggle top right)
- Verify no extra spaces when pasting

### Issue: "Need live keys"
- Click **"Activate account"** banner
- Complete business verification
- Toggle Test mode OFF
- Copy live keys

---

## 🔒 Security Best Practices

### ✅ DO:
- Use test keys during development
- Store secret key in `.env` file
- Keep `.env` in `.gitignore`
- Use HTTPS in production
- Validate on backend (Firebase Functions)

### ❌ DON'T:
- Commit secret key to Git
- Share secret key publicly
- Use live keys during development
- Store secret key in frontend code
- Hard-code keys in your app

---

## 📞 Resources

- **Stripe Dashboard:** https://dashboard.stripe.com
- **Stripe Docs:** https://stripe.com/docs
- **Test Cards:** https://stripe.com/docs/testing
- **React Native SDK:** https://stripe.com/docs/stripe-react-native
- **Connect Docs:** https://stripe.com/docs/connect

---

## ✅ Checklist

After completing this guide, you should have:

- [x] Stripe account created
- [x] Email verified
- [x] Publishable key obtained (`pk_test_...`)
- [x] Secret key obtained (`sk_test_...`)
- [x] Keys added to `.env` file
- [x] `.env` not committed to Git

---

## 🎯 Next Steps

1. ✅ Stripe keys obtained
2. → **Get Google Maps API keys** (see `GOOGLE_MAPS_SETUP.md`)
3. → **Install Stripe SDK:** `npm install @stripe/stripe-react-native`
4. → **Configure Stripe in app** (Sprint 4: Payments)

---

## 📅 When to Use

- **Now:** Get test keys and add to `.env`
- **Sprint 4:** Implement payment processing
- **Sprint 6-8:** Set up Stripe Connect for payouts
- **Before Launch:** Activate account and get live keys

---

**Created:** January 24, 2026  
**Estimated Time:** 5 minutes  
**Difficulty:** ⭐ Easy

---

**👑 GLAMGO - From Roots to Doorstep 👑**
