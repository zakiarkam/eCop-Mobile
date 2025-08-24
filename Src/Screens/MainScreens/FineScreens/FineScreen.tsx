import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Alert} from 'react-native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../../../Styles/colors';
import ViolationForm from '../../../Components/ViolationRecord';
import {userStorageService} from '../../../Services/UserStorageService';
import styles from './Styles';
import LicenceFinesList from '../../../Components/LicenceFinesList';

type FineScreenProps = {
  navigation: StackNavigationProp<any>;
};

const FineScreen = ({navigation}: FineScreenProps) => {
  const [userType, setUserType] = useState<'licence' | 'police' | null>(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await userStorageService.getUserData();
      if (storedUserData) {
        setUserType(storedUserData.userType);
        setUserId(storedUserData.userId);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Loading...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading user data...</Text>
        </View>
      </View>
    );
  }

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
        <LicenceFinesList userId={userId} navigation={navigation} />
      ) : userType === 'police' ? (
        <ViolationForm
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          userType={userType}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default FineScreen;
