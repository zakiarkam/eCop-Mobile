import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {userStorageService} from '../../Services/UserStorageService';
import licenceService from '../../Services/apiServices/licenceService';
import {rulesApiService} from '../../Services/apiServices/rulesApi';
import violationService from '../../Services/apiServices/violationService';
import {Colors} from '../../Styles/colors';
import {styles} from './Styles';

type RuleType = {
  _id: string;
  section: string;
  provision: string;
  fine: number;
  points: number;
};

type ViolationFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
  userType: 'licence' | 'police';
};

const ViolationForm: React.FC<ViolationFormProps> = ({
  onSuccess,
  onCancel,
  userType,
}) => {
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState<RuleType[]>([]);
  const [selectedRule, setSelectedRule] = useState('');
  const [policeOfficerId, setPoliceOfficerId] = useState('');
  const [policeNumber, setPoliceNumber] = useState('');
  const [showRulePicker, setShowRulePicker] = useState(false);

  const [formData, setFormData] = useState({
    licenceNumber: '',
    phoneNumber: '',
    vehicleNumber: '',
    placeOfViolation: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Only load police data if user is a police officer
    if (userType === 'police') {
      loadPoliceData();
    }
    loadRules();
  }, [userType]);

  const loadPoliceData = async () => {
    try {
      const officerId = await userStorageService.getUserId();
      const officerNumber = await userStorageService.getPoliceNumber();

      if (officerId && officerNumber) {
        setPoliceOfficerId(officerId);
        setPoliceNumber(officerNumber);
      } else {
        Alert.alert(
          'Error',
          'Police officer data not found. Please login again.',
        );
        onCancel?.();
      }
    } catch (error) {
      console.error('Error loading police data:', error);
      Alert.alert('Error', 'Failed to load police officer data');
    }
  };

  const loadRules = async () => {
    try {
      setLoading(true);
      const response = await rulesApiService.getAllRules();
      if (response.rules) {
        setRules(
          response.rules.map(rule => ({
            ...rule,
            fine: Number(rule.fine),
          })),
        );
      }
    } catch (error) {
      console.error('Error loading rules:', error);
      Alert.alert('Error', 'Failed to load traffic rules');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate licence number
    if (!formData.licenceNumber.trim()) {
      newErrors.licenceNumber = 'Licence number is required';
    }

    // Validate phone number
    const phonePattern = /^(?:\+94|0)?[0-9]{9}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phonePattern.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    // Validate vehicle number
    const vehiclePattern = /^[A-Z]{2,3}-\d{4}$/i;
    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Vehicle number is required';
    } else if (!vehiclePattern.test(formData.vehicleNumber)) {
      newErrors.vehicleNumber =
        'Invalid vehicle number format (e.g., ABC-1234)';
    }

    // Validate place of violation
    if (!formData.placeOfViolation.trim()) {
      newErrors.placeOfViolation = 'Place of violation is required';
    }

    // Validate rule selection
    if (!selectedRule) {
      newErrors.selectedRule = 'Please select a traffic rule';
    }

    // Only validate police data if user is police
    if (userType === 'police' && !policeNumber) {
      newErrors.policeData = 'Police officer data not found';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const verifyLicenceHolder = async () => {
    if (!formData.licenceNumber.trim()) {
      Alert.alert('Error', 'Please enter licence number first');
      return;
    }

    try {
      setLoading(true);
      const response = await licenceService.getLicenceHolderByLicenceNumber(
        formData.licenceNumber,
      );

      if (response.success && response.data) {
        Alert.alert(
          'Licence Holder Found',
          `Name: ${response.data.fullName}\nPhone: ${response.data.phoneNumber}\nPoints: ${response.data.licencePoints}`,
          [{text: 'OK'}],
        );

        // Auto-fill phone number if found
        setFormData(prev => ({
          ...prev,
          phoneNumber: response.data?.phoneNumber ?? '',
        }));
      } else {
        Alert.alert('Not Found', 'Licence holder not found with this number');
      }
    } catch (error) {
      console.error('Error verifying licence:', error);
      Alert.alert('Error', 'Failed to verify licence holder');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors and try again');
      return;
    }

    try {
      setLoading(true);

      const violationData = {
        licenceNumber: formData.licenceNumber.trim(),
        policeNumber: policeNumber,
        phoneNumber: formData.phoneNumber.trim(),
        vehicleNumber: formData.vehicleNumber.toUpperCase().trim(),
        placeOfViolation: formData.placeOfViolation.trim(),
        ruleId: selectedRule,
        notes: formData.notes.trim(),
      };

      const response = await violationService.createViolation(violationData);

      if (response.success) {
        Alert.alert('Success', 'Violation recorded successfully!', [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormData({
                licenceNumber: '',
                phoneNumber: '',
                vehicleNumber: '',
                placeOfViolation: '',
                notes: '',
              });
              setSelectedRule('');
              setErrors({});
              onSuccess?.();
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error submitting violation:', error);
      if (error instanceof Error) {
        Alert.alert('Error', error.message || 'Failed to record violation');
      } else {
        Alert.alert('Error', 'Failed to record violation');
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedRuleDetails = rules.find(rule => rule._id === selectedRule);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {/* Licence Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Licence Number</Text>
          <View style={styles.inputWithButton}>
            <TextInput
              style={[
                styles.input,
                styles.inputFlex,
                errors.licenceNumber && styles.inputError,
              ]}
              value={formData.licenceNumber}
              onChangeText={text =>
                setFormData(prev => ({...prev, licenceNumber: text}))
              }
              placeholder="Enter licence number"
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={verifyLicenceHolder}
              disabled={loading}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
          {errors.licenceNumber && (
            <Text style={styles.errorText}>{errors.licenceNumber}</Text>
          )}
        </View>

        {/* Phone Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors.phoneNumber && styles.inputError]}
            value={formData.phoneNumber}
            onChangeText={text =>
              setFormData(prev => ({...prev, phoneNumber: text}))
            }
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
        </View>

        {/* Vehicle Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Vehicle Number</Text>
          <TextInput
            style={[styles.input, errors.vehicleNumber && styles.inputError]}
            value={formData.vehicleNumber}
            onChangeText={text =>
              setFormData(prev => ({...prev, vehicleNumber: text}))
            }
            placeholder="e.g., ABC-1234"
            autoCapitalize="characters"
          />
          {errors.vehicleNumber && (
            <Text style={styles.errorText}>{errors.vehicleNumber}</Text>
          )}
        </View>

        {/* Place of Violation */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Place Of Violation Happen</Text>
          <TextInput
            style={[styles.input, errors.placeOfViolation && styles.inputError]}
            value={formData.placeOfViolation}
            onChangeText={text =>
              setFormData(prev => ({...prev, placeOfViolation: text}))
            }
            placeholder="Enter location"
          />
          {errors.placeOfViolation && (
            <Text style={styles.errorText}>{errors.placeOfViolation}</Text>
          )}
        </View>

        {/* Nature of Offense */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nature Of Offense</Text>
          <TouchableOpacity
            style={[styles.dropdown, errors.selectedRule && styles.inputError]}
            onPress={() => setShowRulePicker(true)}>
            <Text
              style={
                selectedRule
                  ? styles.dropdownTextSelected
                  : styles.dropdownTextPlaceholder
              }>
              {selectedRuleDetails
                ? selectedRuleDetails.section
                : 'Select offense'}
            </Text>
            <Text style={styles.dropdownArrow}>
              {' '}
              <Feather name="chevron-down" size={24} color={Colors.gray} />
            </Text>
          </TouchableOpacity>
          {errors.selectedRule && (
            <Text style={styles.errorText}>{errors.selectedRule}</Text>
          )}

          {/* Show rule details */}
          {selectedRuleDetails && (
            <View style={styles.ruleDetails}>
              <Text style={styles.ruleDetailText}>
                <Text style={styles.ruleDetailLabel}>Provision: </Text>
                {selectedRuleDetails.provision}
              </Text>
              <Text style={styles.ruleDetailText}>
                <Text style={styles.ruleDetailLabel}>Fine: </Text>
                Rs. {selectedRuleDetails.fine}
              </Text>
              <Text style={styles.ruleDetailText}>
                <Text style={styles.ruleDetailLabel}>Points: </Text>
                {selectedRuleDetails.points}
              </Text>
            </View>
          )}
        </View>

        {/* Notes */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes}
            onChangeText={text => setFormData(prev => ({...prev, notes: text}))}
            placeholder="Additional notes..."
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Record Violation</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Rule Selection Modal */}
      <Modal
        visible={showRulePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRulePicker(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Traffic Rule</Text>
              <TouchableOpacity onPress={() => setShowRulePicker(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.rulesContainer}>
              {rules.map(rule => (
                <TouchableOpacity
                  key={rule._id}
                  style={[
                    styles.ruleItem,
                    selectedRule === rule._id && styles.ruleItemSelected,
                  ]}
                  onPress={() => {
                    setSelectedRule(rule._id);
                    setShowRulePicker(false);
                    setErrors(prev => {
                      const {selectedRule, ...rest} = prev;
                      return rest;
                    });
                  }}>
                  <Text style={styles.ruleSection}>Act - {rule.section}</Text>
                  <Text style={styles.ruleProvision}>{rule.provision}</Text>
                  <View style={styles.ruleMeta}>
                    <Text style={styles.ruleFine}>Fine: Rs. {rule.fine}</Text>
                    <Text style={styles.rulePoints}>Points: {rule.points}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViolationForm;
