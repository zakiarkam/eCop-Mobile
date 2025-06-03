import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    paddingTop: '5%',
    paddingBottom: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  statsContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
});
