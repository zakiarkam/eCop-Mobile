import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './Styles';
import violationService, {
  ViolationRecord,
} from '../../Services/apiServices/violationService';
import {userStorageService} from '../../Services/UserStorageService';

interface UserStats {
  totalPaidThisYear: number;
  mostCommonViolationType: string;
  totalViolationsThisYear: number;
  averageFineAmount: number;
}

const SavingsCard = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalPaidThisYear: 0,
    mostCommonViolationType: 'No violations',
    totalViolationsThisYear: 0,
    averageFineAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (userId) {
      loadUserStats();
    }
  }, [userId]);

  const loadUserData = async () => {
    try {
      const storedUserData = await userStorageService.getUserData();
      if (storedUserData?.userId) {
        setUserId(storedUserData.userId);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      setLoading(true);
      const response = await violationService.getViolationsByLicenceHolder(
        userId,
      );

      if (response?.success && response.data) {
        const violations: ViolationRecord[] = response.data;
        const currentYear = new Date().getFullYear();

        const thisYearViolations = violations.filter(violation => {
          const violationYear = new Date(violation.violationDate).getFullYear();
          return violationYear === currentYear;
        });

        const totalPaidThisYear = thisYearViolations
          .filter(violation => violation.paymentStatus === 'paid')
          .reduce((total, violation) => total + Number(violation.fine), 0);

        const violationTypeCounts: {[key: string]: number} = {};
        thisYearViolations.forEach(violation => {
          const ruleSection = violation.ruleSection || 'Unknown';
          violationTypeCounts[ruleSection] =
            (violationTypeCounts[ruleSection] || 0) + 1;
        });

        const mostCommonViolationType = Object.keys(violationTypeCounts).reduce(
          (a, b) => (violationTypeCounts[a] > violationTypeCounts[b] ? a : b),
          'No violations',
        );

        // Calculate average fine amount
        const averageFineAmount =
          thisYearViolations.length > 0
            ? thisYearViolations.reduce(
                (total, violation) => total + Number(violation.fine),
                0,
              ) / thisYearViolations.length
            : 0;

        setUserStats({
          totalPaidThisYear,
          mostCommonViolationType: violationTypeCounts[mostCommonViolationType]
            ? `Act - ${mostCommonViolationType}  [ ${violationTypeCounts[mostCommonViolationType]} times ]`
            : 'No violations',
          totalViolationsThisYear: thisYearViolations.length,
          averageFineAmount,
        });
      }
    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number): string => {
    return `Rs.${amount.toLocaleString()}.00`;
  };

  const getMotivationalMessage = (): string => {
    if (userStats.totalViolationsThisYear === 0) {
      return 'Perfect driver! Keep it up!';
    } else if (userStats.totalViolationsThisYear <= 5) {
      return 'Drive Safe, Stay Safe';
    } else {
      return "Let's improve our driving habits";
    }
  };

  const getSubtitleMessage = (): string => {
    if (userStats.totalViolationsThisYear === 0) {
      return "No violations this year — you're setting a great example!";
    } else if (userStats.totalViolationsThisYear <= 5) {
      return 'Obey traffic rules — your loved ones are waiting.';
    } else {
      return 'Focus on safe driving to protect yourself and others.';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.leftSection}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="loading" size={40} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Loading...</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name={'car'} size={40} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{getMotivationalMessage()}</Text>
            <Text style={styles.subtitle}>{getSubtitleMessage()}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.rightSection}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={18}
              color="rgba(255,255,255,0.8)"
            />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Total You Paid This Year</Text>
              <Text style={styles.statValue}>
                {formatAmount(userStats.totalPaidThisYear)}
              </Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={18}
              color="rgba(255,255,255,0.8)"
            />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Most Common Violation</Text>
              <Text style={styles.statValue} numberOfLines={2}>
                {userStats.mostCommonViolationType}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SavingsCard;
