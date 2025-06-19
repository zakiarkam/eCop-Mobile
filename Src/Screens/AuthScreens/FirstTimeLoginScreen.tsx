import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../Navigations/AuthNavigator';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {firstTimeLoginApiService} from '../../Services/apiServices/authApi';
import styles from './Styles';

type FirstTimeLoginNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'FirstTimeLogin'
>;

const FirstTimeLoginScreen = () => {
  const navigation = useNavigation<FirstTimeLoginNavigationProp>();
  const [identificationNo, setIdentificationNo] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    // Validation
    if (!identificationNo.trim()) {
      Alert.alert('Error', 'Please enter your identification number');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!firstTimeLoginApiService.validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Additional validation for identification number
    const identificationError =
      firstTimeLoginApiService.validateIdentificationNo(identificationNo);
    if (identificationError) {
      Alert.alert('Error', identificationError);
      return;
    }

    try {
      setLoading(true);

      const response = await firstTimeLoginApiService.requestTemporaryPassword({
        identificationNo: identificationNo.trim(),
        email: email.trim().toLowerCase(),
      });

      if (response.success) {
        Alert.alert(
          'Success',
          `Temporary password sent to ${email}. Please check your email.`,
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('TemporaryPassword', {
                  identificationNo: identificationNo.trim(),
                  email: email.trim().toLowerCase(),
                  fullName: response.data?.fullName || '',
                  userType: response.data?.userType || 'unknown',
                });
              },
            },
          ],
        );
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'Failed to send temporary password',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECop</Text>
        <Text style={styles.subtitle}>First Time Login</Text>
      </View>

      <View style={styles.formContainer}>
        <CustomInput
          label="Licence No Or Police No"
          value={identificationNo}
          onChangeText={setIdentificationNo}
          placeholder="Enter licence or police number"
        />

        <CustomInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          keyboardType="email-address"
        />

        <CustomButton
          title={loading ? 'Sending...' : 'Next'}
          onPress={handleNext}
          disabled={loading}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007bff" />
            <Text style={styles.loadingText}>
              Sending temporary password...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FirstTimeLoginScreen;
