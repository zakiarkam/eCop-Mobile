import React, {useEffect} from 'react';
import {View, Text, Image, Button} from 'react-native';
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

      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

export default SplashScreen;
