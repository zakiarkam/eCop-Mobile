import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../Screens/MainScreens/HomeScreen';
import ProfileScreen from '../Screens/MainScreens/ProfileScreen';
import YourCaseScreen from '../Screens/MainScreens/YourCaseScreens';
import FineScreen from '../Screens/MainScreens/FineScreens';
import RuleStackNavigator from '../Screens/MainScreens/RuleScreen/RuleStackNavigator';

import {Colors} from '../Styles/colors';
import {View, StyleSheet} from 'react-native';

export type BottomTabParamList = {
  Home: undefined;
  YourCase: undefined;
  Fine: undefined;
  Rule: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'YourCase') {
            iconName = 'bar-chart';
          } else if (route.name === 'Fine') {
            iconName = 'swap-horiz';
          } else if (route.name === 'Rule') {
            iconName = 'folder';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          }

          return (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}>
              <Icon
                name={iconName}
                size={focused ? 32 : 28}
                color={focused ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>
          );
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: Colors.lightBlue,
          borderTopColor: 'transparent',
          height: 95,
          paddingTop: 15,
          paddingHorizontal: 20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="YourCase" component={YourCaseScreen} />
      <Tab.Screen name="Fine" component={FineScreen} />
      <Tab.Screen name="Rule" component={RuleStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: Colors.primary || '#F5F5F5',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeIconContainer: {
    backgroundColor: Colors.background,
    shadowColor: Colors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default BottomNavigator;
