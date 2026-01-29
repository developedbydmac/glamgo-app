/**
 * Update Profile Use Case
 * 
 * Business logic for updating user profile information.
 * 
 * Clean Architecture Principle:
 * Use cases contain application-specific business logic.
 * They orchestrate the flow of data between entities and repositories.
 */

import { AuthRepository } from '../../../auth/domain/repositories/AuthRepository';
import { User, UpdateUserData } from '../../../auth/domain/entities/User';

export class UpdateProfileUseCase {
  constructor(private authRepository: AuthRepository) {}

  /**
   * Execute the update profile use case
   * 
   * Validation rules:
   * - Name must not be empty
   * - Phone must be valid format (if provided)
   * 
   * @param userId - The user's UID
   * @param data - Profile data to update (name, phone, photoUrl)
   * @returns Updated user object
   */
  async execute(userId: string, data: UpdateUserData): Promise<User> {
    // Validate name
    if (data.name !== undefined && data.name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }

    // Validate phone (basic validation)
    if (data.phone !== undefined && data.phone.trim().length > 0) {
      const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
      if (!phoneRegex.test(data.phone)) {
        throw new Error('Please enter a valid phone number');
      }
    }

    // Update profile via repository
    try {
      const updatedUser = await this.authRepository.updateProfile(userId, data);
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update profile: ${error.message}`);
      }
      throw error;
    }
  }
}
