import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {userStorageService} from '../../Services/UserStorageService';

export default function index() {
  const [policePoints, setPolicePoints] = useState('0');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPolicePoints = async () => {
      try {
        const points = await userStorageService.getPolicePoints();
        setPolicePoints(points || '0');
      } catch (error) {
        console.error('Error fetching police points:', error);
        setPolicePoints('0');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicePoints();
  }, []);

  const maxPoints = 100;
  const currentPoints = parseInt(policePoints) || 0;
  const progressPercentage = Math.min((currentPoints / maxPoints) * 100, 100);

  return (
    <View style={styles.container}>
      <View style={styles.leftBorder} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            No of offences this year you have Registered.
          </Text>
          <Text style={styles.number}>02</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, {width: `${progressPercentage}%`}]}>
              <Text style={styles.progressText}>
                {isLoading ? '...' : policePoints}
              </Text>
            </View>
            <View style={styles.progressLabel}>
              <Text style={styles.labelText}>Your Points</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 10,
    minHeight: 40,
    flexDirection: 'row',
    marginVertical: 15,
  },
  leftBorder: {
    width: 4,
    backgroundColor: '#4a90e2',
    marginRight: 20,
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#8b94b8',
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 10,
  },
  number: {
    color: '#4a90e2',
    fontSize: 48,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 2,
  },
  progressBar: {
    height: 30,
    backgroundColor: '#e8f4f8',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2d4a3e',
    borderRadius: 25,
    justifyContent: 'center',
    paddingLeft: 20,
    minWidth: 80,
  },
  progressText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  labelText: {
    color: '#2d4a3e',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
