import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../Navigations/AuthNavigator';
import OTPInput from '../../Components/OTPInput';
import CustomButton from '../../Components/CustomButton';
import styles from './Styles';

type TemporaryPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'TemporaryPassword'
>;

const TemporaryPasswordScreen = () => {
  const navigation = useNavigation<TemporaryPasswordNavigationProp>();
  const [otp, setOtp] = useState('');

  const handleSignIn = () => {
    navigation.navigate('NewPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECop</Text>
        <Text style={styles.subtitle}>Temporary Password</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.description}>Enter Password</Text>

        <OTPInput length={6} value={otp} onChangeText={setOtp} />

        <CustomButton title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
  );
};

export default TemporaryPasswordScreen;
