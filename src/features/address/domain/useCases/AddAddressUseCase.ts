import { AddressRepository } from '../repositories/AddressRepository';
import { Address, AddressFormData } from '../entities/Address';

export class AddAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(userId: string, data: AddressFormData): Promise<Address> {
    // Validate data
    this.validateAddressData(data);

    return this.addressRepository.addAddress(userId, data);
  }

  private validateAddressData(data: AddressFormData): void {
    if (!data.label || data.label.trim().length === 0) {
      throw new Error('Address label is required');
    }

    if (!data.street || data.street.trim().length === 0) {
      throw new Error('Street address is required');
    }

    if (!data.city || data.city.trim().length === 0) {
      throw new Error('City is required');
    }

    if (!data.state || data.state.trim().length !== 2) {
      throw new Error('Valid 2-letter state code is required');
    }

    if (!data.zipCode || !/^\d{5}$/.test(data.zipCode)) {
      throw new Error('Valid 5-digit ZIP code is required');
    }
  }
}
