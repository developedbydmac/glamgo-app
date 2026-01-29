/**
 * Firebase Authentication Repository Implementation
 * 
 * This is the DATA LAYER - it handles actual communication with Firebase.
 * It IMPLEMENTS the AuthRepository interface defined in the domain layer.
 * 
 * Clean Architecture Principle:
 * The data layer depends on the domain layer (via the interface),
 * but the domain layer doesn't know about Firebase at all.
 * 
 * Why this approach?
 * - If we switch from Firebase to AWS Cognito, we only change this file
 * - Domain logic (validation, business rules) stays unchanged
 * - Testing is easier - we can mock this implementation
 */

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import { auth, db, storage } from '../../../../config/firebase.config';
import { AuthRepository } from '../../domain/repositories/AuthRepository';
import { User, CreateUserData, UpdateUserData, UserRole } from '../../domain/entities/User';

/**
 * Firebase implementation of the AuthRepository
 * 
 * Collections structure in Firestore:
 * - users/{uid} - User documents with profile data
 */
export class FirebaseAuthRepository implements AuthRepository {
  /**
   * Register a new user
   * 
   * Process:
   * 1. Create auth account in Firebase Authentication
   * 2. Create user document in Firestore 'users' collection
   * 3. Return the complete user object
   */
  async register(userData: CreateUserData): Promise<User> {
    try {
      // Step 1: Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const firebaseUser = userCredential.user;

      // Step 2: Create user document in Firestore
      const now = new Date();
      const userDoc: Omit<User, 'uid'> = {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        role: userData.role,
        isEmailVerified: false, // Will be true after they verify
        isPhoneVerified: false,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      };

      // Save to Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...userDoc,
        createdAt: serverTimestamp(), // Use server timestamp for consistency
        updatedAt: serverTimestamp(),
      });

      // Step 3: Return the complete user object
      return {
        uid: firebaseUser.uid,
        ...userDoc,
      };
    } catch (error) {
      // Convert Firebase errors to readable messages
      if (error instanceof Error) {
        console.error('Registration error:', error);
        throw new Error(this.getFirebaseErrorMessage(error));
      }
      throw error;
    }
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get user document from Firestore
      const userDoc = await this.getUserDocument(firebaseUser.uid);

      // Update last login timestamp
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        lastLoginAt: serverTimestamp(),
      });

      return userDoc;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error:', error);
        throw new Error(this.getFirebaseErrorMessage(error));
      }
      throw error;
    }
  }

  /**
   * Login with Google OAuth
   * 
   * For React Native (Expo):
   * - Google Sign-In is handled by expo-auth-session in the UI layer
   * - UI obtains the ID token and passes it here
   * - We create a Firebase credential and sign in
   * 
   * Process:
   * 1. Receive Google ID token from UI layer
   * 2. Create Firebase credential with the ID token
   * 3. Sign in with the credential
   * 4. Check if user exists in Firestore
   * 5. Create user document if first-time login
   * 6. Update lastLoginAt for existing users
   * 
   * @param idToken - Google ID token obtained from expo-auth-session
   * @returns Promise<User> - The authenticated user
   */
  async loginWithGoogle(idToken: string): Promise<User> {
    try {
      // Create Firebase credential from Google ID token
      const credential = GoogleAuthProvider.credential(idToken);
      
      // Sign in to Firebase with the credential
      const userCredential = await signInWithCredential(auth, credential);
      const firebaseUser = userCredential.user;

      // Check if user document exists
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // First time Google login - create user document
        const now = new Date();
        const userDoc: Omit<User, 'uid'> = {
          email: firebaseUser.email!,
          name: firebaseUser.displayName || 'Google User',
          phone: firebaseUser.phoneNumber || '',
          profilePhotoUrl: firebaseUser.photoURL || undefined,
          role: UserRole.CUSTOMER, // Default role
          isEmailVerified: firebaseUser.emailVerified,
          isPhoneVerified: false,
          isActive: true,
          createdAt: now,
          updatedAt: now,
        };

        await setDoc(userDocRef, {
          ...userDoc,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        return {
          uid: firebaseUser.uid,
          ...userDoc,
        };
      }

      // Existing user - just update last login
      await updateDoc(userDocRef, {
        lastLoginAt: serverTimestamp(),
      });

      return await this.getUserDocument(firebaseUser.uid);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Google login error:', error);
        throw new Error(this.getFirebaseErrorMessage(error));
      }
      throw error;
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await signOut(auth);
  }

  /**
   * Get currently authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe(); // Unsubscribe after first check
        
        if (!firebaseUser) {
          resolve(null);
          return;
        }

        try {
          const user = await this.getUserDocument(firebaseUser.uid);
          resolve(user);
        } catch (error) {
          console.error('Error getting current user:', error);
          resolve(null);
        }
      });
    });
  }

  /**
   * Update user profile
   */
  async updateProfile(uid: string, data: UpdateUserData): Promise<User> {
    const userDocRef = doc(db, 'users', uid);
    
    await updateDoc(userDocRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });

    return await this.getUserDocument(uid);
  }

  /**
   * Upload profile photo to Firebase Storage
   * 
   * Process:
   * 1. Fetch the image as a blob
   * 2. Upload to Firebase Storage at users/{uid}/profile.jpg
   * 3. Get the download URL
   * 4. Return the URL
   */
  async uploadProfilePhoto(uid: string, imageUri: string): Promise<string> {
    try {
      // Fetch the image from the local URI
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Create a reference to the storage location
      const storageRef = ref(storage, `users/${uid}/profile.jpg`);

      // Upload the image
      await uploadBytes(storageRef, blob);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error('Upload profile photo error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to upload photo: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Send email verification
   */
  async sendEmailVerification(): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently signed in');
    }

    await firebaseSendEmailVerification(user);
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  /**
   * Helper: Get user document from Firestore
   */
  private async getUserDocument(uid: string): Promise<User> {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error('User document not found');
    }

    const data = userDocSnap.data();
    
    // Convert Firestore Timestamps to JavaScript Dates
    return {
      uid,
      email: data.email,
      name: data.name,
      phone: data.phone,
      profilePhotoUrl: data.profilePhotoUrl,
      role: data.role,
      isEmailVerified: data.isEmailVerified,
      isPhoneVerified: data.isPhoneVerified,
      isActive: data.isActive,
      createdAt: this.timestampToDate(data.createdAt),
      updatedAt: this.timestampToDate(data.updatedAt),
      lastLoginAt: data.lastLoginAt ? this.timestampToDate(data.lastLoginAt) : undefined,
    };
  }

  /**
   * Helper: Convert Firestore Timestamp to Date
   */
  private timestampToDate(timestamp: any): Date {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    }
    if (timestamp instanceof Date) {
      return timestamp;
    }
    return new Date();
  }

  /**
   * Helper: Convert Firebase error codes to user-friendly messages
   */
  private getFirebaseErrorMessage(error: Error): string {
    const errorCode = (error as any).code;
    
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection';
      default:
        return error.message || 'An error occurred';
    }
  }
}
