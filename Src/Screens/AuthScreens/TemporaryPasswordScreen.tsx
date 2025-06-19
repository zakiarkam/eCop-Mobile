import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../Navigations/AuthNavigator';
import OTPInput from '../../Components/OTPInput';
import CustomButton from '../../Components/CustomButton';
import {firstTimeLoginApiService} from '../../Services/apiServices/authApi';
import styles from './Styles';

type TemporaryPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'TemporaryPassword'
>;

type TemporaryPasswordRouteProp = RouteProp<
  AuthStackParamList,
  'TemporaryPassword'
>;

const TemporaryPasswordScreen = () => {
  const navigation = useNavigation<TemporaryPasswordNavigationProp>();
  const route = useRoute<TemporaryPasswordRouteProp>();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Get data from previous screen
  const {identificationNo, email, fullName, userType} = route.params;

  const handleSignIn = async () => {
    if (!otp || otp.length !== 6) {
      Alert.alert(
        'Error',
        'Please enter the complete 6-digit temporary password',
      );
      return;
    }

    try {
      setLoading(true);

      const response = await firstTimeLoginApiService.verifyTemporaryPassword({
        identificationNo,
        temporaryPassword: otp,
      });

      if (response.success) {
        Alert.alert(
          'Success',
          'Temporary password verified! Please set your new password.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('NewPassword', {
                  identificationNo,
                  fullName: response.data?.fullName || fullName,
                  userId: response.data?.userId || '',
                  userType: response.data?.userType || userType,
                });
              },
            },
          ],
        );
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid temporary password', [
        {
          text: 'Resend Password',
          onPress: () => {
            navigation.goBack();
          },
        },
        {
          text: 'Try Again',
          style: 'cancel',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleResendPassword = async () => {
    try {
      setLoading(true);

      const response = await firstTimeLoginApiService.requestTemporaryPassword({
        identificationNo,
        email,
      });

      if (response.success) {
        Alert.alert('Success', 'New temporary password sent to your email');
        setOtp(''); // Clear current OTP
      }
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'Failed to resend temporary password',
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeDisplay = () => {
    return firstTimeLoginApiService.getUserTypeDisplayName(
      userType || 'unknown',
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECop</Text>
        <Text style={styles.subtitle}>Temporary Password</Text>
        <Text style={styles.userTypeText}>
          {getUserTypeDisplay()} Verification
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.description}>
          Enter the 6-digit temporary password sent to {email}
        </Text>

        <OTPInput length={6} value={otp} onChangeText={setOtp} />

        <CustomButton
          title={loading ? 'Verifying...' : 'Sign In'}
          onPress={handleSignIn}
          disabled={loading}
        />

        <CustomButton
          title="Resend Password"
          onPress={handleResendPassword}
          disabled={loading}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007bff" />
            <Text style={styles.loadingText}>Please wait...</Text>
          </View>
        )}

        <Text style={styles.infoText}>Password expires in 15 minutes</Text>
      </View>
    </View>
  );
};

export default TemporaryPasswordScreen;
