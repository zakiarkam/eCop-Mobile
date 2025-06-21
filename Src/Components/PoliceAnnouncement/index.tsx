import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from './Styles';

const AnnouncementCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Announcements</Text>
        <ScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.announcementText}>
            No new announcements at this time.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default AnnouncementCard;
