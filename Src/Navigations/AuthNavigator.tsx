import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../Screens/AuthScreens/LogInScreen';
import FirstTimeLoginScreen from '../Screens/AuthScreens/FirstTimeLoginScreen';
import TemporaryPasswordScreen from '../Screens/AuthScreens/TemporaryPasswordScreen';
import NewPasswordScreen from '../Screens/AuthScreens/NewPasswordScreen';
import PasswordChangedScreen from '../Screens/AuthScreens/PasswordChangedScreen';

export type AuthStackParamList = {
  Login: undefined;
  FirstTimeLogin: undefined;
  TemporaryPassword: {
    identificationNo: string;
    email: string;
    fullName: string;
    userType: string;
  };
  NewPassword: {
    identificationNo: string;
    fullName: string;
    userId: string;
    userType: string;
  };
  PasswordChanged: {
    fullName: string;
    identificationNo: string;
    userType: string;
  };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="FirstTimeLogin" component={FirstTimeLoginScreen} />
      <Stack.Screen
        name="TemporaryPassword"
        component={TemporaryPasswordScreen}
      />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
