import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles';
import {userStorageService} from '../../../Services/UserStorageService';
import {StackNavigationProp} from '@react-navigation/stack';
import violationService, {
  ViolationRecord,
} from '../../../Services/apiServices/violationService';
import {CaseStackParamList} from './CaseStackNavigator';

type NavigationProp = StackNavigationProp<CaseStackParamList, 'CaseMain'>;

const CaseMainScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'licence' | 'police' | null>(null);
  const [userId, setUserId] = useState('');
  const [violations, setViolations] = useState<ViolationRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (userId && userType) {
      loadViolations();
    }
  }, [userId, userType]);

  const loadUserData = async () => {
    try {
      const storedUserData = await userStorageService.getUserData();
      if (storedUserData) {
        setUserType(storedUserData.userType);
        setUserId(storedUserData.userId);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const loadViolations = async () => {
    try {
      setRefreshing(true);
      let response;

      if (userType === 'licence') {
        response = await violationService.getViolationsByLicenceHolder(userId);
      } else if (userType === 'police') {
        response = await violationService.getViolationsByPoliceOfficer(userId);
      }

      if (response?.success && response.data) {
        setViolations(response.data);
      } else {
        setViolations([]);
      }
    } catch (error) {
      console.error('Error loading violations:', error);
      Alert.alert('Error', 'Failed to load violation records');
      setViolations([]);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    if (userId && userType) {
      loadViolations();
    }
  }, [userId, userType]);

  const handleViolationPress = (violation: ViolationRecord) => {
    navigation.navigate('CaseDetails', {violation});
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#E74C3C' : '#2ECC71';
  };

  if (
    loading ||
    (userId && userType && violations.length === 0 && refreshing)
  ) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>eCop</Text>
          <Text style={styles.subtitle}>Loading...</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>
              {loading
                ? 'Loading user data...'
                : 'Loading violation records...'}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>eCop</Text>
        <Text style={styles.subtitle}>
          {userType === 'police'
            ? 'Violation Records Logged'
            : 'My Traffic Violation History'}
        </Text>
        <Text style={styles.sectionTitle}>
          {violations.length > 0 ? `${violations.length} Records Found` : ''}
        </Text>
      </View>

      <View style={styles.formContainer}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4A90E2']}
              tintColor="#4A90E2"
              title="Pull to refresh"
              titleColor="#4A90E2"
            />
          }>
          {violations.map(violation => (
            <TouchableOpacity
              key={violation._id}
              style={styles.violationCard}
              onPress={() => handleViolationPress(violation)}
              activeOpacity={0.7}>
              <View style={styles.violationHeader}>
                <View style={styles.violationDateContainer}>
                  <Text style={styles.violationDate}>
                    {formatDate(violation.violationDate)}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {backgroundColor: getStatusColor(violation.status)},
                    ]}>
                    <Text style={styles.statusText}>
                      {violation.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.violationContent}>
                <Text style={styles.violationAct} numberOfLines={2}>
                  {violation.ruleProvision}
                </Text>

                <View style={styles.violationDetails}>
                  <View style={styles.violationDetailItem}>
                    <Text style={styles.detailLabel}>Vehicle:</Text>
                    <Text style={styles.detailValue}>
                      {violation.vehicleNumber}
                    </Text>
                  </View>

                  <View style={styles.violationDetailItem}>
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue} numberOfLines={1}>
                      {violation.placeOfViolation}
                    </Text>
                  </View>
                </View>

                <View style={styles.violationFooter}>
                  <View style={styles.fineContainer}>
                    <Text style={styles.fineLabel}>Fine:</Text>
                    <Text style={styles.fineAmount}>Rs. {violation.fine}</Text>
                  </View>

                  <View style={styles.pointsContainer}>
                    <Text style={styles.pointsLabel}>Points:</Text>
                    <Text style={styles.pointsValue}>{violation.points}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardArrow}>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </TouchableOpacity>
          ))}

          {violations.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Records Found</Text>
              <Text style={styles.emptySubtext}>
                {userType === 'police'
                  ? 'No violation records have been logged by you yet.'
                  : 'You have no traffic violations on record.'}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default CaseMainScreen;
