import {StyleSheet} from 'react-native';
import {Colors} from '../Styles/colors';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.darkGray,
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingRight: 45,
    fontSize: 16,
    color: Colors.darkGray,
    backgroundColor: Colors.lightGray,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13,
  },

  button: {
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
  secondaryButtonText: {
    color: Colors.primary,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.darkGray,
    backgroundColor: Colors.white,
  },
  otpInputFocused: {
    borderColor: Colors.primary,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.lightGray,
  },
});

export default styles;
