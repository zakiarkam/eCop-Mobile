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

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.gray,
  },

  userTypeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },

  // Button disabled states
  buttonDisabled: {
    backgroundColor: Colors.lightGray,
    opacity: 0.6,
  },
  buttonTextDisabled: {
    color: Colors.gray,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 8,
  },

  // Welcome and info text
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },

  passwordRequirements: {
    backgroundColor: Colors.lightBlue,
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 4,
  },

  successMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  successDescription: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  loginInfoContainer: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  loginInfoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 8,
  },
  loginInfoText: {
    fontSize: 13,
    color: Colors.darkGray,
    marginBottom: 4,
  },
});

export default styles;
