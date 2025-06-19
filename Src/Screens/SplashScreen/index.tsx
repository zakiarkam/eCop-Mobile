import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Navigations/RootNavigator';
import styles from './Styles';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const handleNext = () => {
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to eCop</Text>

        <View style={styles.logoContainer}>
          <Image
            source={require('../../Assets/Images/logo.png')}
            resizeMode="contain"
            style={{width: 200, height: 200}}
          />
          <Text style={styles.appName}>eCop</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.buttonText}>Next</Text>
          <Feather
            name="arrow-right-circle"
            size={18}
            color="#ffffff"
            style={{marginLeft: 12}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
