import { AddressRepository } from '../repositories/AddressRepository';
import { Address, AddressFormData } from '../entities/Address';

export class UpdateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(
    userId: string,
    addressId: string,
    data: Partial<AddressFormData>
  ): Promise<Address> {
    // Validate data if provided
    if (data.zipCode && !/^\d{5}$/.test(data.zipCode)) {
      throw new Error('Valid 5-digit ZIP code is required');
    }

    if (data.state && data.state.trim().length !== 2) {
      throw new Error('Valid 2-letter state code is required');
    }

    return this.addressRepository.updateAddress(userId, addressId, data);
  }
}
