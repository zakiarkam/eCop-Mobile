import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from '../../../Styles/colors';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FineScreen from './FineScreen';
import PaymentScreen from './PaymentScreen';
import {ViolationRecord} from '../../../Services/apiServices/violationService';

export type FineStackParamList = {
  FineMain: undefined;
  PaymentScreen: {
    violation: ViolationRecord;
    onPaymentSuccess?: () => void;
  };
};

const Stack = createNativeStackNavigator<FineStackParamList>();

const FineStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="FineMain">
      <Stack.Screen
        name="FineMain"
        component={FineScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'white',
          headerShadowVisible: false,
          title: '',
          headerBackTitle: '',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 2,
                marginBottom: 3,
                padding: 8,
                borderRadius: 20,
                backgroundColor: Colors.lightBlue,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={20} color="#ffff" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default FineStackNavigator;
