import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../Navigations/AuthNavigator';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import styles from './Styles';

type NewPasswordNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'NewPassword'
>;

const NewPasswordScreen = () => {
  const navigation = useNavigation<NewPasswordNavigationProp>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    navigation.navigate('PasswordChanged');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECop</Text>
        <Text style={styles.subtitle}>New Password</Text>
      </View>

      <View style={styles.formContainer}>
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

        <CustomButton title="Change Password" onPress={handleChangePassword} />
      </View>
    </View>
  );
};

export default NewPasswordScreen;
