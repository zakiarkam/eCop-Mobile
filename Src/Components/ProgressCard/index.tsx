import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './Styles';
import {Colors} from '../../Styles/colors';
import {userStorageService} from '../../Services/UserStorageService';

const ProgressCard = () => {
  const [licencePoints, setLicencePoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const MAX_POINTS = 100;

  useEffect(() => {
    const fetchLicencePoints = async () => {
      try {
        const points = await userStorageService.getLicencePoints();
        setLicencePoints(points || 0);
      } catch (error) {
        console.error('Error fetching licence points:', error);
        setLicencePoints(0);
      } finally {
        setLoading(false);
      }
    };

    fetchLicencePoints();
  }, []);

  const progressPercentage = Math.round((licencePoints / MAX_POINTS) * 100);

  const isWarningLevel = progressPercentage <= 25;
  const isDangerLevel = progressPercentage <= 10;

  const getProgressColor = () => {
    if (isDangerLevel) return Colors.red;
    if (isWarningLevel) return '#FFA500';
    return Colors.green;
  };

  const getStatusMessage = () => {
    if (isDangerLevel) {
      return `${progressPercentage}% Of Your Points is Remaining - Critical Level!`;
    } else if (isWarningLevel) {
      return `${progressPercentage}% Of Your Points is Remaining - Warning Level`;
    } else {
      return `${progressPercentage}% Of Your Points is Remaining.`;
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.progressLabel}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressSection}>
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabel}>{progressPercentage}%</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progressPercentage, 100)}%`,
                  backgroundColor: getProgressColor(),
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.checkSection}>
        <Icon
          name={
            isDangerLevel ? 'warning' : isWarningLevel ? 'info' : 'check-circle'
          }
          size={16}
          color={getProgressColor()}
        />
        <Text style={[styles.checkText, {color: getProgressColor()}]}>
          {getStatusMessage()}
        </Text>
      </View>
    </View>
  );
};

export default ProgressCard;
