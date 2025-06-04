import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../../Components/Header';
import StatsCard from '../../../Components/StatsCard';
import ProgressCard from '../../../Components/ProgressCard';
import SavingsCard from '../../../Components/SavingsCard';
import {styles} from './Styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Header />
        <StatsCard
          title="Pending Total Fines"
          amount="Rs.1,750.00"
          subtitle="This Year Fines"
          count="02"
        />
        <ProgressCard />
      </View>

      <View style={styles.statsContainer}>
        <SavingsCard />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
