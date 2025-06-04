import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.blueNon,
    marginBottom: 10,
    textAlign: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    padding: 20,
  },

  logoText: {
    fontSize: 24,
    color: Colors.white,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.blueNon,
  },
  buttonContainer: {
    margin: 20,
    backgroundColor: Colors.lightBlue,
    borderRadius: 30,
    padding: 15,
    fontStyle: 'italic',
    fontWeight: 'bold',
    shadowColor: Colors.shadow,
    color: Colors.white,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
