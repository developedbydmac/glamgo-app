import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Address, AddressFormData } from '../features/address/domain/entities/Address';
import { FirebaseAddressRepository } from '../features/address/data/repositories/FirebaseAddressRepository';
import { GetAddressesUseCase } from '../features/address/domain/useCases/GetAddressesUseCase';
import { AddAddressUseCase } from '../features/address/domain/useCases/AddAddressUseCase';
import { UpdateAddressUseCase } from '../features/address/domain/useCases/UpdateAddressUseCase';
import { DeleteAddressUseCase } from '../features/address/domain/useCases/DeleteAddressUseCase';
import { SetDefaultAddressUseCase } from '../features/address/domain/useCases/SetDefaultAddressUseCase';
import { useAuth } from './AuthContext';

// Repository and Use Cases
const addressRepository = new FirebaseAddressRepository();
const getAddressesUseCase = new GetAddressesUseCase(addressRepository);
const addAddressUseCase = new AddAddressUseCase(addressRepository);
const updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
const setDefaultAddressUseCase = new SetDefaultAddressUseCase(addressRepository);

interface AddressContextType {
  addresses: Address[];
  defaultAddress: Address | null;
  loading: boolean;
  error: string | null;
  loadAddresses: () => Promise<void>;
  addAddress: (data: AddressFormData) => Promise<void>;
  updateAddress: (addressId: string, data: Partial<AddressFormData>) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  setDefault: (addressId: string) => Promise<void>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load addresses when user logs in
  useEffect(() => {
    if (user) {
      loadAddresses();
    } else {
      // Clear addresses when user logs out
      setAddresses([]);
      setDefaultAddress(null);
    }
  }, [user]);

  const loadAddresses = async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userAddresses = await getAddressesUseCase.execute(user.uid);
      setAddresses(userAddresses);
      
      // Set default address
      const defaultAddr = userAddresses.find((addr) => addr.isDefault) || null;
      setDefaultAddress(defaultAddr);
    } catch (err) {
      console.error('Error loading addresses:', err);
      setError(err instanceof Error ? err.message : 'Failed to load addresses');
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (data: AddressFormData) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      await addAddressUseCase.execute(user.uid, data);
      await loadAddresses(); // Reload to get updated list
    } catch (err) {
      console.error('Error adding address:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add address';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateAddress = async (addressId: string, data: Partial<AddressFormData>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      await updateAddressUseCase.execute(user.uid, addressId, data);
      await loadAddresses(); // Reload to get updated list
    } catch (err) {
      console.error('Error updating address:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update address';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      await deleteAddressUseCase.execute(user.uid, addressId);
      await loadAddresses(); // Reload to get updated list
    } catch (err) {
      console.error('Error deleting address:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete address';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const setDefault = async (addressId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      await setDefaultAddressUseCase.execute(user.uid, addressId);
      await loadAddresses(); // Reload to get updated default
    } catch (err) {
      console.error('Error setting default address:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to set default address';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        defaultAddress,
        loading,
        error,
        loadAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefault,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = (): AddressContextType => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};
