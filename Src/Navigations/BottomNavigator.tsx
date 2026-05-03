import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../Screens/MainScreens/HomeScreen';
import ProfileScreen from '../Screens/MainScreens/ProfileScreen';
import FineScreen from '../Screens/MainScreens/FineScreens/FineScreen';
import RuleStackNavigator from '../Screens/MainScreens/RuleScreen/RuleStackNavigator';

import {Colors} from '../Styles/colors';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CaseStackNavigator from '../Screens/MainScreens/YourCaseScreens/CaseStackNavigator';
import FineStackNavigator from '../Screens/MainScreens/FineScreens/FineStackNavigator';
import NewScreen from '../Screens/MainScreens/newScreen';

export type BottomTabParamList = {
  Home: undefined;
  Case: undefined;
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
          } else if (route.name === 'Case') {
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
        headerShown: true,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Case"
        component={CaseStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Fine"
        component={FineStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Rule"
        component={RuleStackNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'white',
          headerShadowVisible: false,
          title: 'My Profile',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitle: '',
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 16,
                marginBottom: 3,
                padding: 4,
                borderRadius: 20,
                backgroundColor: Colors.lightBlue,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={16} color="#ffff" />
            </TouchableOpacity>
          ),
        })}
      />
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
