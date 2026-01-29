# 🔥 Firestore Security Rules Update Required

## Problem
The seed script cannot write to Firestore because of security rules.

## Solution
We need to temporarily update Firestore security rules to allow product seeding.

---

## Step 1: Open Firebase Console

1. Go to: https://console.firebase.google.com/
2. Select your project: **glamgo-app**
3. Click on **Firestore Database** in the left sidebar
4. Click on the **Rules** tab

---

## Step 2: Update Security Rules

Replace your current rules with these **TEMPORARY** rules:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products collection - TEMPORARY: Allow all reads and writes for seeding
    match /products/{productId} {
      allow read: if true;  // Anyone can read products
      allow write: if true; // TEMPORARY for seeding - CHANGE AFTER SEEDING!
    }
    
    // Carts collection - users can only access their own cart
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Step 3: Publish the Rules

1. Click the **Publish** button
2. Wait for confirmation that rules are published

---

## Step 4: Run the Seed Script Again

```bash
node scripts/seedProductsSimple.js
```

---

## Step 5: IMPORTANT - Update Rules After Seeding

After successfully seeding products, **immediately** update the rules to:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products collection - READ ONLY for customers, WRITE for vendors/admins only
    match /products/{productId} {
      allow read: if true;  // Anyone can read products
      allow create, update, delete: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'vendor' ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Carts collection - users can only access their own cart
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Summary

1. ✅ Update Firestore rules to allow product writes
2. ✅ Run seed script: `node scripts/seedProductsSimple.js`
3. ✅ **IMMEDIATELY** update rules to restrict writes to vendors/admins only
4. ✅ Verify 30 products are in Firestore

---

## Alternative: Use Firebase Admin SDK (More Secure)

If you prefer not to open up writes, we can use Firebase Admin SDK which bypasses security rules. Let me know if you want to go this route instead!
