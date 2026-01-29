# Sprint 1 - Task 1: User Registration (US-001) ✅

## 📋 Task Summary

**User Story:** As a customer, I want to create an account with email and password so that I can start using the app

**Story Points:** 5  
**Status:** ✅ COMPLETE - Ready for Testing  
**Time Spent:** ~2 hours

---

## 🎓 What You Learned

### 1. Clean Architecture Pattern

We built the registration feature using **Clean Architecture**, which separates code into 3 layers:

```
┌─────────────────────────────────────────┐
│   PRESENTATION LAYER (What users see)   │
│   - RegisterScreen.tsx                  │
│   - UI components, forms, buttons       │
└────────────────┬────────────────────────┘
                 ↓ Uses
┌─────────────────────────────────────────┐
│   DOMAIN LAYER (Business Logic)         │
│   - User entity                         │
│   - RegisterUseCase                     │
│   - AuthRepository interface            │
└────────────────┬────────────────────────┘
                 ↓ Implements
┌─────────────────────────────────────────┐
│   DATA LAYER (Talks to Firebase)        │
│   - FirebaseAuthRepository              │
│   - Firebase Auth & Firestore calls     │
└─────────────────────────────────────────┘
```

**Why this matters:**
- ✅ **Testable** - Each layer can be tested separately
- ✅ **Flexible** - Can swap Firebase for another service easily
- ✅ **Maintainable** - Changes in one layer don't break others
- ✅ **Clear** - Code organization matches real-world concepts

---

### 2. Key Concepts Explained

#### A. Entities (User.ts)
**What:** Pure data structures representing business concepts  
**Example:** The `User` entity represents a user in our system

```typescript
export interface User {
  uid: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  isEmailVerified: boolean;
  // ...more fields
}
```

**Why:** Entities are the "nouns" of your app - they don't do anything, they just exist

---

#### B. Repositories (AuthRepository.ts)
**What:** Contracts/interfaces that define how to interact with data  
**Example:** `AuthRepository` defines methods like `register()`, `login()`, `logout()`

```typescript
export interface AuthRepository {
  register(userData: CreateUserData): Promise<User>;
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  // ...more methods
}
```

**Why:** The domain layer defines WHAT operations exist, but not HOW they work. The data layer implements the HOW.

---

#### C. Use Cases (RegisterUseCase.ts)
**What:** Application-specific business rules - the "verbs" of your app  
**Example:** `RegisterUseCase` orchestrates the registration process

```typescript
class RegisterUseCase {
  async execute(userData: CreateUserData): Promise<User> {
    // 1. Validate input
    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email');
    }
    
    // 2. Call repository to create user
    const user = await this.authRepository.register(userData);
    
    // 3. Send verification email
    await this.authRepository.sendEmailVerification();
    
    return user;
  }
}
```

**Why:** Use cases contain business logic that's specific to YOUR app. They coordinate between entities and repositories.

---

#### D. Repository Implementation (FirebaseAuthRepository.ts)
**What:** The actual code that talks to external services (Firebase)  
**Example:** Implements all methods from `AuthRepository` interface

```typescript
class FirebaseAuthRepository implements AuthRepository {
  async register(userData: CreateUserData): Promise<User> {
    // 1. Create Firebase Auth account
    const credential = await createUserWithEmailAndPassword(
      auth, userData.email, userData.password
    );
    
    // 2. Save user document in Firestore
    await setDoc(doc(db, 'users', credential.user.uid), {
      email: userData.email,
      name: userData.name,
      // ...more data
    });
    
    return user;
  }
}
```

**Why:** This is where we finally talk to Firebase. If we switch to AWS Cognito, we only change this file.

---

#### E. Presentation (RegisterScreen.tsx)
**What:** The UI that users interact with  
**Example:** Form with inputs, validation, loading states

```typescript
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegister = async () => {
    const registerUseCase = new RegisterUseCase(authRepository);
    const user = await registerUseCase.execute({ email, password, ... });
    // Navigate to next screen
  };
  
  return (
    <View>
      <TextInput value={email} onChangeText={setEmail} />
      <Button onPress={handleRegister} />
    </View>
  );
};
```

**Why:** The UI is just a thin layer that collects input and calls use cases. No business logic here.

---

## 📁 Files Created

```
src/
├── config/
│   └── firebase.config.ts              # Firebase initialization
├── features/
│   └── auth/
│       ├── domain/
│       │   ├── entities/
│       │   │   └── User.ts             # User entity & types
│       │   ├── repositories/
│       │   │   └── AuthRepository.ts   # Repository interface
│       │   └── useCases/
│       │       └── RegisterUseCase.ts  # Registration business logic
│       ├── data/
│       │   └── repositories/
│       │       └── FirebaseAuthRepository.ts  # Firebase implementation
│       └── presentation/
│           └── screens/
│               └── RegisterScreen.tsx  # Registration UI
```

**Total Lines of Code:** ~650 lines

---

## 🎨 UI Features Implemented

### Form Validation
- ✅ Email format validation
- ✅ Password strength indicator (Weak/Medium/Strong)
- ✅ Confirm password matching
- ✅ Phone number validation
- ✅ Real-time error messages

