import { AddressRepository } from '../repositories/AddressRepository';

export class SetDefaultAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(userId: string, addressId: string): Promise<void> {
    return this.addressRepository.setDefaultAddress(userId, addressId);
  }
}
