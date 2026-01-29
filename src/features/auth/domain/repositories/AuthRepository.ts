/**
 * Authentication Repository Interface
 * 
 * This defines the CONTRACT for authentication operations.
 * It doesn't implement anything - just defines what methods must exist.
 * 
 * Clean Architecture Principle:
 * The domain layer defines interfaces, but the data layer implements them.
 * This is called "Dependency Inversion" - high-level code doesn't depend on low-level details.
 * 
 * Why use interfaces?
 * - We can swap Firebase for another service (AWS Cognito, Auth0) without changing business logic
 * - Makes testing easier (we can create mock implementations)
 * - Forces consistent API across the app
 */

import { User, CreateUserData, UpdateUserData } from '../entities/User';

export interface AuthRepository {
  /**
   * Register a new user with email and password
   * 
   * @param userData - User registration data
   * @returns Promise with the created user object
   * @throws Error if email already exists or validation fails
   */
  register(userData: CreateUserData): Promise<User>;

  /**
   * Sign in with email and password
   * 
   * @param email - User's email
   * @param password - User's password
   * @returns Promise with the authenticated user
   * @throws Error if credentials are invalid
   */
  login(email: string, password: string): Promise<User>;

  /**
   * Sign in with Google OAuth
   * 
   * For React Native (Expo):
   * - UI layer handles expo-auth-session to get Google ID token
   * - ID token is passed to this method
   * - Repository creates Firebase credential and authenticates
   * 
   * @param idToken - Google ID token from expo-auth-session
   * @returns Promise with the authenticated user
   * @throws Error if Google sign-in fails
   */
  loginWithGoogle(idToken: string): Promise<User>;

  /**
   * Sign out the current user
   * 
   * @returns Promise that resolves when sign out is complete
   */
  logout(): Promise<void>;

  /**
   * Get the currently authenticated user
   * 
   * @returns Promise with current user or null if not authenticated
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Update user profile information
   * 
   * @param uid - User ID
   * @param data - Partial user data to update
   * @returns Promise with updated user
   */
  updateProfile(uid: string, data: UpdateUserData): Promise<User>;

  /**
   * Upload profile photo to Firebase Storage
   * 
   * @param uid - User ID
   * @param imageUri - Local file URI from image picker
   * @returns Promise with the uploaded photo URL
   */
  uploadProfilePhoto(uid: string, imageUri: string): Promise<string>;

  /**
   * Send email verification to user
   * 
   * @returns Promise that resolves when email is sent
   */
  sendEmailVerification(): Promise<void>;

  /**
   * Reset password via email
   * 
   * @param email - User's email address
   * @returns Promise that resolves when reset email is sent
   */
  resetPassword(email: string): Promise<void>;
}
