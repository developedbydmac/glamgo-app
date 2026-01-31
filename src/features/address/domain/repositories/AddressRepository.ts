import { Address, AddressFormData } from '../entities/Address';

/**
 * Address Repository Interface
 * Defines all address data operations
 */
export interface AddressRepository {
  /**
   * Get all addresses for a user
   */
  getAddresses(userId: string): Promise<Address[]>;

  /**
   * Get a specific address by ID
   */
  getAddress(userId: string, addressId: string): Promise<Address | null>;

  /**
   * Get the default address for a user
   */
  getDefaultAddress(userId: string): Promise<Address | null>;

  /**
   * Add a new address
   */
  addAddress(userId: string, data: AddressFormData): Promise<Address>;

  /**
   * Update an existing address
   */
  updateAddress(
    userId: string,
    addressId: string,
    data: Partial<AddressFormData>
  ): Promise<Address>;

  /**
   * Delete an address
   */
  deleteAddress(userId: string, addressId: string): Promise<void>;

  /**
   * Set an address as default (unsets previous default)
   */
  setDefaultAddress(userId: string, addressId: string): Promise<void>;
}
