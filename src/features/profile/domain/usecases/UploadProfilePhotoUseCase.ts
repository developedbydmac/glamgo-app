/**
 * Upload Profile Photo Use Case
 * 
 * Business logic for uploading user profile photos to Firebase Storage.
 * 
 * Clean Architecture Principle:
 * Use cases orchestrate complex operations involving multiple repository methods.
 */

import { AuthRepository } from '../../../auth/domain/repositories/AuthRepository';

export class UploadProfilePhotoUseCase {
  constructor(private authRepository: AuthRepository) {}

  /**
   * Execute the upload profile photo use case
   * 
   * Process:
   * 1. Validate the image URI
   * 2. Upload to Firebase Storage
   * 3. Return the photo URL
   * 
   * @param userId - The user's UID
   * @param imageUri - Local file URI from image picker
   * @returns The uploaded photo URL
   */
  async execute(userId: string, imageUri: string): Promise<string> {
    // Validate image URI
    if (!imageUri || imageUri.trim().length === 0) {
      throw new Error('Image URI is required');
    }

    try {
      // Upload photo to Firebase Storage
      const photoUrl = await this.authRepository.uploadProfilePhoto(userId, imageUri);
      
      return photoUrl;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to upload photo: ${error.message}`);
      }
      throw error;
    }
  }
}
