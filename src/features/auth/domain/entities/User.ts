/**
 * User Entity
 * 
 * This represents a User in our domain/business logic.
 * It's independent of any framework (Firebase, React, etc.)
 * 
 * Clean Architecture Principle:
 * Entities contain enterprise-wide business rules and are the most stable.
 * They should never depend on external frameworks.
 */

export enum UserRole {
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  DRIVER = 'driver',
  ADMIN = 'admin',
}

export interface User {
  // Identity
  uid: string; // Firebase Auth UID
  email: string;
  
  // Profile Information
  name: string;
  phone: string;
  profilePhotoUrl?: string;
  
  // Role & Permissions
  role: UserRole;
  
  // Account Status
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

/**
 * Type for creating a new user (required fields only)
 * This is what we need when registering a new customer
 */
export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: UserRole;
}

/**
 * Type for updating user profile
 * All fields are optional since user can update partially
 */
export interface UpdateUserData {
  name?: string;
  phone?: string;
  profilePhotoUrl?: string;
}
