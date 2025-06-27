import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import MainNavigation from './Src/Navigations/index';
import {Colors} from './Src/Styles/colors';
import 'react-native-vector-icons/MaterialIcons';
import {StripeProvider} from '@stripe/stripe-react-native';

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51QD1h2H6SLay4HWeaYK0Uaxk8qN3xWAlvd5PpfcQeGvOZI4QtQYJXhMeZHrn1pgebYlhy64lGaUgULgVGNYZUZZW00zIXNlX0E';

const App = () => {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <NavigationContainer>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <MainNavigation />
      </NavigationContainer>
    </StripeProvider>
  );
};

export default App;
