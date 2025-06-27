import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import violationService, {
  ViolationRecord,
} from '../../Services/apiServices/violationService';
import styles from './Styles';

type LicenceFinesListProps = {
  userId: string;
  navigation: any;
};

const LicenceFinesList = ({userId, navigation}: LicenceFinesListProps) => {
  const [activeViolations, setActiveViolations] = useState<ViolationRecord[]>(
    [],
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userId) {
      loadActiveViolations();
    }
  }, [userId]);

  const loadActiveViolations = async () => {
    try {
      setRefreshing(true);
      const response = await violationService.getViolationsByLicenceHolder(
        userId,
      );

      if (response?.success && response.data) {
        // Filter only active violations for payment
        const activeOnly = response.data.filter(
          (violation: ViolationRecord) => violation.status === 'active',
        );
        setActiveViolations(activeOnly);
      } else {
        setActiveViolations([]);
      }
    } catch (error) {
      console.error('Error loading active violations:', error);
      Alert.alert('Error', 'Failed to load active violation records');
      setActiveViolations([]);
    } finally {
      setRefreshing(false);
    }
  };

  const handlePayNow = (violation: ViolationRecord) => {
    navigation.navigate('PaymentScreen', {
      violation: violation,
      onPaymentSuccess: () => {
        loadActiveViolations();
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTotalUnpaidAmount = () => {
    return activeViolations.reduce(
      (total, violation) => total + Number(violation.fine),
      0,
    );
  };

  return (
    <View style={styles.fineContentContainer}>
      {/* Summary Section */}
      {activeViolations.length > 0 && (
        <View style={styles.fineSummaryCard}>
          <Text style={styles.fineSummaryTitle}>Outstanding Fines</Text>
          <Text style={styles.fineSummaryAmount}>
            Rs. {getTotalUnpaidAmount().toLocaleString()}
          </Text>
          <Text style={styles.fineSummarySubtext}>
            {activeViolations.length} unpaid violation
            {activeViolations.length > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      <ScrollView
        style={styles.fineScrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.fineScrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadActiveViolations}
            colors={[Colors.primary]}
          />
        }>
        {activeViolations.map(violation => (
          <View key={violation._id} style={styles.violationCard}>
            <View style={styles.violationHeader}>
              <Text style={styles.violationDate}>
                {formatDate(violation.violationDate)}
              </Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeText}>UNPAID</Text>
              </View>
            </View>

            <Text style={styles.violationAct} numberOfLines={2}>
              {violation.ruleProvision}
            </Text>

            <View style={styles.violationDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Vehicle:</Text>
                <Text style={styles.detailValue}>
                  {violation.vehicleNumber}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue} numberOfLines={1}>
                  {violation.placeOfViolation}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Points:</Text>
                <Text style={styles.detailValue}>{violation.points}</Text>
              </View>
            </View>

            <View style={styles.paymentSection}>
              <View style={styles.fineContainer}>
                <Text style={styles.fineLabel}>Fine Amount</Text>
                <Text style={styles.fineAmount}>Rs. {violation.fine}</Text>
              </View>

              <TouchableOpacity
                style={styles.payButton}
                onPress={() => handlePayNow(violation)}
                activeOpacity={0.8}>
                <Text style={styles.payButtonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {activeViolations.length === 0 && !refreshing && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No Outstanding Fines</Text>
            <Text style={styles.emptySubtext}>
              You have no unpaid traffic violations.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LicenceFinesList;
