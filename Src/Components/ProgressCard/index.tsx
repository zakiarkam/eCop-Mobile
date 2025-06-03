import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './Styles';
import {Colors} from '../../Styles/colors';

const ProgressCard = () => {
  const progressPercentage = 30;

  return (
    <View style={styles.container}>
      <View style={styles.progressSection}>
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabel}>{progressPercentage}%</Text>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, {width: `${progressPercentage}%`}]}
            />
          </View>
        </View>
      </View>

      <View style={styles.checkSection}>
        <Icon name="check-circle" size={16} color={Colors.green} />
        <Text style={styles.checkText}>30% Of Your Points Is Finished,</Text>
      </View>
    </View>
  );
};

export default ProgressCard;