### User Experience
- ✅ Loading indicator during registration
- ✅ Keyboard handling (avoids covering inputs)
- ✅ Smooth scrolling
- ✅ Brand colors (GLAMGO purple #4A2663, gold #C9A961)
- ✅ Success/error alerts
- ✅ Link to login screen (placeholder)

---

## 🔥 Firebase Integration

### What Happens When User Registers:

1. **Firebase Authentication**
   - Creates account with email/password
   - Returns user UID (unique ID)

2. **Firestore Database**
   - Creates document in `users/{uid}` collection
   - Stores: name, email, phone, role, timestamps
   - Uses server timestamps for consistency

3. **Email Verification**
   - Sends verification email automatically
   - User must verify before full access

### Firestore Structure Created:

```
users/ (collection)
  └── {uid}/  (document)
      ├── email: "user@example.com"
      ├── name: "John Doe"
      ├── phone: "5551234567"
      ├── role: "customer"
      ├── isEmailVerified: false
      ├── isPhoneVerified: false
      ├── isActive: true
      ├── createdAt: Timestamp
      ├── updatedAt: Timestamp
      └── lastLoginAt: null
```

---

## 🧪 Testing Checklist

### Manual Testing Steps:

1. **Start the app:**
   ```bash
   npx expo start --tunnel
   ```

2. **Test valid registration:**
   - Enter all fields with valid data
   - Tap "Sign Up"
   - Should see success alert
   - Check Firebase Console → Authentication (user should appear)
   - Check Firebase Console → Firestore → users (document should exist)

3. **Test validation errors:**
   - Leave fields empty → Should show "field is required"
   - Enter invalid email → Should show "Invalid email format"
   - Enter short password → Should show "Password must be at least 8 characters"
   - Enter mismatched passwords → Should show "Passwords do not match"

4. **Test duplicate email:**
   - Register with same email twice
   - Should show "This email is already registered"

5. **Test password strength indicator:**
   - Type 1-5 chars → Red "Weak"
   - Type 6-9 chars → Orange "Medium"
   - Type 10+ chars → Green "Strong"

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module firebase"
**Solution:** Run `npm install firebase`

### Issue 2: "Firebase API key is missing"
**Solution:** Check `.env` file has `EXPO_PUBLIC_FIREBASE_API_KEY` and other Firebase config

### Issue 3: "Email already in use" error
**Solution:** This is expected! Firebase prevents duplicate accounts. Use a different email.

### Issue 4: App shows blank screen
**Solution:** 
1. Check Metro bundler terminal for errors
2. Reload app (shake device → Reload)
3. Clear cache: `npx expo start --clear`

---

## 📚 Acceptance Criteria Status

From Sprint Plan US-001:

- ✅ User can enter email, password, name, phone
- ✅ Email validation works
- ✅ Password strength indicator shows
- ✅ Account created in Firebase Auth
- ✅ User document created in Firestore
- ⏳ Welcome screen shown after signup (TODO: Need to add navigation)

**5 out of 6 criteria complete!**

---

## 🎯 Next Steps

### Immediate:
1. **Test the registration screen** on your device
2. **Verify Firebase integration** in Firebase Console
3. **Take screenshots** for documentation

### Sprint 1 Remaining Tasks:
- **US-002:** Login Screen (3 points)
- **US-003:** Google Social Login (4 points)
- **US-004:** User Profile Management (4 points)
- **US-005:** Role-Based Navigation (3 points)
- **US-006:** Logout (2 points)

---

## 💡 Key Takeaways

1. **Clean Architecture** separates concerns cleanly
2. **Use Cases** contain your business logic - test these heavily
3. **Repositories** abstract data sources - makes switching easy
4. **React Native forms** need careful validation and UX consideration
5. **Firebase integration** is straightforward with proper structure

---

## 🤔 Questions to Reinforce Learning

1. **Q:** Why do we have an AuthRepository interface AND FirebaseAuthRepository class?
   **A:** The interface defines the contract (what methods exist), while the implementation provides the details (how they work with Firebase). This lets us swap Firebase for another service easily.

2. **Q:** Where should validation logic go - RegisterScreen or RegisterUseCase?
   **A:** RegisterUseCase! Business rules belong in the domain layer, not the UI. The UI can add basic checks for UX, but core validation is in use cases.

3. **Q:** What happens if Firebase is down when someone registers?
   **A:** The FirebaseAuthRepository will throw an error, which RegisterUseCase catches and re-throws, which RegisterScreen catches and shows to the user as an Alert.

4. **Q:** Why use TypeScript interfaces for entities?
   **A:** Interfaces provide type safety - the compiler catches errors before runtime. If we try to access `user.fullName` but it's actually `user.name`, TypeScript tells us immediately.

---

## 📸 Screenshots

*TODO: Add screenshots after testing on device*

1. Registration form (empty state)
2. Registration form (filled with validation)
3. Password strength indicator
4. Success alert
5. Firebase Console showing new user

---

**Completed By:** Development Team  
**Date:** January 28, 2026  
**Duration:** 2 hours  
**Sprint:** Sprint 1 - Authentication & User Management
