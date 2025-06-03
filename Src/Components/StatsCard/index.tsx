import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './Styles';

type StatsCardProps = {
  title: string;
  amount: string | number;
  subtitle: string;
  count: string | number;
};

const StatsCard = ({title, amount, subtitle, count}: StatsCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
};

export default StatsCard;
