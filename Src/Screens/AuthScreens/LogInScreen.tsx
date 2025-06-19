import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../Navigations/AuthNavigator';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {firstTimeLoginApiService} from '../../Services/apiServices/authApi';
import styles from './Styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface StoredUserData {
  userId: string;
  userType: string;
  fullName: string;
  identificationNo: string;
  email: string;
  role: string;
  status: string;
  idNumber: string;
  licenceNumber?: string;
  policeNumber?: string;
  rank?: string;
  policeStation?: string;
  badgeNo?: string;
  issueDate?: string;
  expiryDate?: string;
  vehicleCategories?: Array<{
    category: string;
    issueDate: string;
    expiryDate: string;
  }>;
}

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [identificationNo, setIdentificationNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const storeUserData = async (userData: StoredUserData) => {
    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
      await AsyncStorage.setItem('is_logged_in', 'true');
      console.log('User data stored successfully in AsyncStorage');
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('user_data');
      await AsyncStorage.removeItem('is_logged_in');
      console.log('User data cleared from AsyncStorage');
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  const handleLogin = async () => {
    // Validation
    if (!identificationNo.trim()) {
      Alert.alert('Error', 'Please enter your identification number');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    const identificationError =
      firstTimeLoginApiService.validateIdentificationNo(identificationNo);
    if (identificationError) {
      Alert.alert('Error', identificationError);
      return;
    }

    try {
      setLoading(true);

      const response = await firstTimeLoginApiService.login({
        identificationNo: identificationNo.trim(),
        password: password,
      });

      if (response.success && response.data) {
        console.log('Login successful:', response.data);

        const userDataToStore: StoredUserData = {
          userId: response.data.userId,
          userType: response.data.user.userType,
          fullName: response.data.user.fullName,
          idNumber: response.data.user.idNumber,
          identificationNo: response.data.user.identificationNo ?? '',
          email: response.data.user.email,
          role: response.data.user.role,
          status: response.data.user.status,
        };

        if (response.data.user.userType === 'licence') {
          userDataToStore.licenceNumber = response.data.user.licenceNumber;
          userDataToStore.expiryDate = response.data.user.expiryDate;
          userDataToStore.issueDate = response.data.user.issueDate;
          userDataToStore.vehicleCategories =
            response.data.user.vehicleCategories;
        } else if (response.data.user.userType === 'police') {
          userDataToStore.policeNumber = response.data.user.policeNumber;
          userDataToStore.rank = response.data.user.rank;
          userDataToStore.policeStation = response.data.user.policeStation;
          userDataToStore.badgeNo = response.data.user.badgeNo;
        }

        await storeUserData(userDataToStore);

        const userTypeDisplay = firstTimeLoginApiService.getUserTypeDisplayName(
          response.data.user.userType,
        );

        Alert.alert(
          'Welcome Back!',
          `Hello ${response.data.user.fullName}, you're logged in as ${userTypeDisplay}.`,
          [
            {
              text: 'Continue',
              onPress: () => {
                navigation.getParent()?.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Main',
                      params: {user: response.data},
                    },
                  ],
                });
              },
            },
          ],
        );
      }
    } catch (error: any) {
      let errorMessage = error.message || 'Login failed';

      // Handle specific error cases
      if (
        errorMessage.includes('Invalid credentials') ||
        errorMessage.includes('Invalid identification number') ||
        errorMessage.includes('Invalid password')
      ) {
        errorMessage = 'Invalid identification number or password';
      } else if (
        errorMessage.includes('Account not activated') ||
        errorMessage.includes('first-time login')
      ) {
        errorMessage =
          'Your account is not activated. Please complete first-time login setup.';

        Alert.alert('Account Setup Required', errorMessage, [
          {
            text: 'Setup Now',
            onPress: () => navigation.navigate('FirstTimeLogin'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
        return;
      } else if (
        errorMessage.includes('Account suspended') ||
        errorMessage.includes('suspended')
      ) {
        errorMessage =
          'Your account has been suspended. Please contact support.';
      } else if (
        errorMessage.includes('Account inactive') ||
        errorMessage.includes('inactive')
      ) {
        errorMessage =
          'Your account is inactive. Please contact administrator.';
      }

      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Please contact your administrator to reset your password.',
      [
        {
          text: 'Contact Support',
          onPress: () => {
            Alert.alert(
              'Contact Information',
              'Email: support@ecop.lk\nPhone: +94 11 234 5678',
            );
          },
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
    );
  };

  const handleFirstTimeSignUp = () => {
    navigation.navigate('FirstTimeLogin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECop</Text>
        <Text style={styles.subtitle}>Login to eCop</Text>
      </View>

      <View style={styles.formContainer}>
        <CustomInput
          label="Licence No Or Police No"
          value={identificationNo}
          onChangeText={setIdentificationNo}
          placeholder="Enter licence or police number"
        />

        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />

        <CustomButton
          title={loading ? 'Logging in...' : 'Log In'}
          onPress={handleLogin}
          disabled={loading}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007bff" />
            <Text style={styles.loadingText}>Authenticating...</Text>
          </View>
        )}

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpContainer}
          onPress={handleFirstTimeSignUp}>
          <Text style={styles.signUpText}>
            First Time Login? <Text style={styles.signUpSmall}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
