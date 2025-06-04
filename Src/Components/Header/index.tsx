import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './Styles';

const Header = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Sample user data - replace with actual user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: null,
  };

  const handleLogout = () => {
    setModalVisible(false);
    // Add your logout logic here
    console.log('Logout pressed');
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <Text style={styles.greeting}>Hi, Welcome Back</Text>
          <Text style={styles.timeText}>Good Morning</Text>
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
            <Icon name="person" size={32} color="rgba(255,255,255,0.9)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Modal */}
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
                  {userData.profileImage ? (
                    <Image
                      source={{uri: userData.profileImage}}
                      style={styles.profileImage}
                    />
                  ) : (
                    <View style={styles.defaultProfileImage}>
                      <Icon name="person" size={40} color="#666" />
                    </View>
                  )}
                </View>

                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{userData.name}</Text>
                  <Text style={styles.userEmail}>{userData.email}</Text>
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
