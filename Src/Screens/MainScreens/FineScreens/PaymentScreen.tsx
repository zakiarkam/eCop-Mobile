import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../../Styles/colors';
import {ViolationRecord} from '../../../Services/apiServices/violationService';
import {
  CardField,
  useStripe,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import paymentService from '../../../Services/apiServices/paymentService';
import styles from './Styles';

type PaymentScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

interface RouteParams {
  violation: ViolationRecord;
  onPaymentSuccess?: () => void;
}

const PaymentScreen = ({navigation, route}: PaymentScreenProps) => {
  const {violation, onPaymentSuccess} = route.params as RouteParams;
  const {confirmPayment} = useConfirmPayment();
  const [loading, setLoading] = useState(false);
  const [cardValid, setCardValid] = useState(false);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
    useState<string>('');
  const [cardDetails, setCardDetails] = useState<any>(null);

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      console.log(
        'Creating payment intent for amount:',
        Number(violation.fine) * 100,
      );

      const response = await paymentService.createPaymentIntent({
        amount: Number(violation.fine) * 100, // Convert to cents
        currency: 'lkr',
        violationId: violation._id,
        description: `Fine payment for violation: ${violation.ruleProvision}`,
      });

      console.log('Payment intent response:', response);

      if (response?.success && response.clientSecret) {
        setPaymentIntentClientSecret(response.clientSecret);
        console.log('Client secret set successfully');
      } else {
        console.error('Payment intent creation failed:', response);
        Alert.alert('Error', 'Failed to initialize payment. Please try again.');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
      Alert.alert('Error', 'Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!cardValid || !paymentIntentClientSecret) {
      Alert.alert('Error', 'Please enter valid card details');
      return;
    }

    if (!cardDetails) {
      Alert.alert('Error', 'Card details not available');
      return;
    }

    try {
      setLoading(true);
      console.log('Starting payment confirmation...');

      const {error, paymentIntent} = await confirmPayment(
        paymentIntentClientSecret,
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails: {},
          },
        },
      );

      console.log('Payment confirmation result:', {error, paymentIntent});

      if (error) {
        console.error('Payment error:', error);
        Alert.alert(
          'Payment Failed',
          error.message || 'Payment failed. Please try again.',
        );
      } else if (paymentIntent) {
        console.log('Payment intent status:', paymentIntent.status);

        if (paymentIntent.status === 'Succeeded') {
          // Update violation status to paid
          await updateViolationStatus();

          Alert.alert(
            'Payment Successful!',
            'Your fine has been paid successfully!',
            [
              {
                text: 'OK',
                onPress: () => {
                  onPaymentSuccess?.();
                  navigation.goBack();
                },
              },
            ],
          );
        } else if (paymentIntent.status === 'RequiresAction') {
          Alert.alert(
            'Authentication Required',
            'Please complete the authentication process.',
          );
        } else {
          Alert.alert(
            'Payment Status',
            `Payment status: ${paymentIntent.status}`,
          );
        }
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      Alert.alert('Error', 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateViolationStatus = async () => {
    try {
      console.log('Updating violation status...');
      await paymentService.updateViolationPaymentStatus({
        violationId: violation._id,
        status: 'paid',
        paymentStatus: 'paid',
        paymentDate: new Date().toISOString(),
      });
      console.log('Violation status updated successfully');
    } catch (error) {
      console.error('Error updating violation status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Payment',
      'Are you sure you want to cancel this payment?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => navigation.goBack()},
      ],
    );
  };

  if (loading && !paymentIntentClientSecret) {
    return (
      <View style={styles.paymentContainer}>
        <View style={styles.paymentHeader}>
          <Text style={styles.paymentTitle}>Payment</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.white} />
          <Text style={styles.paymentLoadingText}>Initializing payment...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.paymentContainer}>
      <View style={styles.paymentHeader}>
        <Text style={styles.paymentTitle}>Payment</Text>
      </View>

      <ScrollView
        style={styles.paymentContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Violation Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date:</Text>
            <Text style={styles.summaryValue}>
              {formatDate(violation.violationDate)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Vehicle:</Text>
            <Text style={styles.summaryValue}>{violation.vehicleNumber}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Location:</Text>
            <Text style={styles.summaryValue} numberOfLines={2}>
              {violation.placeOfViolation}
            </Text>
          </View>

          <Text style={styles.violationRule}>{violation.ruleProvision}</Text>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount to Pay</Text>
            <Text style={styles.amountValue}>Rs. {violation.fine}</Text>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.paymentCard}>
          <Text style={styles.paymentCardTitle}>Payment Details</Text>

          <View style={styles.cardFieldContainer}>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
                cvc: 'CVC',
                expiration: 'MM/YY',
              }}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                fontSize: 16,
                placeholderColor: '#999999',
              }}
              style={styles.cardFieldStyle}
              onCardChange={cardDetails => {
                console.log('Card details changed:', cardDetails);
                setCardValid(cardDetails.complete);
                setCardDetails(cardDetails);
              }}
            />
          </View>

          <View style={styles.securityInfo}>
            <Text style={styles.securityText}>
              🔒 Your payment information is secure and encrypted
            </Text>
          </View>
        </View>

        {/* Payment Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Payment Breakdown</Text>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Fine Amount</Text>
            <Text style={styles.breakdownValue}>Rs. {violation.fine}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Processing Fee</Text>
            <Text style={styles.breakdownValue}>Rs. 0</Text>
          </View>

          <View style={[styles.breakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>Rs. {violation.fine}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          disabled={loading}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentPayButton,
            (!cardValid || loading || !paymentIntentClientSecret) &&
              styles.paymentPayButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={!cardValid || loading || !paymentIntentClientSecret}>
          {loading ? (
            <ActivityIndicator color={Colors.white} size="small" />
          ) : (
            <Text style={styles.paymentPayButtonText}>
              Pay Rs. {violation.fine}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;
