import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 100,
  },
  card: {
    backgroundColor: '#6DB6FE',
    borderRadius: 20,
    flex: 1,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollArea: {
    flex: 1,
  },
  announcementText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});
