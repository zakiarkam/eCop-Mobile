import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RuleMainScreen from './RuleMainScreen';
import ActDetailsScreen from './ActDetailsScreen';
import {RuleType} from '../../../Services/apiServices/rulesApi';
import {Colors} from '../../../Styles/colors';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type RuleStackParamList = {
  RuleMain: undefined;
  ActDetails: {
    actName: string;
    actRules: RuleType[];
  };
};

const Stack = createNativeStackNavigator<RuleStackParamList>();

const RuleStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
      initialRouteName="RuleMain">
      <Stack.Screen
        name="RuleMain"
        component={RuleMainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ActDetails"
        component={ActDetailsScreen}
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

export default RuleStackNavigator;
