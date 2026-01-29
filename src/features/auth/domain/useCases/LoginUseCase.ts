/**
 * Login Use Case
 * 
 * This is the DOMAIN LAYER - contains business logic for user login.
 * 
 * Responsibilities:
 * - Validate email and password input
 * - Call the AuthRepository to authenticate the user
 * - Handle authentication errors
 * - Return the logged-in user
 * 
 * Why a separate use case from RegisterUseCase?
 * - Single Responsibility Principle: Each use case does ONE thing
 * - Login has different validation than registration (simpler)
 * - Easier to test in isolation
 * - Can be reused across different UI implementations
 */

import { AuthRepository } from '../repositories/AuthRepository';
import { User } from '../entities/User';

/**
 * Custom error class for login-specific errors
 * Helps distinguish login errors from other types of errors
 */
export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoginError';
  }
}

/**
 * LoginUseCase - Orchestrates the login process
 * 
 * This class encapsulates all business logic for user login.
 * It validates input, calls the repository, and handles errors.
 */
export class LoginUseCase {
  /**
   * Constructor uses Dependency Injection
   * We pass in the repository so we can:
   * - Test with a mock repository
   * - Swap Firebase for another service easily
   * - Follow the Dependency Inversion Principle
   */
  constructor(private authRepository: AuthRepository) {}

  /**
   * Main login method
   * 
   * Flow:
   * 1. Validate email format
   * 2. Validate password exists
   * 3. Call repository to authenticate
   * 4. Return the user if successful
   * 5. Throw error if authentication fails
   * 
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise<User> - The authenticated user
   * @throws LoginError - If validation fails or authentication fails
   */
  async execute(email: string, password: string): Promise<User> {
    // Step 1: Validate email format
    if (!this.isValidEmail(email)) {
      throw new LoginError('Please enter a valid email address');
    }

    // Step 2: Validate password is provided
    if (!password || password.trim().length === 0) {
      throw new LoginError('Please enter your password');
    }

    try {
      // Step 3: Call the repository to authenticate the user
      // The repository handles the actual Firebase authentication
      const user = await this.authRepository.login(email.trim(), password);

      // Step 4: Return the authenticated user
      return user;
    } catch (error) {
      // Step 5: Handle authentication errors
      // Firebase returns different error codes, we translate them to user-friendly messages
      if (error instanceof Error) {
        // Check for specific Firebase error codes
        if (error.message.includes('user-not-found') || error.message.includes('wrong-password')) {
          throw new LoginError('Invalid email or password');
        }
        if (error.message.includes('too-many-requests')) {
          throw new LoginError('Too many failed login attempts. Please try again later');
        }
        if (error.message.includes('network-request-failed')) {
          throw new LoginError('Network error. Please check your connection');
        }
        // For other errors, pass through the message
        throw new LoginError(error.message);
      }
      // Unknown error type
      throw new LoginError('An unexpected error occurred. Please try again');
    }
  }

  /**
   * Email validation helper
   * 
   * Uses a regex pattern to check if email is in valid format.
   * This is the same validation we use in RegisterUseCase.
   * 
   * Pattern explanation:
   * - Starts with alphanumeric characters + special chars before @
   * - Must have @ symbol
   * - Domain name after @
   * - Must have . and TLD (com, org, etc.)
   * 
   * @param email - Email string to validate
   * @returns boolean - True if valid, false otherwise
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
