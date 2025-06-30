import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../Components/Header';
import StatsCard from '../../../Components/StatsCard';
import ProgressCard from '../../../Components/ProgressCard';
import SavingsCard from '../../../Components/SavingsCard';
import {styles} from './Styles';
import {userStorageService} from '../../../Services/UserStorageService';
import violationService, {
  ViolationRecord,
} from '../../../Services/apiServices/violationService';
import PoliceYearCard from '../../../Components/PoliceYearCard';
import PoliceAnnouncement from '../../../Components/PoliceAnnouncement';

const HomeScreen = () => {
  const [userType, setUserType] = useState<'licence' | 'police' | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [violationStats, setViolationStats] = useState({
    totalPendingAmount: 0,
    totalPendingCount: 0,
    thisYearCount: 0,
    thisYearAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (userId && userType === 'licence') {
      loadViolationStats();
    }
  }, [userId, userType]);

  const loadUserData = async () => {
    try {
      const storedUserData = await userStorageService.getUserData();
      if (storedUserData) {
        setUserType(storedUserData.userType);
        setUserId(storedUserData.userId || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadViolationStats = async () => {
    try {
      const response = await violationService.getViolationsByLicenceHolder(
        userId,
      );

      if (response?.success && response.data) {
        const violations: ViolationRecord[] = response.data;

        const activeViolations = violations.filter(
          (violation: ViolationRecord) => violation.status === 'active',
        );

        const totalPendingAmount = activeViolations.reduce(
          (total, violation) => total + Number(violation.fine),
          0,
        );
        const totalPendingCount = activeViolations.length;

        const currentYear = new Date().getFullYear();
        const thisYearViolations = activeViolations.filter(violation => {
          const violationYear = new Date(violation.violationDate).getFullYear();
          return violationYear === currentYear;
        });

        const thisYearAmount = thisYearViolations.reduce(
          (total, violation) => total + Number(violation.fine),
          0,
        );
        const thisYearCount = thisYearViolations.length;

        setViolationStats({
          totalPendingAmount,
          totalPendingCount,
          thisYearCount,
          thisYearAmount,
        });
      }
    } catch (error) {
      console.error('Error loading violation stats:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await loadUserData();

      // If user is licence holder, reload violation stats
      if (userType === 'licence' && userId) {
        await loadViolationStats();
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const formatAmount = (amount: number) => {
    return `Rs.${amount.toLocaleString()}.00`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Header />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1976D2']}
            tintColor="#1976D2"
          />
        }
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Header />
          {userType === 'licence' ? (
            <>
              <StatsCard
                title="Pending Total Amount"
                amount={formatAmount(violationStats.totalPendingAmount)}
                subtitle="Pending Fines"
                count={violationStats.thisYearCount.toString().padStart(2, '0')}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
