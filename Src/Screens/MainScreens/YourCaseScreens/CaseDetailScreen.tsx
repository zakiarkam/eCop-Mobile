import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import styles from './Styles';
import {CaseStackParamList} from './CaseStackNavigator';
import {ViolationRecord} from '../../../Services/apiServices/violationService';
import paymentService, {
  PaymentRecord,
} from '../../../Services/apiServices/paymentService';
import {userStorageService} from '../../../Services/UserStorageService';

type CaseDetailsRouteProp = RouteProp<CaseStackParamList, 'CaseDetails'>;

interface ViolationWithPayment extends ViolationRecord {
  paymentDetails?: PaymentRecord;
}

export default function CaseDetailScreen() {
  const route = useRoute<CaseDetailsRouteProp>();
  const violation = route.params?.violation as ViolationWithPayment;
  const [paymentDetails, setPaymentDetails] = useState<PaymentRecord | null>(
    null,
  );
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [userType, setUserType] = useState<'licence' | 'police' | null>(null);

  useEffect(() => {
    loadUserType();
  }, []);

  useEffect(() => {
    if (
      violation &&
      userType === 'licence' &&
      (violation.status === 'paid' || violation.paymentStatus === 'paid')
    ) {
      loadPaymentDetails();
    }
  }, [violation, userType]);

  const loadUserType = async () => {
    try {
      const storedUserData = await userStorageService.getUserData();
      if (storedUserData) {
        setUserType(storedUserData.userType);
      }
    } catch (error) {
      console.error('Error loading user type:', error);
    }
  };

  const loadPaymentDetails = async () => {
    if (!violation) return;

    try {
      setLoadingPayment(true);
      const response = await paymentService.getPaymentDetailsByViolation(
        violation._id,
      );
      if (response.success && response.data) {
        setPaymentDetails(response.data);
      }
    } catch (error) {
      console.error('Error loading payment details:', error);
    } finally {
      setLoadingPayment(false);
    }
  };

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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
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

  const isPaid =
    violation.status === 'paid' || violation.paymentStatus === 'paid';
  const currentPaymentDetails = paymentDetails || violation.paymentDetails;
  const shouldShowPaymentInfo = userType === 'licence' && isPaid;

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
                <Text style={styles.detailLabelLarge}>Police ID:</Text>
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
                <Text style={styles.penaltyLabel}>Points</Text>
                <Text style={styles.penaltyValue}>{violation.points}</Text>
              </View>
            </View>
          </View>

          {/* Payment Information - Only shown for licence holders */}
          {shouldShowPaymentInfo && (
            <View style={styles.detailSection}>
              <Text style={styles.sectionHeaderText}>Payment Information</Text>

              {loadingPayment ? (
                <View style={styles.detailCard}>
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#4A90E2" />
                    <Text style={styles.loadingText}>
                      Loading payment details...
                    </Text>
                  </View>
                </View>
              ) : currentPaymentDetails ? (
                <View style={styles.detailCard}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabelLarge}>Payment Status:</Text>
                    <Text style={[styles.detailValueLarge, styles.paidStatus]}>
                      {currentPaymentDetails.status.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabelLarge}>Payment Date:</Text>
                    <Text style={styles.detailValueLarge}>
                      {formatDateTime(currentPaymentDetails.paymentDate)}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabelLarge}>Payment Method:</Text>
                    <Text style={styles.detailValueLarge}>
                      {currentPaymentDetails.paymentMethod.toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabelLarge}>Amount Paid:</Text>
                    <Text style={styles.detailValueLarge}>
                      {currentPaymentDetails.currency.toUpperCase()}{' '}
                      {currentPaymentDetails.amount}
                    </Text>
                  </View>

                  {currentPaymentDetails.stripePaymentIntentId && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabelLarge}>Payment ID:</Text>
                      <Text style={styles.detailValueSmall}>
                        {currentPaymentDetails.stripePaymentIntentId}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <View style={styles.detailCard}>
                  <Text style={styles.noPaymentText}>
                    Payment details not available
                  </Text>
                </View>
              )}
            </View>
          )}

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
