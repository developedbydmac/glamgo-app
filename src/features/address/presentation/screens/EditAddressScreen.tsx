import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAddress } from '../../../../contexts/AddressContext';

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

export const EditAddressScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addresses, updateAddress, loading: contextLoading } = useAddress();

  const addressId = (route.params as any)?.addressId;
  const address = addresses.find((a) => a.id === addressId);

  const [formData, setFormData] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (address) {
      setFormData({
        label: address.label,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
      });
      setIsLoading(false);
    } else if (!contextLoading) {
      Alert.alert('Error', 'Address not found', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  }, [address, contextLoading, navigation]);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'label':
        return value.trim() === '' ? 'Label is required' : '';
      case 'street':
        return value.trim() === '' ? 'Street address is required' : '';
      case 'city':
        return value.trim() === '' ? 'City is required' : '';
      case 'state':
        if (value.trim() === '') return 'State is required';
        if (!US_STATES.includes(value.toUpperCase())) {
          return 'Invalid state code (e.g., CA, NY)';
        }
        return '';
      case 'zipCode':
        if (value.trim() === '') return 'ZIP code is required';
        if (!/^\d{5}$/.test(value)) {
          return 'ZIP code must be 5 digits';
        }
        return '';
      default:
        return '';
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      label: true,
      street: true,
      city: true,
      state: true,
      zipCode: true,
    });

    return isValid;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      Alert.alert('Invalid Form', 'Please fix the errors before saving.');
      return;
    }

    if (!addressId) {
      Alert.alert('Error', 'Address ID is missing');
      return;
    }

    try {
      await updateAddress(addressId, formData);
      Alert.alert('Success', 'Address updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update address');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading address...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          {/* Label */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Label *</Text>
            <TextInput
              style={[styles.input, errors.label && touched.label && styles.inputError]}
              placeholder="e.g., Home, Work, Mom's House"
              value={formData.label}
              onChangeText={(value) => handleChange('label', value)}
              onBlur={() => handleBlur('label')}
              editable={!contextLoading}
            />
            {errors.label && touched.label && (
              <Text style={styles.errorText}>{errors.label}</Text>
            )}
          </View>

          {/* Street */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Street Address *</Text>
            <TextInput
              style={[styles.input, errors.street && touched.street && styles.inputError]}
              placeholder="123 Main St, Apt 4B"
              value={formData.street}
              onChangeText={(value) => handleChange('street', value)}
              onBlur={() => handleBlur('street')}
              editable={!contextLoading}
            />
            {errors.street && touched.street && (
              <Text style={styles.errorText}>{errors.street}</Text>
            )}
          </View>

          {/* City */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>City *</Text>
            <TextInput
              style={[styles.input, errors.city && touched.city && styles.inputError]}
              placeholder="San Francisco"
              value={formData.city}
              onChangeText={(value) => handleChange('city', value)}
              onBlur={() => handleBlur('city')}
              editable={!contextLoading}
            />
            {errors.city && touched.city && (
              <Text style={styles.errorText}>{errors.city}</Text>
            )}
          </View>

          {/* State & ZIP Row */}
          <View style={styles.row}>
            <View style={[styles.fieldContainer, styles.stateField]}>
              <Text style={styles.label}>State *</Text>
              <TextInput
                style={[styles.input, errors.state && touched.state && styles.inputError]}
                placeholder="CA"
                value={formData.state}
                onChangeText={(value) => handleChange('state', value.toUpperCase())}
                onBlur={() => handleBlur('state')}
                maxLength={2}
                autoCapitalize="characters"
                editable={!contextLoading}
              />
              {errors.state && touched.state && (
                <Text style={styles.errorText}>{errors.state}</Text>
              )}
            </View>

            <View style={[styles.fieldContainer, styles.zipField]}>
              <Text style={styles.label}>ZIP Code *</Text>
              <TextInput
                style={[styles.input, errors.zipCode && touched.zipCode && styles.inputError]}
                placeholder="94102"
                value={formData.zipCode}
                onChangeText={(value) => handleChange('zipCode', value)}
                onBlur={() => handleBlur('zipCode')}
                keyboardType="numeric"
                maxLength={5}
                editable={!contextLoading}
              />
              {errors.zipCode && touched.zipCode && (
                <Text style={styles.errorText}>{errors.zipCode}</Text>
              )}
            </View>
          </View>

          <Text style={styles.hint}>* Required fields</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.updateButton, contextLoading && styles.updateButtonDisabled]}
          onPress={handleUpdate}
          disabled={contextLoading}
        >
          {contextLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.updateButtonText}>Update Address</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  stateField: {
    flex: 1,
  },
  zipField: {
    flex: 1,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  updateButtonDisabled: {
    backgroundColor: '#999',
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
