import React, {useState} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../Navigations/AuthNavigator';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import {firstTimeLoginApiService} from '../../Services/apiServices/authApi';
import styles from './Styles';

type NewPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'NewPassword'
>;

type NewPasswordRouteProp = RouteProp<AuthStackParamList, 'NewPassword'>;

const NewPasswordScreen = () => {
  const navigation = useNavigation<NewPasswordNavigationProp>();
  const route = useRoute<NewPasswordRouteProp>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Get data from previous screen
  const {identificationNo, fullName, userId, userType} = route.params;

  const handleChangePassword = async () => {
    // Validation
    if (!newPassword.trim()) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }

    if (!confirmPassword.trim()) {
      Alert.alert('Error', 'Please confirm your password');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Password strength validation
    const passwordError =
      firstTimeLoginApiService.validatePassword(newPassword);
    if (passwordError) {
      Alert.alert('Error', passwordError);
      return;
    }

    try {
      setLoading(true);

      const response = await firstTimeLoginApiService.setNewPassword({
        identificationNo,
        newPassword,
        confirmPassword,
      });

      if (response.success) {
        Alert.alert(
          'Success',
          'Password changed successfully! You can now log in with your new password.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('PasswordChanged', {
                  fullName,
                  identificationNo,
                  userType,
                });
              },
            },
          ],
        );
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to change password');
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
        <Text style={styles.subtitle}>New Password</Text>
        <Text style={styles.userTypeText}>
          {getUserTypeDisplay()} Account Setup
        </Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>Welcome, {fullName}!</Text>
        <Text style={styles.description}>
          Please create a strong password for your account
        </Text>

        <CustomInput
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="••••••••"
          secureTextEntry
        />

        <CustomInput
          label="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
          secureTextEntry
        />

        <View style={styles.passwordRequirements}>
          <Text style={styles.requirementsTitle}>Password Requirements:</Text>
          <Text style={styles.requirementText}>
            • At least 8 characters long
          </Text>
          <Text style={styles.requirementText}>
            • At least one uppercase letter
          </Text>
          <Text style={styles.requirementText}>
            • At least one lowercase letter
          </Text>
          <Text style={styles.requirementText}>• At least one number</Text>
        </View>

        <CustomButton
          title={loading ? 'Changing Password...' : 'Change Password'}
          onPress={handleChangePassword}
          disabled={loading}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007bff" />
            <Text style={styles.loadingText}>Setting up your account...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default NewPasswordScreen;
