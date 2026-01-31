/**
 * Address Entity
 * Represents a delivery address for a customer
 */

export interface Address {
  id: string;
  userId: string;
  label: string; // e.g., "Home", "Work", "Mom's House"
  street: string; // Street address line 1
  city: string;
  state: string; // Two-letter state code (e.g., "CA", "NY")
  zipCode: string; // 5-digit ZIP code
  isDefault: boolean; // Only one address can be default per user
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Form data for creating/editing an address
 */
export interface AddressFormData {
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
