import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from '../../../Styles/colors';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CaseMainScreen from './CaseMainScreen';
import CaseDetailScreen from './CaseDetailScreen';
import {ViolationRecord} from '../../../Services/apiServices/violationService';

export type CaseStackParamList = {
  CaseDetails: {violation: ViolationRecord};
  CaseMain: undefined;
};

const Stack = createNativeStackNavigator<CaseStackParamList>();

const CaseStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="CaseMain">
      <Stack.Screen
        name="CaseMain"
        component={CaseMainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CaseDetails"
        component={CaseDetailScreen}
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

export default CaseStackNavigator;
