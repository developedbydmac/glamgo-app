import { AddressRepository } from '../repositories/AddressRepository';
import { Address } from '../entities/Address';

export class GetAddressesUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(userId: string): Promise<Address[]> {
    return this.addressRepository.getAddresses(userId);
  }
}
