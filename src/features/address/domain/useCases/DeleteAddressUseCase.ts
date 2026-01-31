import { AddressRepository } from '../repositories/AddressRepository';

export class DeleteAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(userId: string, addressId: string): Promise<void> {
    return this.addressRepository.deleteAddress(userId, addressId);
  }
}
