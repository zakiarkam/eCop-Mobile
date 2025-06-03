import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './Styles';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <Text style={styles.greeting}>Hi, Welcome Back</Text>
        <Text style={styles.timeText}>Good Morning</Text>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={16}
            color="rgba(255,255,255,0.8)"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <Icon name="person" size={32} color="rgba(255,255,255,0.9)" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
