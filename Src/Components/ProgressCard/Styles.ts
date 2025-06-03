import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles/colors';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressLabelContainer: {
    backgroundColor: Colors.green,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 15,
  },
  progressLabel: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  progressText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  checkSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginLeft: 8,
  },
});
