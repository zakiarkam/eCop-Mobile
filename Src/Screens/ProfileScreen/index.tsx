import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../Styles/colors';
import {StyleSheet} from 'react-native';

const ProfileScreen = () => {
  const profileOptions = [
    {id: 1, title: 'Personal Information', icon: 'person'},
    {id: 2, title: 'Settings', icon: 'settings'},
    {id: 3, title: 'Help & Support', icon: 'help'},
    {id: 4, title: 'About', icon: 'info'},
    {id: 5, title: 'Logout', icon: 'logout'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Icon name="person" size={40} color={Colors.white} />
          </View>
          <View>
            <Text style={styles.name}>Officer Name</Text>
            <Text style={styles.badge}>Badge: #12345</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {profileOptions.map(option => (
          <TouchableOpacity key={option.id} style={styles.menuItem}>
            <Icon name={option.icon} size={24} color={Colors.primary} />
            <Text style={styles.menuText}>{option.title}</Text>
            <Icon name="chevron-right" size={24} color={Colors.gray} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
  },
  badge: {
    fontSize: 14,
    color: Colors.lightBlue,
    marginTop: 2,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: Colors.darkGray,
    marginLeft: 15,
  },
});

export default ProfileScreen;
