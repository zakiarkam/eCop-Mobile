import React from 'react';
import {View, Text, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import styles from './Styles';
import {CaseStackParamList} from './CaseStackNavigator';
import {ViolationRecord} from '../../../Services/apiServices/violationService';

type CaseDetailsRouteProp = RouteProp<CaseStackParamList, 'CaseDetails'>;

export default function CaseDetailScreen() {
  const route = useRoute<CaseDetailsRouteProp>();
  const violation = route.params?.violation as ViolationRecord;

  if (!violation) {
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContent}>
          <View style={styles.noRulesContainer}>
            <Text style={styles.noRulesText}>No Data Found</Text>
            <Text style={styles.noRulesSubtext}>
              Unable to load violation details.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#E74C3C' : '#2ECC71';
  };

  const handleContactPress = (phoneNumber: string) => {
    Alert.alert('Contact', `Phone: ${phoneNumber}`, [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', style: 'default'},
    ]);
  };

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsHeader}>
        <Text style={styles.actTitle}>Violation Details</Text>
      </View>

      <View style={styles.detailsContent}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Status Badge */}
          <View style={styles.statusSection}>
            <View
              style={[
                styles.statusBadgeLarge,
                {backgroundColor: getStatusColor(violation.status)},
              ]}>
              <Text style={styles.statusTextLarge}>
                {violation.status.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionHeaderText}>Violation Information</Text>

            <View style={styles.detailCard}>
              <Text style={styles.violationActDetail}>
                {violation.ruleProvision}
              </Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Rule Section:</Text>
                <Text style={styles.detailValueLarge}>
                  {violation.ruleSection}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Date:</Text>
                <Text style={styles.detailValueLarge}>
                  {formatDate(violation.violationDate)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Time:</Text>
                <Text style={styles.detailValueLarge}>
                  {formatTime(violation.violationDate)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Location:</Text>
                <Text style={styles.detailValueLarge}>
                  {violation.placeOfViolation}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionHeaderText}>Vehicle Information</Text>

            <View style={styles.detailCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Vehicle Number:</Text>
                <Text style={styles.detailValueLarge}>
                  {violation.vehicleNumber}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Licence Number:</Text>
                <Text style={styles.detailValueLarge}>
                  {violation.licenceNumber}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.detailRow}
                onPress={() => handleContactPress(violation.phoneNumber)}>
                <Text style={styles.detailLabelLarge}>Contact:</Text>
                <Text style={[styles.detailValueLarge, styles.contactLink]}>
                  {violation.phoneNumber}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionHeaderText}>Issued By</Text>

            <View style={styles.detailCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Police Number:</Text>
                <Text style={styles.detailValueLarge}>
                  {violation.policeNumber}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.sectionHeaderText}>Penalty</Text>

            <View style={styles.penaltyContainer}>
              <View style={styles.penaltyCard}>
                <Text style={styles.penaltyLabel}>Fine Amount</Text>
                <Text style={styles.penaltyValue}>Rs. {violation.fine}</Text>
              </View>

              <View style={styles.penaltyCard}>
                <Text style={styles.penaltyLabel}>Demerit Points</Text>
                <Text style={styles.penaltyValue}>{violation.points}</Text>
              </View>
            </View>
          </View>

          {/* Notes Section */}
          {violation.notes && (
            <View style={styles.detailSection}>
              <Text style={styles.sectionHeaderText}>Additional Notes</Text>

              <View style={styles.detailCard}>
                <Text style={styles.notesText}>{violation.notes}</Text>
              </View>
            </View>
          )}

          <View style={styles.detailSection}>
            <Text style={styles.sectionHeaderText}>Record Information</Text>

            <View style={styles.detailCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Record ID:</Text>
                <Text style={styles.detailValueSmall}>{violation._id}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Created:</Text>
                <Text style={styles.detailValueLarge}>
                  {formatDate(violation.createdAt)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabelLarge}>Last Updated:</Text>
                <Text style={styles.detailValueLarge}>
                  {formatDate(violation.updatedAt)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
