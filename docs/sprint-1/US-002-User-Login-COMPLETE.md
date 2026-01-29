# Sprint 1 - Task 2: User Login (US-002) ✅

## 📋 Task Summary

**User Story:** As a customer, I want to log in with my email and password so that I can access my account

**Story Points:** 3  
**Status:** ✅ COMPLETE - Ready for Testing  
**Time Spent:** ~1 hour

---

## 🎓 What You Learned

### 1. **Reusing Clean Architecture Components**

We didn't have to rebuild everything! We reused:
- ✅ `AuthRepository` interface (already had `login()` method)
- ✅ `FirebaseAuthRepository` implementation (already had Firebase login logic)
- ✅ `User` entity (same user object)

We only added:
- 🆕 `LoginUseCase` - New business logic for login
- 🆕 `LoginScreen` - New UI for login

**Why this matters:**
- **Saves time** - Don't repeat yourself (DRY principle)
- **Consistency** - Same repository for register and login
- **Maintainability** - Fix bugs in one place, affects all features

---

### 2. **Single Responsibility Principle**

Each class has ONE job:
- `RegisterUseCase` → Handles registration logic
- `LoginUseCase` → Handles login logic
- `AuthRepository` → Defines authentication contract
- `FirebaseAuthRepository` → Implements Firebase authentication

**Why separate use cases?**
- Login validation is simpler (no password confirmation, no phone)
- Different error handling (user-not-found vs email-already-in-use)
- Easier to test each flow independently
- Can modify one without affecting the other

---

### 3. **Error Handling Strategy**

Firebase returns technical error codes, we translate them to user-friendly messages:

| Firebase Error Code | User-Friendly Message |
|---------------------|----------------------|
| `user-not-found` | "Invalid email or password" |
| `wrong-password` | "Invalid email or password" |
| `too-many-requests` | "Too many failed login attempts" |
| `network-request-failed` | "Network error. Check your connection" |

**Security Note:** We say "Invalid email OR password" (not "Email doesn't exist") to prevent account enumeration attacks.

---

## 📁 Files Created

```
src/features/auth/
├── domain/
│   └── useCases/
│       ├── RegisterUseCase.ts      # EXISTING
│       └── LoginUseCase.ts         # NEW - 120 lines
└── presentation/
    └── screens/
        ├── RegisterScreen.tsx      # EXISTING
        └── LoginScreen.tsx         # NEW - 280 lines
```

**Total New Code:** ~400 lines

---

## 🎨 UI Comparison: Login vs Register

### Login Screen (Simpler)
```
Welcome Back
Log in to your GLAMGO account

┌─────────────────────────┐
│ Email                   │
│ [                    ]  │
└─────────────────────────┘
┌─────────────────────────┐
│ Password                │
│ [                    ]  │
└─────────────────────────┘

        Forgot Password?

┌─────────────────────────┐
│       Log In            │
└─────────────────────────┘

Don't have an account? Sign Up
```

### Register Screen (More Complex)
```
Create Account
Join GLAMGO and start shopping

┌─────────────────────────┐
│ Full Name               │
│ Email                   │
│ Phone Number            │
│ Password                │
│ ├─ Weak/Medium/Strong   │
│ Confirm Password        │
└─────────────────────────┘

┌─────────────────────────┐
│       Sign Up           │
└─────────────────────────┘

Already have an account? Log In
```

---

## 🧪 Testing Checklist

### ✅ Test 1: Empty Fields Validation
1. Leave both fields empty
2. Tap "Log In"
3. Should see: "Email is required" and "Password is required"

### ✅ Test 2: Wrong Email
1. Enter email NOT registered: `notregistered@example.com`
2. Enter any password: `password123`
3. Tap "Log In"
4. Should see alert: "Invalid email or password"

### ✅ Test 3: Wrong Password
1. Enter a registered email (from US-001)
2. Enter wrong password: `wrongpassword`
3. Tap "Log In"
4. Should see alert: "Invalid email or password"

### ✅ Test 4: Successful Login
1. Enter email from registration: (your test email)
2. Enter correct password: (your test password)
3. Tap "Log In"
4. Should see:
   - Loading indicator (spinning wheel)
   - Success alert: "Welcome Back! Hello, [Your Name]!"
   - Console log: "User logged in: [user_id]"

