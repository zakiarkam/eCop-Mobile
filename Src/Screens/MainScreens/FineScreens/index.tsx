import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../../../Styles/colors';
import ViolationForm from '../../../Components/ViolationRecord';
import {userStorageService} from '../../../Services/UserStorageService';

type FineScreenProps = {
  navigation: StackNavigationProp<any>;
};

const FineScreen = ({navigation}: FineScreenProps) => {
  const [userType, setUserType] = useState<'licence' | 'police' | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await userStorageService.getUserData();
      if (storedUserData) {
        setUserType(storedUserData.userType);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleSuccess = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {userType === 'licence' ? (
          <Text style={styles.title}>Pay Your Fines</Text>
        ) : (
          <Text style={styles.title}>Fine For Drivers</Text>
        )}
      </View>

      {userType === 'licence' ? (
        <Text>Pay Your Fines</Text>
      ) : userType === 'police' ? (
        <ViolationForm
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          userType={userType}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    color: Colors.white,
    borderBottomColor: '#e0e0e0',
    paddingTop: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default FineScreen;
