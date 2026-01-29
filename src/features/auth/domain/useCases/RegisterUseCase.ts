/**
 * Register Use Case
 * 
 * This encapsulates the BUSINESS LOGIC for user registration.
 * It's the "brain" that coordinates the registration process.
 * 
 * Clean Architecture Principle:
 * Use Cases contain application-specific business rules.
 * They orchestrate the flow of data to/from entities and repositories.
 * 
 * Why use Use Cases?
 * - Single Responsibility: Each use case does ONE thing
 * - Reusable: Can be called from UI, API, or background jobs
 * - Testable: Easy to unit test without UI or database
 * - Clear: Reading the code tells you exactly what the app does
 */

import { AuthRepository } from '../repositories/AuthRepository';
import { CreateUserData, User } from '../entities/User';

/**
 * Input validation errors
 * These are domain-level validation rules (not UI rules)
 */
export class RegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RegistrationError';
  }
}

export class RegisterUseCase {
  /**
   * Constructor injection - we pass in the repository
   * This is Dependency Injection, making the code flexible
   */
  constructor(private authRepository: AuthRepository) {}

  /**
   * Execute the registration process
   * 
   * Business Rules:
   * 1. Email must be valid format
   * 2. Password must be at least 8 characters
   * 3. Name must not be empty
   * 4. Phone must be valid format
   * 
   * @param userData - Registration data from the user
   * @returns The newly created user
   * @throws RegistrationError if validation fails
   */
  async execute(userData: CreateUserData): Promise<User> {
    // Validate email format
    if (!this.isValidEmail(userData.email)) {
      throw new RegistrationError('Invalid email format');
    }

    // Validate password strength
    if (userData.password.length < 8) {
      throw new RegistrationError('Password must be at least 8 characters');
    }

    // Validate name
    if (!userData.name.trim()) {
      throw new RegistrationError('Name is required');
    }

    // Validate phone (basic check - can be enhanced)
    if (!this.isValidPhone(userData.phone)) {
      throw new RegistrationError('Invalid phone number format');
    }

    // If all validations pass, create the user via repository
    try {
      const user = await this.authRepository.register(userData);
      
      // Send email verification after successful registration
      await this.authRepository.sendEmailVerification();
      
      return user;
    } catch (error) {
      // Re-throw with more context
      if (error instanceof Error) {
        if (error.message.includes('email-already-in-use')) {
          throw new RegistrationError('This email is already registered');
        }
        throw new RegistrationError(error.message);
      }
      throw error;
    }
  }

  /**
   * Email validation using regex
   * This is a simple validation - production apps might use more robust libraries
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Phone validation (US format)
   * Accepts: (555) 123-4567, 555-123-4567, 5551234567
   * You can enhance this for international numbers
   */
  private isValidPhone(phone: string): boolean {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if it's 10 or 11 digits (with country code)
    return digitsOnly.length === 10 || digitsOnly.length === 11;
  }
}
