import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  rulesApiService,
  RuleType,
} from '../../../Services/apiServices/rulesApi';
import styles from './Styles';

type RuleStackParamList = {
  ActDetails: {actName: string; actRules: RuleType[]};
};

const RuleMainScreen = () => {
  const [rules, setRules] = useState<RuleType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation =
    useNavigation<
      import('@react-navigation/native').NavigationProp<RuleStackParamList>
    >();

  const groupedRules = rules.reduce((acc, rule) => {
    const section = rule.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(rule);
    return acc;
  }, {} as Record<string, RuleType[]>);

  const acts = Object.keys(groupedRules);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const response = await rulesApiService.getAllRules();
      if (response.rules) {
        setRules(response.rules);
      }
    } catch (error) {
      console.error('Error fetching rules:', error);
      Alert.alert('Error', 'Failed to fetch traffic rules');
    } finally {
      setLoading(false);
    }
  };

  const handleActPress = (actName: string) => {
    const actRules = groupedRules[actName];
    navigation.navigate('ActDetails', {
      actName,
      actRules,
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>ECop</Text>
          <Text style={styles.subtitle}>Traffic Rules</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Loading Acts...</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ECop</Text>
        <Text style={styles.subtitle}>Traffic Rules</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Case Details</Text>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.actGrid}>
            {acts.map((act, index) => (
              <TouchableOpacity
                key={act}
                style={styles.actButton}
                onPress={() => handleActPress(act)}
                activeOpacity={0.8}>
                <Text style={styles.actButtonText}>
                  Act - {act.length > 10 ? `${act.substring(0, 10)}...` : act}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {acts.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Acts Available</Text>
              <Text style={styles.emptySubtext}>
                Please check back later for traffic rules
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default RuleMainScreen;
