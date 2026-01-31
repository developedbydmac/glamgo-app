import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../../../../shared/config/firebase';
import { AddressRepository } from '../../domain/repositories/AddressRepository';
import { Address, AddressFormData } from '../../domain/entities/Address';

export class FirebaseAddressRepository implements AddressRepository {
  private getAddressesCollection(userId: string) {
    return collection(db, 'users', userId, 'addresses');
  }

  async getAddresses(userId: string): Promise<Address[]> {
    try {
      const addressesRef = this.getAddressesCollection(userId);
      const q = query(addressesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId,
          label: data.label,
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          isDefault: data.isDefault || false,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Address;
      });
    } catch (error) {
      console.error('Error getting addresses:', error);
      throw new Error('Failed to load addresses');
    }
  }

  async getAddress(userId: string, addressId: string): Promise<Address | null> {
    try {
      const addressRef = doc(this.getAddressesCollection(userId), addressId);
      const snapshot = await getDoc(addressRef);

      if (!snapshot.exists()) {
        return null;
      }

      const data = snapshot.data();
      return {
        id: snapshot.id,
        userId,
        label: data.label,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        isDefault: data.isDefault || false,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Address;
    } catch (error) {
      console.error('Error getting address:', error);
      throw new Error('Failed to load address');
    }
  }

  async getDefaultAddress(userId: string): Promise<Address | null> {
    try {
      const addressesRef = this.getAddressesCollection(userId);
      const q = query(addressesRef, where('isDefault', '==', true));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        userId,
        label: data.label,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        isDefault: true,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Address;
    } catch (error) {
      console.error('Error getting default address:', error);
      throw new Error('Failed to load default address');
    }
  }

  async addAddress(userId: string, data: AddressFormData): Promise<Address> {
    try {
      const addressesRef = this.getAddressesCollection(userId);
      
      // Check if this is the first address (make it default)
      const existingAddresses = await this.getAddresses(userId);
      const isFirstAddress = existingAddresses.length === 0;

      const now = Timestamp.now();
      const addressData = {
        label: data.label,
        street: data.street,
        city: data.city,
        state: data.state.toUpperCase(),
        zipCode: data.zipCode,
        isDefault: isFirstAddress, // First address is automatically default
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await addDoc(addressesRef, addressData);

      return {
        id: docRef.id,
        userId,
        ...addressData,
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
      } as Address;
    } catch (error) {
      console.error('Error adding address:', error);
      throw new Error('Failed to add address');
    }
  }

  async updateAddress(
    userId: string,
    addressId: string,
    data: Partial<AddressFormData>
  ): Promise<Address> {
    try {
      const addressRef = doc(this.getAddressesCollection(userId), addressId);
      
      const updateData: any = {
        ...data,
        updatedAt: Timestamp.now(),
      };

      // Convert state to uppercase if provided
      if (data.state) {
        updateData.state = data.state.toUpperCase();
      }

      await updateDoc(addressRef, updateData);

      // Fetch and return updated address
      const updatedAddress = await this.getAddress(userId, addressId);
      if (!updatedAddress) {
        throw new Error('Address not found after update');
      }

      return updatedAddress;
    } catch (error) {
      console.error('Error updating address:', error);
      throw new Error('Failed to update address');
    }
  }

  async deleteAddress(userId: string, addressId: string): Promise<void> {
    try {
      const addressRef = doc(this.getAddressesCollection(userId), addressId);
      
      // Check if this is the default address
      const address = await this.getAddress(userId, addressId);
      const wasDefault = address?.isDefault || false;

      await deleteDoc(addressRef);

      // If we deleted the default address, make another address default
      if (wasDefault) {
        const remainingAddresses = await this.getAddresses(userId);
        if (remainingAddresses.length > 0) {
          await this.setDefaultAddress(userId, remainingAddresses[0].id);
        }
      }
    } catch (error) {
      console.error('Error deleting address:', error);
      throw new Error('Failed to delete address');
    }
  }

  async setDefaultAddress(userId: string, addressId: string): Promise<void> {
    try {
      const batch = writeBatch(db);

      // Get all addresses
      const addresses = await this.getAddresses(userId);

      // Unset all current defaults
      addresses.forEach((address) => {
        const addressRef = doc(this.getAddressesCollection(userId), address.id);
        batch.update(addressRef, { isDefault: false });
      });

      // Set the new default
      const newDefaultRef = doc(this.getAddressesCollection(userId), addressId);
      batch.update(newDefaultRef, {
        isDefault: true,
        updatedAt: Timestamp.now(),
      });

      await batch.commit();
    } catch (error) {
      console.error('Error setting default address:', error);
      throw new Error('Failed to set default address');
    }
  }
}
