import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import MainNavigation from './Src/Navigations/index';
import {Colors} from './Src/Styles/colors';
import 'react-native-vector-icons/MaterialIcons';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
