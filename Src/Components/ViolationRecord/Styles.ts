import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputError: {
    borderColor: '#e53e3e',
    borderWidth: 2,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputFlex: {
    flex: 1,
    marginRight: 10,
  },
  verifyButton: {
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdown: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownTextSelected: {
    fontSize: 16,
    color: '#1a202c',
    flex: 1,
  },
  dropdownTextPlaceholder: {
    fontSize: 16,
    color: '#718096',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#4a5568',
  },
  ruleDetails: {
    backgroundColor: '#e6fffa',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#38b2ac',
  },
  ruleDetailText: {
    fontSize: 14,
    color: '#2d3748',
    marginBottom: 5,
  },
  ruleDetailLabel: {
    fontWeight: '600',
    color: '#2c7a7b',
  },
  submitButton: {
    backgroundColor: Colors.background,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 120,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0aec0',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e53e3e',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '40%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Colors.background,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalCloseButton: {
    fontSize: 24,
    color: '#718096',
    fontWeight: 'bold',
  },
  rulesContainer: {
    maxHeight: 400,
  },
  ruleItem: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ruleItemSelected: {
    backgroundColor: '#e6fffa',
    borderLeftWidth: 4,
    borderLeftColor: '#38b2ac',
  },
  ruleSection: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 5,
  },
  ruleProvision: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 8,
    lineHeight: 20,
  },
  ruleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ruleFine: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e53e3e',
  },
  rulePoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3182ce',
  },

  //modal
  verificationContainer: {
    padding: 20,
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  phoneText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  verificationInput: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    width: 200,
    marginBottom: 20,
    backgroundColor: Colors.lightGray,
  },
  resendButton: {
    padding: 10,
  },
  resendButtonText: {
    color: Colors.primary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