### ✅ Test 5: Forgot Password Link
1. Tap "Forgot Password?"
2. Should see alert: "Password reset feature coming soon!"
3. (This is a placeholder - we'll implement US-007 later)

### ✅ Test 6: Sign Up Link
1. Tap "Sign Up" link
2. Should log to console: "Navigate to Sign Up screen"
3. (Navigation between screens coming in US-005)

---

## 🔥 Firebase Integration

### What Happens When User Logs In:

```
1. User enters email and password
     ↓
2. LoginScreen validates form (email format, password exists)
     ↓
3. LoginScreen calls LoginUseCase.execute()
     ↓
4. LoginUseCase validates email format
     ↓
5. LoginUseCase calls FirebaseAuthRepository.login()
     ↓
6. FirebaseAuthRepository calls Firebase:
   await signInWithEmailAndPassword(auth, email, password)
     ↓
7. Firebase checks credentials:
   - ✅ Valid: Returns user data
   - ❌ Invalid: Throws error (wrong-password, user-not-found, etc.)
     ↓
8. FirebaseAuthRepository updates lastLoginAt in Firestore
     ↓
9. User object returned to LoginScreen
     ↓
10. LoginScreen shows success alert
     ↓
11. Navigate to home screen (TODO in US-005)
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Invalid email or password" but credentials are correct
**Possible Causes:**
1. Account created but not yet in Firebase Auth
2. Using different environment (dev vs prod)
3. Email has extra spaces (trim them)

**Solution:** 
- Check Firebase Console → Authentication
- Verify the email exists
- Try resetting password via Firebase Console

### Issue 2: App shows blank screen
**Solution:**
1. Check terminal for errors
2. Shake phone → Reload
3. Press `r` in terminal to reload

### Issue 3: "Too many failed login attempts"
**Cause:** Firebase rate limiting after multiple wrong passwords

**Solution:** 
- Wait 5-10 minutes
- Or use Firebase Console to manually verify account

---

## 📚 Acceptance Criteria Status

From Sprint Plan US-002:
- ✅ Email and password input fields
- ✅ Login button with loading state
- ✅ Form validation (email format, required fields)
- ✅ Error handling for invalid credentials
- ⏳ Navigate to home on success (console.log for now, full navigation in US-005)
- ✅ Link to registration screen (logs to console for now)
- ✅ Link to password reset (placeholder alert)

**6 out of 7 criteria complete!** (Navigation pending US-005)

---

## 🎯 Next Steps

### Immediate:
1. **Test the login screen** on your device
2. **Log in with account from US-001**
3. **Verify success message shows your name**
4. **Check Firebase Console** → See lastLoginAt updated

### Sprint 1 Remaining Tasks:
- **US-003:** Google Social Login (4 points)
- **US-004:** User Profile Management (4 points)
- **US-005:** Role-Based Navigation (3 points) ← This will connect Register & Login screens
- **US-006:** Logout (2 points)

---

## 💡 Key Takeaways

1. **Clean Architecture is reusable** - We used existing repository and entity
2. **Use Cases separate concerns** - One use case per business flow
3. **User-friendly errors matter** - Translate technical errors to human messages
4. **Security through simplicity** - Don't reveal if email exists or password is wrong
5. **Form validation differs by use case** - Login needs less validation than registration

---

## 🤔 Questions to Reinforce Learning

1. **Q:** Why do we have separate `RegisterUseCase` and `LoginUseCase` if they both use the same repository?
   **A:** Single Responsibility Principle - each has different validation rules and business logic. Login doesn't need password strength checks or confirmation.

2. **Q:** Why do we say "Invalid email OR password" instead of "Email not found"?
   **A:** Security - prevents attackers from discovering which emails are registered (account enumeration attack).

3. **Q:** Could we use the same screen for both login and registration with a toggle?
   **A:** Technically yes, but better UX to have separate screens. Login is quick (2 fields), registration needs more info (5 fields). Separate screens are clearer.

4. **Q:** Where is the user's auth state stored after login?
   **A:** Firebase Auth handles this internally. Currently in memory (lost on app restart). We'll add AsyncStorage persistence later for session persistence.

---

## 📱 How to Switch Between Screens

**For Testing:**

Show Login Screen (current):
```bash
cp App.login.tsx App.tsx
```

Show Register Screen:
```bash
cp App.register.tsx App.tsx
```

**For Production:**
We'll implement proper navigation with React Navigation in US-005!

---

**Completed By:** Development Team  
**Date:** January 28, 2026  
**Duration:** 1 hour  
**Sprint:** Sprint 1 - Authentication & User Management
