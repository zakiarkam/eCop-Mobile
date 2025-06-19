import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './Styles';
import {userStorageService} from '../../Services/UserStorageService';
import {RootStackParamList} from '../../Navigations/RootNavigator';

type HeaderNavigationProp = StackNavigationProp<RootStackParamList>;

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    userType: 'licence' | 'police' | null;
    identificationNo: string;
  }>({
    name: '',
    email: '',
    userType: null,
    identificationNo: '',
  });

  const navigation = useNavigation<HeaderNavigationProp>();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUserData = await userStorageService.getUserData();
      if (storedUserData) {
        setUserData({
          name: storedUserData.fullName,
          email: storedUserData.email,
          userType: storedUserData.userType,
          identificationNo: storedUserData.identificationNo,
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const getFirstLetter = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLogout = async () => {
    setModalVisible(false);
    try {
      await userStorageService.clearUserData();
      navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
      console.log('User logged out successfully');
      Alert.alert('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.greeting}>
            Hi, {userData.name ? userData.name.split(' ')[0] : 'Welcome Back'}
          </Text>
          <Text style={styles.timeText}>{getGreetingTime()}</Text>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={16}
              color="rgba(255,255,255,0.8)"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.profileInitial}>
              {getFirstLetter(userData.name)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Pressable onPress={() => {}}>
              {/* Profile Section */}
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <View style={styles.defaultProfileImage}>
                    <Text style={styles.profileImageInitial}>
                      {getFirstLetter(userData.name)}
                    </Text>
                  </View>
                </View>

                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{userData.name}</Text>
                  <Text style={styles.userEmail}>{userData.email}</Text>
                  {userData.userType && userData.identificationNo && (
                    <Text style={styles.userType}>
                      {userData.userType === 'licence'
                        ? 'Licence No: '
                        : 'Police No: '}
                      {userData.identificationNo}
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.divider} />

              {/* Logout Button */}
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={20} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default Header;
