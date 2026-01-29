/**
 * Google Sign-In Use Case
 * 
 * This is the DOMAIN LAYER - contains business logic for Google authentication.
 * 
 * Why a separate use case for Google Sign-In?
 * 1. Single Responsibility: Google login has different flow than email/password
 * 2. Error Handling: Google-specific errors (cancelled, network, etc.)
 * 3. Future extensibility: Can add Google-specific features (profile sync, etc.)
 * 4. Testing: Easier to test Google flow separately
 * 
 * Clean Architecture:
 * - This use case depends on AuthRepository interface (not implementation)
 * - The UI layer will call this use case (not repository directly)
 * - Business logic stays in domain layer
 */

import { User } from '../entities/User';
import { AuthRepository } from '../repositories/AuthRepository';

/**
 * Custom error for Google Sign-In failures
 * 
 * Why a custom error class?
 * - Allows UI to distinguish Google errors from other errors
 * - Can add Google-specific error properties later
 * - Better debugging and logging
 */
export class GoogleSignInError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GoogleSignInError';
  }
}

/**
 * Google Sign-In Use Case
 * 
 * Handles the business logic for signing in with Google OAuth.
 * 
 * Process:
 * 1. Call repository's loginWithGoogle()
 * 2. Handle errors gracefully
 * 3. Return authenticated user
 * 
 * Error scenarios:
 * - User cancels Google login → Don't show error (user choice)
 * - Network issues → Show network error
 * - Google auth fails → Show authentication error
 * - Firebase issues → Show generic error
 */
export class GoogleSignInUseCase {
  private authRepository: AuthRepository;

  /**
   * Constructor with Dependency Injection
   * 
   * Why inject the repository?
   * - Testability: Can inject a mock repository for testing
   * - Flexibility: Can swap implementations without changing use case
   * - Clean Architecture: Domain doesn't know about Firebase
   */
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  /**
   * Execute Google Sign-In
   * 
   * This is the main method called by the UI layer.
   * 
   * Process:
   * 1. UI uses expo-auth-session to get Google ID token
   * 2. UI calls this method with the ID token
   * 3. We pass it to the repository to create Firebase session
   * 4. Return authenticated user
   * 
   * @param idToken - Google ID token obtained from expo-auth-session
   * @returns Promise<User> - The authenticated user
   * @throws GoogleSignInError - If sign-in fails
   * 
   * Example usage in UI:
   * ```typescript
   * // 1. Get Google ID token (using expo-auth-session hook)
   * const [request, response, promptAsync] = Google.useAuthRequest({...});
   * 
   * // 2. When user taps button
   * const handleGoogleSignIn = async () => {
   *   const result = await promptAsync();
   *   if (result.type === 'success') {
   *     const { id_token } = result.params;
   *     const user = await googleSignInUseCase.execute(id_token);
   *     Alert.alert('Welcome!', `Hello, ${user.name}!`);
   *   }
   * };
   * ```
   */
  async execute(idToken: string): Promise<User> {
    try {
      // Validate ID token exists
      if (!idToken || idToken.trim() === '') {
        throw new GoogleSignInError('Invalid Google authentication token');
      }

      // Call repository to handle actual Google authentication
      const user = await this.authRepository.loginWithGoogle(idToken);

      // Future enhancement: Could add business logic here
      // - Check if user needs to complete profile
      // - Send analytics event
      // - Log successful login
      // - Check for promotional offers

      return user;
    } catch (error) {
      // Handle different error scenarios
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();

        // User cancelled - this is not really an error
        if (errorMessage.includes('cancel') || errorMessage.includes('dismissed')) {
          throw new GoogleSignInError('User cancelled');
        }

        // Network errors
        if (errorMessage.includes('network') || errorMessage.includes('connection')) {
          throw new GoogleSignInError(
            'Network error. Please check your internet connection and try again.'
          );
        }

        // Google authentication failed
        if (errorMessage.includes('auth') || errorMessage.includes('credential')) {
          throw new GoogleSignInError(
            'Google authentication failed. Please try again.'
          );
        }

        // Generic error with the original message
        throw new GoogleSignInError(
          error.message || 'Failed to sign in with Google. Please try again.'
        );
      }

      // Unknown error type
      throw new GoogleSignInError('An unexpected error occurred. Please try again.');
    }
  }

  /**
   * Future method: Check if Google account can be linked
   * 
   * Use case: User signed up with email/password, now wants to add Google
   * 
   * @param email - User's email to check
   * @returns boolean - Whether linking is possible
   * 
   * Implementation would:
   * 1. Check if user exists with this email
   * 2. Check if Google provider already linked
   * 3. Return true if linking is safe
   */
  // async canLinkGoogleAccount(email: string): Promise<boolean> {
  //   // TODO: Implement in future sprint when we add account linking UI
  //   return false;
  // }
}
