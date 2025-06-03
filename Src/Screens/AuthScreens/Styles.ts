import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingTop: '25%',
    paddingBottom: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: Colors.blue,
    textAlign: 'center',
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 5,
  },
  forgotPassword: {
    fontSize: 16,
    color: Colors.blue,
    textAlign: 'center',
    marginTop: 20,
  },
  signUpContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '30%',
  },
  signUpText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  signUpSmall: {
    fontSize: 16,
    color: Colors.blueNon,
    paddingLeft: 10,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
  },
  buttonContainer: {
    margin: 40,
    backgroundColor: Colors.lightBlue,
    borderRadius: 30,
    padding: 5,
    fontStyle: 'italic',
    fontWeight: 'bold',
    shadowColor: Colors.shadow,
    color: Colors.white,
  },
});

export default styles;
