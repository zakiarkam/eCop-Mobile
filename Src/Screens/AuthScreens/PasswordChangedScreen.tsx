import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigations/RootNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../Components/CustomButton';
import styles from './Styles';
import {Colors} from '../../Styles/colors';

type PasswordChangedNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

const PasswordChangedScreen = () => {
  const navigation = useNavigation<PasswordChangedNavigationProp>();

  const handleContinue = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Icon name="check" size={40} color={Colors.white} />
        </View>
        <Text style={styles.successTitle}>Password Has Been</Text>
        <Text style={styles.successTitle}>Changed Successfully</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default PasswordChangedScreen;
