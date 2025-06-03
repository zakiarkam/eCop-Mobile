import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../Navigations/AuthNavigator';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import styles from './Styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [licenceNo, setLicenceNo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login pressed');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
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
          value={licenceNo}
          onChangeText={setLicenceNo}
          placeholder="Enter licence or police number"
        />

        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />

        <CustomButton title="Log In" onPress={handleLogin} />

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
