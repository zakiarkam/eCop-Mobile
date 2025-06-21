import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../Components/Header';
import StatsCard from '../../../Components/StatsCard';
import ProgressCard from '../../../Components/ProgressCard';
import SavingsCard from '../../../Components/SavingsCard';
import {styles} from './Styles';
import {userStorageService} from '../../../Services/UserStorageService';
import PoliceYearCard from '../../../Components/PoliceYearCard';
import PoliceAnnouncement from '../../../Components/PoliceAnnouncement';

const HomeScreen = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />
        {userType === 'licence' ? (
          <>
            <StatsCard
              title="Pending Total Fines"
              amount="Rs.1,750.00"
              subtitle="This Year Fines"
              count="02"
            />
            <ProgressCard />
          </>
        ) : (
          <PoliceYearCard />
        )}
      </View>

      <View style={styles.statsContainer}>
        {userType === 'licence' ? <SavingsCard /> : <PoliceAnnouncement />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
