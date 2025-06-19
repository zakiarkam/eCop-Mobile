import React from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RuleType} from '../../../Services/apiServices/rulesApi';
import styles from './Styles';

interface RouteParams {
  actName: string;
  actRules: RuleType[];
}

const ActDetailsScreen = () => {
  const route = useRoute();
  const {actName, actRules} = route.params as RouteParams;

  const formatFine = (fine: string) => {
    if (!fine.includes('Rs') && !fine.includes('$')) {
      return `Rs. ${fine}`;
    }
    return fine;
  };

  const formatPoints = (points: number) => {
    return points === 1 ? `${points} Point` : `${points} Points`;
  };

  return (
    <SafeAreaView style={styles.detailsContainer}>
      <View style={styles.detailsHeader}>
        <Text style={styles.actTitle}>Act - {actName}</Text>
      </View>

      <View style={styles.detailsContent}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {actRules.length > 0 ? (
            actRules.map((rule, index) => (
              <View key={rule._id} style={styles.ruleCard}>
                <Text style={styles.ruleProvision}>{rule.provision}</Text>

                <View style={styles.ruleDetails}>
                  <View style={styles.ruleInfo}>
                    <Text style={styles.ruleFine}>
                      Fine: {formatFine(rule.fine)}
                    </Text>
                    <Text style={styles.rulePoints}>
                      {formatPoints(rule.points)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noRulesContainer}>
              <Text style={styles.noRulesText}>No Rules Found</Text>
              <Text style={styles.noRulesSubtext}>
                This act doesn't have any rules at the moment
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ActDetailsScreen;
