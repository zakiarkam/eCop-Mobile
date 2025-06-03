import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../Navigations/AuthNavigator';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components//CustomButton';
import styles from './Styles';

type FirstTimeLoginNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'FirstTimeLogin'
>;

const FirstTimeLoginScreen = () => {
  const navigation = useNavigation<FirstTimeLoginNavigationProp>();
  const [licenceNo, setLicenceNo] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    navigation.navigate('TemporaryPassword');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECop</Text>
        <Text style={styles.subtitle}>First Time Login.</Text>
      </View>

      <View style={styles.formContainer}>
        <CustomInput
          label="Licence No Or Police No"
          value={licenceNo}
          onChangeText={setLicenceNo}
          placeholder="Enter licence or police number"
        />

        <CustomInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email address"
          keyboardType="email-address"
        />

        <CustomButton title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

export default FirstTimeLoginScreen;
