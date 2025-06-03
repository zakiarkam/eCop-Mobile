import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './Styles';

const SavingsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="car" size={40} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Drive Safe, Stay Safe</Text>
            <Text style={styles.subtitle}>
              Obey traffic rules — your loved ones are waiting.
            </Text>
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
              <Text style={styles.statLabel}>Total You Paid</Text>
              <Text style={styles.statValue}>Rs.4,000.00</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="currency-usd"
              size={18}
              color="rgba(255,255,255,0.8)"
            />
            <View style={styles.statTextContainer}>
              <Text style={styles.statLabel}>Most of The Fines</Text>
              <Text style={styles.statValue}>Case-2</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SavingsCard;
