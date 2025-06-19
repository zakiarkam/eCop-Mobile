import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  userStorageService,
  StoredUserData,
} from '../../../Services/UserStorageService';
import styles from './Styles';
import {RootStackParamList} from '../../../Navigations/RootNavigator';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const [userData, setUserData] = useState<StoredUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await userStorageService.getUserData();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  console.log(userData);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await userStorageService.clearUserData();
            navigation.reset({
              index: 0,
              routes: [{name: 'Auth'}],
            });
            console.log('User logged out successfully');
            Alert.alert('User logged out successfully');
          } catch (error) {
            Alert.alert('Error', 'Failed to logout');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading Profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No profile data found</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchUserData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="person" size={36} color="#FFFFFF" />
            </View>
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera-alt" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData.fullName}</Text>
            <Text style={styles.profileId}>NIC : {userData.idNumber}</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputField}>
              <Text style={styles.inputValue}>{userData.fullName}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputField}>
              <Text style={styles.inputValue}>{userData.email}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Status</Text>
            <View style={[styles.inputField, styles.statusField]}>
              <Text style={[styles.inputValue, styles.statusText]}>
                {userData.status}
              </Text>
              <View
                style={[
                  styles.statusIndicator,
                  userData.status.toLowerCase() === 'active'
                    ? styles.activeStatus
                    : styles.inactiveStatus,
                ]}
              />
            </View>
          </View>

          {userData.userType === 'police' && (
            <>
              <Text style={styles.subSectionTitle}>Police Information</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Police Number</Text>
                <View style={styles.inputField}>
                  <Text style={styles.inputValue}>{userData.policeNumber}</Text>
                </View>
              </View>

              {userData.rank && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Rank</Text>
                  <View style={styles.inputField}>
                    <Text style={styles.inputValue}>{userData.rank}</Text>
                  </View>
                </View>
              )}

              {userData.policeStation && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Police Station</Text>
                  <View style={styles.inputField}>
                    <Text style={styles.inputValue}>
                      {userData.policeStation}
                    </Text>
                  </View>
                </View>
              )}

              {userData.badgeNo && (
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Badge Number</Text>
                  <View style={styles.inputField}>
                    <Text style={styles.inputValue}>{userData.badgeNo}</Text>
                  </View>
                </View>
              )}
            </>
          )}

          {userData.userType === 'licence' && (
            <>
              <Text style={styles.subSectionTitle}>Licence Information</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Licence Issue Date</Text>
                <View style={styles.inputField}>
                  <Text style={styles.inputValue}>
                    {userData.issueDate?.slice(0, 10)}
                  </Text>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Licence Expiry Date</Text>
                <View style={styles.inputField}>
                  <Text style={styles.inputValue}>
                    {userData.expiryDate?.slice(0, 10)}
                  </Text>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Licence Number</Text>
                <View style={styles.inputField}>
                  <Text style={styles.inputValue}>
                    {userData.licenceNumber}
                  </Text>
                </View>
              </View>

              {userData.vehicleCategories &&
                userData.vehicleCategories.length > 0 && (
                  <>
                    <Text style={styles.inputLabel}>Vehicle Categories</Text>
                    {userData.vehicleCategories.map((vehicle, index) => (
                      <View key={index} style={styles.vehicleCard}>
                        <View style={styles.vehicleHeader}>
                          <Text style={styles.vehicleCategory}>
                            {vehicle.category}
                          </Text>
                          <View style={styles.vehicleDates}>
                            <Text style={styles.vehicleDate}>
                              Issued:{' '}
                              {new Date(vehicle.issueDate).toLocaleDateString()}
                            </Text>
                            <Text style={styles.vehicleDate}>
                              Expires:{' '}
                              {new Date(
                                vehicle.expiryDate,
                              ).toLocaleDateString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ))}
                  </>
                )}
            </>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editProfileButton}>
              <Icon name="edit" size={20} color="#FFFFFF" />
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}>
              <Icon name="logout" size={20} color="#FFFFFF" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
