import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './Styles';

type StatsCardProps = {
  title: string;
  amount: string | number;
  subtitle: string;
  count: string | number;
  loading?: boolean;
};

const StatsCard = ({
  title,
  amount,
  subtitle,
  count,
  loading = false,
}: StatsCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="#666"
              style={{marginTop: 5}}
            />
          ) : (
            <Text style={styles.amount}>{amount}</Text>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {loading ? (
          <ActivityIndicator size="small" color="#666" style={{marginTop: 5}} />
        ) : (
          <Text style={styles.count}>{count}</Text>
        )}
      </View>
    </View>
  );
};

export default StatsCard;
